const dgram = require("dgram")
const PORT = 3333;
const HOST = "127.0.0.1"

const server = dgram.createSocket("udp4")

server.on("listening", () => console.log("UDP server listening..."))
server.on("message", (m, rinfo) => console.log( m.toString()))

server.bind(PORT, HOST)

const client = dgram.createSocket("udp4")

client.send("hello", PORT, HOST, err => {
  console.log("message sent")
  client.close()
})
