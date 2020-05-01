const fs = require("fs")
const path = require("path")
const dirname = path.join(__dirname, "touch")
const msDay = 24 * 60 * 60 * 1000

function createFiles() {
  fs.rmdirSync(dirname, {
    recursive: true
  })

  fs.mkdirSync(dirname)

  for (let i = 0; i < 10; i++) {
    const filePath = path.join(dirname, `file-${i}`)
    const time = (Date.now() - i * msDay) / 1000
    fs.writeFile(filePath, "text", err => {
      if (err) {
        throw err
      }

      fs.utimes(filePath, time, time, err => {
        if (err) {
          throw err
        }
      })
    })
  }
}


function deleteFiles() {
  const files = fs.readdirSync(dirname)
  function deleteFiles(f, daysOld) {
    const filePath = path.join(dirname, f)
    fs.stat(filePath, (err, stat) => {
      if (err) {
        throw err;
      }

      if ((Date.now() - stat.mtime.getTime()) > daysOld*msDay) {
        fs.unlink(filePath, (err) => {
          if (err) {
            throw err
          }

          console.log(`File deleted: ${f}`)
        })
      }
    })
  }
  files.forEach(f => deleteFiles(f, 5))
}

// createFiles()
deleteFiles()