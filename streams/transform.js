const { Transform } = require("stream")
const fs = require("fs")
const { createGunzip, createGzip } = require("zlib")
const crypto = require("crypto")


// const upper = new Transform({
//   transform(chunk, encoding, cb) {
//     this.push(chunk.toString().toUpperCase())
//     cb()
//   }
// })

// process.stdin.pipe(upper).pipe(process.stdout)


const progress = new Transform({
  transform(chunk, encoding, cb) {
    process.stdout.write(".")
    cb(null, chunk)
  }
})

function archive() {
  const gzip = createGzip()
  fs.createReadStream("./text")
    .pipe(gzip)
    .pipe(crypto.createCipher("aes192", "secret"))
    .pipe(progress)
    .pipe(fs.createWriteStream("./text" + ".gz"))
    .on("finish", () => { console.log("done") })
}


function unarchive() {
  const gunzip = createGunzip()
  fs.createReadStream("./text.gz")
    .pipe(crypto.createDecipher("aes192", "secret"))
    .pipe(gunzip)
    .pipe(progress)
    .pipe(fs.createWriteStream("./unzipped"))
    .on("finish", () => { console.log("done") })
}

// archive()
unarchive()