const http = require("http")

let userCount = 0;
http.createServer((req, res) => {
  for (let i = 0; i < 1e7; i++) { }
  res.write(`process ${process.pid}`)
  res.end(`Users: ${userCount}`)
}).listen(
  8000, () => console.log(`started process ${process.pid}`)
)
process.on("message", (message) => { userCount = message.userCount })

// // simulate failing
// setInterval(() => {
//   process.exit(1)
// }, Math.random() * 10000)