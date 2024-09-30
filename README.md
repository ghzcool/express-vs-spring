# Spring vs Node

## Database

MariaDB 11.5.2 is used.

import from ./db/import.sql

You can run database on separate computer, so it does not affect server performance.
Set env variable DB_HOST (localhost by default).

## Node+Express

Node v20.10.0 is used.

Express 4.18.2 is used.

if you want to limit amount of cores used by node application then
set env variable CPU_CORES  (all cores by default).

run in ./node
```
npm ci
npm start
```

## Java+Spring

Maven 3.9.2 is used.
Java 21 from 2023-09-19 is used.
Spring 3.3.0 is used.

run in ./spring
```
mvn install
mvn spring-boot:run
```

## Test

Run test on different computer, so it does not affect server performance.

Set env variables:

Amount of cpu cores used CPU_CORES (all cores by default)

Amount of test passes for each core TESTS_AMOUNT (10000 by default)

Amount of tests in parallel for each core TESTS_IN_PARALLEL (20 by default)

run in ./test
```
npm ci
npm start
```

## Report

Report is saved in ./report/report.json and shown in console
