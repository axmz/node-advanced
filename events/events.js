const fs = require("fs")
const EventEmitter = require("events");


class WithLog extends EventEmitter {
  execute(cb) {
    this.emit("start")
    cb()
    this.emit("end")
  }
}

// const withLog = new WithLog()

// withLog.on("start", (e) => console.log('started', e) )
// withLog.on("end", () => console.log('finished') )

// withLog.execute(() => console.log("hello"))



class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time("execute")
    this.emit("start")
    asyncFunc(...args, (err, res) => {
      err = new Error("er!")
      if (err) {
        return this.emit("error", err)
      }


      this.emit("data", res)
      console.timeEnd("execute")
      this.emit("end")
    })
  }
}

const withTime = new WithTime()
withTime.on("start", () => console.log("Started ..."))
withTime.on("end", () => console.log("Finished ..."))
withTime.on("error", () => console.error("Error ..."))

process.once("uncaughtException", () => {
  
  process.exit(1)
})

withTime.execute(fs.readFile, __filename)