const {fork} = require("child_process")

const forked = fork("./child.js")

forked.on("message", (message) => {
  console.log('message')
})

forked.send("hello from parent")