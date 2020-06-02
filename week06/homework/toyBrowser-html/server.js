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
    res.end(`
<html maaa=a>
<head>
<style>
	body div #myid{
		width:100px;
		background-color:#ff5000
	}
	body div img{
		width:30px;
		background-color:#ff1111
	}
</style>
</head>
<body>
		<div>
				<img id="myid"/>
				<img/>
		</div>
</body>
</html>
		`);
});

server.listen(8088);
