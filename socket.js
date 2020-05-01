process.stdout.write("\u001b[3J\u001b[2J\u001b[1J")
let counter = 0;
let clients = {}
const server = require("net").createServer()

server.on("connection", (socket) => {
  let id = counter++
  clients[id] = socket
  console.log(`client: ${id} connected`)
  socket.write(`wellcome [${id}]\n`)

  socket.on("data", data => {
    process.stdout.write(`[${id}]: ${data}`);
    Object.keys(clients).forEach(k => {
      let s = clients[k]
      if (k != id) {
        s.write(`[${k}]: ${ data }`)
      }
    })
  })

  socket.on("end", () => {
    console.log(`client [${id}] disconnected`)
    delete clients[id]
  })
})

server.listen(8000, () => {
  console.log('Server listening...')
})