const net = require("net");
const client = net.createConnection({ host: "127.0.0.1", port: 8081 }, () => {
    // 'connect' listener.
    console.log("connected to server!");
    const body = `
    POST / HTTP/1.1\r\n
    Content-Type: application/x-www-form-urlencoded\r\n
    Content-Length: 11\r\n
    \r\n
    name=winter`;
    console.log(body);
    client.write(body);
});
client.on("data", (data) => {
    console.log(data.toString());
    client.end();
});
client.on("end", () => {
    console.log("disconnected from server");
});
