// Depending on the number of CPU cores and threadpool size the result will differ;

// process.env.UV_THREADPOOL_SIZE = 6  // this will not work in windows see: https://stackoverflow.com/questions/51224868/process-env-uv-threadpool-size-not-working 

const crypto = require('crypto')

const start = Date.now();

function doHash(n = '', s = start) {
    crypto.pbkdf2("a", "b", 100000, 512, 'sha512', () => {
        console.log('hash', n, Date.now() - s)
    })
}

// doHash(1)
// doHash(2)
// doHash(3)
// doHash(4)
// doHash(5)

module.exports = doHash