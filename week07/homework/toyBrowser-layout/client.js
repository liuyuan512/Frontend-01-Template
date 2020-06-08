const net = require("net");
const { parseHTML } = require("./parser-computedStyle.js");
const render = require("./render");
const images = require("images");
class Request {
  //method, url = host+port+path
  //body: k-v
  // content-type
  // headers
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.path = options.path || "/";
    this.port = options.port || 80;
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    } else if (
      this.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      this.bodyText = Object.keys(this.body)
        .map(key => `${key}=${encodeURIComponent(this.body[key])}`)
        .join("&");
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }

  toString() {
    return `
${this.method} ${this.path} HTTP/1.1
${Object.keys(this.headers)
  .map(key => `${key}: ${this.headers[key]}`)
  .join("\n")}

${this.bodyText}`;
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const responseParser = new ResponseParser();

      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          { host: this.host, port: this.port },
          () => {
            connection.write(this.toString());
          }
        );
      }
      connection.on("data", data => {
        // console.log(data.toString());
        responseParser.receive(data.toString());
        if (responseParser.isfinished) {
          resolve(responseParser.response);
        }
        // console.log("=============responseStatusLineStart============");
        // console.log(responseParser.statusline);
        // console.log("=============responseStatusLineEnd============");
        // console.log("=============responseParserHeadersStart======");
        // console.log(responseParser.headers);
        // console.log("=============responseParserHeadersEnd=========");
        // console.log("=============responseParserBodyStart=========");
        // console.log(responseParser.response);
        // console.log("=============responseParserBodyEnd=========");
        connection.end();
      });
      connection.on("error", err => {
        reject(err);
        connection.end();
      });
    });
  }
}

class Response {}
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_NAME_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusline = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";

    this.bodyParser = null;
  }

  get isfinished() {
    return this.bodyParser && this.bodyParser.isfinished;
  }
  get response() {
    const matchRes = this.statusline.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    // console.log("matchRes:", matchRes);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join("")
    };
  }

  receive(string) {
    // console.log(string);
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {
    // console.log(char.charAt(0));
    // console.log(char);
    // console.log("this.current:", this.current);
    // if (char === "\r") {
    //     console.log("\\r");
    // } else if (char === "\n") {
    //     console.log("\\n");
    // }
    switch (this.current) {
      case this.WAITING_STATUS_LINE:
        if (char === "\r") {
          this.current = this.WAITING_STATUS_LINE_END;
        } else {
          this.statusline += char;
        }
        break;
      case this.WAITING_STATUS_LINE_END:
        if (char === "\n") {
          this.current = this.WAITING_HEADER_NAME;
        }
        break;
      case this.WAITING_HEADER_NAME:
        if (char === ":") {
          this.current = this.WAITING_HEADER_SPACE;
        } else if (char === "\r") {
          this.current = this.WAITING_HEADER_BLOCK_END;
        } else {
          this.headerName += char;
        }
        break;
      case this.WAITING_HEADER_SPACE:
        if (char === " ") {
          this.current = this.WAITING_HEADER_VALUE;
        }
        break;
      case this.WAITING_HEADER_VALUE:
        if (char === "\r") {
          this.current = this.WAITING_HEADER_LINE_END;
          this.headers[this.headerName] = this.headerValue;
          this.headerName = "";
          this.headerValue = "";
        } else {
          this.headerValue += char;
        }
        break;
      case this.WAITING_HEADER_LINE_END:
        if (char === "\n") {
          this.current = this.WAITING_HEADER_NAME;
        }
        break;
      case this.WAITING_HEADER_BLOCK_END:
        if (char === "\n") {
          this.current = this.WAITING_BODY;
        }
        break;
      case this.WAITING_BODY:
        if (this.headers["Transfer-Encoding"] === "chunked") {
          if (!this.bodyParser) {
            this.bodyParser = new ChunkedBodyParser();
          }
          this.bodyParser.receiveChar(char);
        }
        break;
      default:
        break;
    }
  }
}

class ChunkedBodyParser {
  constructor() {
    this.WAITING_CHUNK_LENGTH = 0;
    this.WAITING_CHUNK_LENGTH_END = 1;
    this.READING_CHUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.PARSERING_CHUNK_END = 5;

    this.length = 0;
    this.content = [];
    this.isfinished = false;
    this.current = this.WAITING_CHUNK_LENGTH;
  }
  receiveChar(char) {
    // console.log(JSON.stringify(char));
    switch (this.current) {
      case this.WAITING_CHUNK_LENGTH:
        if (char === "\r") {
          this.current = this.WAITING_CHUNK_LENGTH_END;
        } else {
          // 将数字字符串转换成数字 "123"=>123
          // 这里是10进制， 但是一般http响应体的body部分都是16进制
          // this.length *= 10;
          // this.length += char.charCodeAt(0) - "0".charCodeAt(0);
          this.length *= 16;
          this.length += parseInt(char, 16);
        }
        break;
      case this.WAITING_CHUNK_LENGTH_END:
        if (this.length === 0) {
          this.isfinished = true;
          this.current = this.PARSERING_CHUNK_END;
        } else if (char === "\n") {
          this.current = this.READING_CHUNK;
        }
        break;
      case this.READING_CHUNK:
        this.content.push(char);
        this.length--;
        if (this.length === 0) {
          this.current = this.WAITING_NEW_LINE;
        }
        break;
      case this.WAITING_NEW_LINE:
        if (char === "\r") {
          this.current = this.WAITING_NEW_LINE_END;
        }
        break;
      case this.WAITING_NEW_LINE_END:
        if (char === "\n") {
          this.current = this.WAITING_CHUNK_LENGTH;
        }
        break;
      default:
        break;
    }
  }
}

void (async function() {
  const request = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8088",
    path: "/",
    headers: {
      ["X-foo2"]: "customed"
    },
    body: {
      name: "winter"
    }
  });
  const response = await request.send();
  // console.log("response:", response);
  // console.log(parseHTML(response.body));
  const dom = parseHTML(response.body);

  const viewPort = images(800, 600);
  render(viewPort, dom);
  viewPort.save("output.png");
  // console.log("parseHTML:", parseHTML);
})();
