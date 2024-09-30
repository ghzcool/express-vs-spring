import cluster from 'cluster';
import os from 'os';

if (cluster.isWorker) {
  console.log(`Starting worker process ` + process.pid);
  require('./index');
} else {
  console.log(`Starting main process ` + process.pid);

  const CPU_CORES = +process.env.CPU_CORES;
  const availableCpuCores = os.cpus().length;
  const coresUsed = (!!CPU_CORES && CPU_CORES < availableCpuCores) ? CPU_CORES : availableCpuCores;

  for (let i = 0; i < coresUsed; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
}
