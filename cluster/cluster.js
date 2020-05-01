const cluster = require("cluster")
const os = require("os")

// // mock db requests
// const numberOfUsersInDB = function () {
//   this.count = this.count || 5
//   this.count = this.count * this.count
//   return this.count
// }

if (cluster.isMaster) {
  const cpus = os.cpus().length
  console.log(`Forking for ${cpus} CPUs`)
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }

  console.log("Master PID:", process.pid)

  // // updating workers with data from DB
  // const updateWorkers = () => {
  //   const userCount = numberOfUsersInDB()
  //   Object.values(cluster.workers).forEach(worker => {
  //     worker.send({ userCount })
  //   })
  // }
  // updateWorkers()
  // setInterval(updateWorkers, 15000)

  // // restart failed workers
  // cluster.on("exit", (worker, code, signal) => {
  //   if (code !=0 && !worker.exitedAfterDisconnect) {
  //     console.log(worker.id, "crashed \nStarting new worker")
  //     cluster.fork()
  //   }
  // })

  // restart all worker
  process.on("SIGUSR2", () => {
    const workers = Object.values(cluster.workers)

    const restartWorker = (workerIndex)=> {
      const worker = workers[workerIndex]
      if (!worker) return
      worker.on("exit", () => {
        if ( !worker.exitedAfterDisconnect ) return
        console.log(`process ${worker.process.pid} exited`)
        cluster.fork().on("listening", () => {
          restartWorker(workerIndex + 1)
        })
      })

      worker.disconnect()
    }

    restartWorker(0)
  })
} else {
  require('./server')
}