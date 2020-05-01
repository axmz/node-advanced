const EventEmitter = require("events")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  // output: process.stdout
})

class Client extends EventEmitter { }

const client = new Client()
const server  = require("./server")(client)

client.on("connection", () => console.log('client connected to server'))
server.on("response", r => console.log(r))

rl.on("line", input => client.emit("command", input))



