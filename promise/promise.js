const fs = require("fs")

const readFileAsArray = function (file, cb = () => {}) {
  return new Promise((res, rej) => fs.readFile(file, (err, data) => {
    if (err) {
      rej(err)
      return cb(err)
    }

    data = data.toString().split('\r\n')
    res(data)
    return cb(data)
  }))
}

readFileAsArray("numbers" )
  // .then(data => console.log("data", data))
  // .catch(err => console.log("error", err))

async function countOdd() {
  try {
    const numbers = await readFileAsArray("numbers")
    const n = numbers.filter(n => n % 2)
    console.log(n, numbers)
  } catch (error) {
    console.log(error)
  }
}

countOdd()