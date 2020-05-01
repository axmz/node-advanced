process.on("message", message => console.log("child received message:", message))

let counter = 0

const interval = setInterval(() => {
  process.send("hello from child")
  counter++
  if (counter > 10) {
    clearInterval(interval)
  }
}, 500)