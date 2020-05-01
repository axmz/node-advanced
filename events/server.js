const EventEmitter = require("events")

class Server extends EventEmitter {
  constructor(client) {
    super()
    process.nextTick(() => {
      client.emit("connection")
      client.emit("command", "ls")
    })
    process.nextTick(() => {
      this.emit("response", "type a command...")
    })
    console.log('server started...')

    client.on("command", c => {
      switch (c) {
        case "ls":
        case "add":
        case "help":
        case "delete":
          this[c]()
          break
        default:
          this.emit("response", "Unknown comand...")
      }
    })
  }

  ls() {
    this.emit("response", "ls...")
  }

  add() {
    this.emit("response", "add...")
  }

  delete() {
    this.emit("response", "delete...")
  }

  help() {
    this.emit("response", "help...")
  }
}

module.exports = client => new Server(client)

