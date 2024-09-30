import cluster from 'cluster';
import os from 'os';

const fs = require('fs');

if (cluster.isWorker) {
  console.log(`Starting worker process ` + process.pid);
  require('./index');
} else {
  console.log(`Starting main process ` + process.pid);

  const saveReport = () => {
    console.clear();
    console.log(report);
    fs.writeFileSync('../report/report.json', JSON.stringify(report, null, 2), 'utf8');
  };

  const CPU_CORES = +process.env.CPU_CORES;
  const availableCpuCores = os.cpus().length;
  const coresUsed = (!!CPU_CORES && CPU_CORES < availableCpuCores) ? CPU_CORES : availableCpuCores;

  const report = {
    coresUsed: coresUsed,
    time: new Date().getTime(),
    testsPerCore: 0,
    testsInParallel: 0,
    testsProcessed: 0,
    requestsSent: 0,
    requestsFailed: 0,
    minRequestTime: null,
    maxRequestTime: null,
    max01RequestTime: 0,
    avgRequestTime: 0
  };

  const results = [];

  const messageHandler = (msg) => {
    if (msg?.cmd === 'result') {

      const result = msg.data;
      report.testsInParallel += result.testsInParallel;
      report.testsProcessed += result.testsProcessed;
      report.requestsSent += result.requestsSent;
      report.requestsFailed += result.requestsFailed;
      results.push(result);

      if (results.length === coresUsed) {
        report.testsPerCore = result.testsAmount;
        report.time = new Date().getTime() - report.time;

        let avgSum = 0;
        let max01Sum = 0;
        results.forEach(result => {
          if (report.minRequestTime === null || report.minRequestTime > result.minRequestTime) {
            report.minRequestTime = result.minRequestTime;
          }
          if (report.maxRequestTime === null || report.maxRequestTime < result.maxRequestTime) {
            report.maxRequestTime = result.maxRequestTime;
          }
          avgSum += result.avgRequestTime;
          max01Sum += result.max01RequestTime;
        });
        report.avgRequestTime = avgSum / results.length;
        report.max01RequestTime = max01Sum / results.length;

        saveReport();
      }
    }
  };

  for (let i = 0; i < coresUsed; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
}
