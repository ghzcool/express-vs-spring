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
    const CPU_CORES = +process.env.CPU_CORES;
    const availableCpuCores = os_1.default.cpus().length;
    const coresUsed = (!!CPU_CORES && CPU_CORES < availableCpuCores) ? CPU_CORES : availableCpuCores;
    for (let i = 0; i < coresUsed; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster_1.default.fork();
    });
}
//# sourceMappingURL=cluster.js.map