const http = require("http");
function generateChunk(response, index = 0) {
    setTimeout(() => {
        if (index === 5) {
            response.write("end");
            response.end();
        } else {
            response.write(`chunk:${index}`);
        }
    }, index * 1000);
}
const server = http.createServer((req, res) => {
    console.log("request received:", req.headers);
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200, { "Content-Type": "text/plain" });
    // generateChunk(res);
    // res.end("ok");
    let index = 0;
    while (index <= 5) {
        generateChunk(res, index);
        index++;
    }
});

server.listen(8088);
