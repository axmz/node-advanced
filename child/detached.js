const {spawn} = require("child_process")

const child = spawn("node timer.js\n", {
  detached: true, // allows the child to run even if parent terminates
  stdio: "inherit",
  shell: true
})

child.unref()