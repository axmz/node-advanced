const { Readable } = require("stream")

const r = new Readable({
  read(size) {
    if (this.currentCharCode > 90) {
      this.push("\n")
      this.push(null)
      return
    }

    setTimeout(() => {
      this.push(String.fromCharCode(this.currentCharCode++))
    }, [50])
  }
})

r.currentCharCode = 65
r.pipe(process.stdout)
process.on("exit", () => {
  console.error(r.currentCharCode)
})

process.stdout.on("error", process.exit())