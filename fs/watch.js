const fs = require("fs")
const path = require("path")
const dirname = path.join(__dirname, "touch")

const currentFiles = fs.readdirSync(dirname, err => {
  if (err) {
    throw err
  }
})

fs.watch(dirname, (eventType, filename) => {
  if (eventType === "rename") {
    const index = currentFiles.indexOf(filename)
    if (index >= 0) {
      currentFiles.splice(index, 1)
      console.log("file removed")
      return
    }

    currentFiles.push(filename)
    console.log("filename was added")
    return
  }
  console.log("filename was changed")
})