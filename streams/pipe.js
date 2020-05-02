const fs = require("fs")
const zlib = require("zlib")

const readable = fs.createReadStream("./text")
const writable = fs.createWriteStream("./textcopy")
const compress = zlib.createGzip()
const compressed = fs.createWriteStream("./textcopy.gz")

// // creates a copy
// readable.pipe(writable)

// // will not work
// readable.pipe(writable).pipe(compress)

// // will not work
// readable.pipe(writable).end(() => console.log("done"))

// compressed the data
readable.pipe(compress).pipe(compressed)
compressed.on("finish", () => console.log("done"))