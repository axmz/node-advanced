const fs = require("fs")

console.log("start")

fs.readFile(__filename, () => {
  setTimeout(() => { console.log("1000ms") }, 1000)
  setTimeout(() => { console.log("0ms") }, 0)
  setTimeout(() => console.log("timeout"));

  setImmediate(() => { console.log("immediate 2") })

  Promise.resolve().then(() => console.log("promise 3"));
})

Promise.resolve().then(() => console.log("promise 1"));
setTimeout(() => console.log("timeout", 0));
setImmediate(() => { console.log("immediate 1") })
process.nextTick(() => console.log("tick"))
Promise.resolve().then(() => console.log("promise 2"));


console.log("end")

process.on("exit", () => console.log("exit"))