const https = require("https")
const fs = require("fs")

const server = https.createServer({
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem")
})

server.on("request", (req, res) => {
  res.writeHead(200, {
    'content-type': "text/plain"
  })

  debugger;
  res.write("Hello!\n")

  setTimeout(() => {
    res.write("Hello timeout!\n")
    // res.end("connection ended\n")
  } )
  setImmediate(() => {
    res.write("Hello immediate!\n")
    // res.end("connection ended\n")
  })

})

server.listen(443)