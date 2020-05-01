const fs = require("fs")
const server = require("http").createServer()

server.on("request", (req, res) => {
  const src = fs.createReadStream("./text")
  src.pipe(res)
})

server.on("connection", () => {
  console.log('connected')
})

server.listen(8000, "localhost", () => {
  console.log("listening")
})