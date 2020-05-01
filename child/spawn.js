const {spawn} = require("child_process")

const find = spawn("find", [".", "-type", "f"])

// find.stdout.on("data", (m) => console.log(m.toString()))
// find.stderr.on("data", (m) => console.log(m.toString()))
// find.on("exit", (code, sig) => console.log("Exited with:", code, sig))

const wc = spawn("wc" )

find.stdout.pipe(wc.stdin)
wc.stdout.on("data", (data) => console.log("wc:", data.toString()))
find.stdout.pipe(process.stdout)

// Shell mode
const child1 = spawn("find . -type f", {
  shell: true,
  stdio: "inherit",
  cwd: "/tmp",
  env: {} // overwrite env
})
