const http = require("http")
const { fork } = require("child_process")

//// blocks the server
// const longComputation = () => {
//   let sum = 0;
//   for (let i = 0; i < 1e9; i++) {
//     sum += i
//   }

//   return sum
// }

const server = http.createServer()
server.on("request", (req, res) => {
  if (req.url === "/compute") {
    // const sum = longComputation()
    // return res.end(sum.toString())
    const compute = fork("./compute")
    compute.send("start")
    process.on("message", (message) => {
      let sum = message;
      return res.end(sum)
    })
  } else {
    res.end("OK")
  }
})

server.listen(3000)