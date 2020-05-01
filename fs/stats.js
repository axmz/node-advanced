const fs = require("fs")
const path = require("path")
const dirname = path.join(__dirname, "../")
const files = fs.readdirSync(dirname)
console.log(files)
function readStats(_, stat) {
  console.log(stat.size)
}

files.forEach(f => {
  const p = path.join(dirname, f)
  fs.stat(p, readStats)
})