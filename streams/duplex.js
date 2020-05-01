const {Duplex} = require("stream")

const d = new Duplex({
  write(c, e, cb) {
    console.log(c.toString())
    cb()
  },
  read(size) {
    if (this.currentCharCode > 90 ) {
      this.push(null)
      return
    }
    this.push(String.fromCharCode(this.currentCharCode++))
  }
})

d.currentCharCode = 65
process.stdin.pipe(d).pipe(process.stdout)