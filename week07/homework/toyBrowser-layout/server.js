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
	#container{
		display:flex;
		width:500px;
		height:300px;
		background-color:rgb(255,255,255);
	}
	#container #myid{
		width:200px;
		height:100px;
		background-color:rgb(255,0,0);
	}
	#container .c1 {
		flex: 1;
		background-color:rgb(0,255,0);
	}
</style>
</head>
<body>
		<div id="container">
				<div id="myid"/>
				<div class="c1"/>
		</div>
</body>
</html>
		`);
});

server.listen(8088);
