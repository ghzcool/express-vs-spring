"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
if (cluster_1.default.isWorker) {
    console.log(`Starting worker process ` + process.pid);
    require('./index');
}
else {
    console.log(`Starting main process ` + process.pid);
    const saveReport = () => {
        console.clear();
        console.log(report);
    };
    const CPU_CORES = +process.env.CPU_CORES;
    const availableCpuCores = os_1.default.cpus().length;
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
        if ((msg === null || msg === void 0 ? void 0 : msg.cmd) === 'result') {
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
        cluster_1.default.fork();
    }
    for (const id in cluster_1.default.workers) {
        cluster_1.default.workers[id].on('message', messageHandler);
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster_1.default.fork();
    });
}
//# sourceMappingURL=cluster.js.map