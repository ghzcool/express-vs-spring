const request = require('request');

interface RequestInfo {
  time: number;
  success?: boolean;
}

const handleRequest = (url: string, method: 'post' | 'get', data?: any) => new Promise((resolve, reject) => {
  const requestInfo: RequestInfo = {
    time: new Date().getTime(),
    success: null
  };
  request[method ?? 'get'](url, {
    json: data,
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    requestInfo.time = new Date().getTime() - requestInfo.time;

    if (error) {
      requestInfo.success = false;
      report.requestsFailed++;
      reject(error);
    }
    if (!error && response.statusCode == 200) {
      requestInfo.success = true;
      resolve(body);
    }
  });
  report.requestsSent++;
  requests.push(requestInfo);
});

let counter = 0;

const testOnce = async () => {
  try {
    await handleRequest('http://localhost:8080/api/records', 'get');
    await handleRequest('http://localhost:8080/api/records', 'post', {
      name: 'Record name' + counter,
      description: 'Record description text'
    });
    await handleRequest('http://localhost:8080/api/records', 'get');
    console.clear();
    console.log((++counter) + ' / ' + report.testsAmount);
  } catch (error) {
    console.error(error);
  }
  report.testsProcessed++;

  if (report.testsAmount === report.testsProcessed) {
    report.time = new Date().getTime() - report.time;

    let avgSum = 0;
    requests.forEach(requestInfo => {
      if (report.minRequestTime === null || report.minRequestTime > requestInfo.time) {
        report.minRequestTime = requestInfo.time;
      }
      if (report.maxRequestTime === null || report.maxRequestTime < requestInfo.time) {
        report.maxRequestTime = requestInfo.time;
      }
      avgSum += requestInfo.time;
    });
    report.avgRequestTime = avgSum / requests.length;
    const max01Amount = Math.ceil(requests.length / 1000);
    const max01 = requests.map(item => item.time).sort((a, b) => b - a).slice(0, requests.length / 1000);
    let max01Avg = 0;
    max01.forEach(time => {
      max01Avg += time;
    });
    report.max01RequestTime = max01Avg / max01Amount;

    process.send({cmd: 'result', data: report});
  }
};

const testChain = () => {
  if (testsStarted < TESTS_AMOUNT) {
    testsStarted++;
    testOnce().then(testChain).catch(console.error);
  }
};

const TESTS_AMOUNT = +(process.env.TESTS_AMOUNT ?? 10000); // for each core
const TESTS_IN_PARALLEL = +(process.env.TESTS_IN_PARALLEL ?? 20); // for each core

const report = {
  testsAmount: TESTS_AMOUNT,
  testsInParallel: TESTS_IN_PARALLEL,
  time: new Date().getTime(),
  testsProcessed: 0,
  requestsSent: 0,
  requestsFailed: 0,
  minRequestTime: null,
  max01RequestTime: 0,
  maxRequestTime: null,
  avgRequestTime: 0
};

const requests = [];

let testsStarted = 0;

for (let i = 0; i < TESTS_IN_PARALLEL; i++) {
  testChain();
}
