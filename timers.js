const fs = require("fs")

console.log("start")

Promise.resolve().then(() => console.log("promise")); 
setImmediate(() => { console.log("immediate") }) 
process.nextTick(() => console.log("tick"))

fs.readFile(__filename, () => {
  setTimeout(() => { console.log("1000ms") }, 1000) 
  setTimeout(() => { console.log("0ms") }, 0)
  setTimeout(() => console.log("timeout"));

  setImmediate(() => { console.log("immediate") })

  Promise.resolve().then(() => console.log("promise"));
})

  
console.log("end")

process.on("exit", () => console.log("exit"))