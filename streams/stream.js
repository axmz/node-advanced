const fs = require("fs")
const file = fs.createWriteStream("./text")

for (let i = 0; i < 10000; i++) {
  file.write("hello hello hello")
}