console.log(process.env.UV_THREADPOOL_SIZE)
process.env.UV_THREADPOOL_SIZE = 6  // is it working? i dont see the diff;
const doHash = require('./threadpool.js')
const doRequest = require('./https.js');
const fs = require('fs')
const start = Date.now();

doRequest()

fs.readFile('multitasking.js', 'utf8', () => {
    console.log('fs', Date.now() - start)
})

doHash(1)
doHash(2)
doHash(3)
doHash(4)
