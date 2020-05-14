const http = require("http");

const server = http.createServer((req, res) => {
		console.log("request received",req.headers);
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
});

server.listen(8081);
