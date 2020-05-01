const {Writable} = require("stream")

// process.stdin.pipe(process.stdout)

const w = new Writable({
  write(chunk, enconding, callback) {
    console.log(chunk.toString())
    callback()
  }
})

// w.write("hello", "", () => console.log("done"))

process.stdin.pipe(w)