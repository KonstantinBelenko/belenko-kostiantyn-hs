#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { table } = require('table');
const axios = require('axios');

const argv = yargs(hideBin(process.argv))
  .command('$0 <url>', 'server benchmarking tool', yargs => {
    yargs
      .positional('url', {
        describe: 'url to send requests to',
        type: 'string',
      })
      .option('c', {
        alias: 'concurrency',
        describe: 'number of parallel requests to perform at a time',
        type: 'number',
        default: 1,
      })
      .option('n', {
        alias: 'requests',
        describe: 'number of requests to perform for the benchmarking session',
        type: 'number',
        default: 1,
      })
      .option('b', {
        alias: 'body',
        describe: 'send a random generated body with request',
        type: 'boolean',
        default: false,
      });
  })
  .help()
  .parse();

const bombard = async ({ url, concurrency, requests, body }) => {
  const results = [];
  const promises = [];

  const request = async () => {
    while (true) {
      const currentRequestNumber = results.length;
      if (currentRequestNumber >= requests) break;

      const start = Date.now();
      try {
        const requestData = body ? { data: Math.random().toString(36).substring(2) } : {};
        await axios.post(url, requestData);
        const time = Date.now() - start;

        results[currentRequestNumber] = time;
      } catch (error) {
        console.error('Request failed:', error.message);
      }
    }
  };

  for (let i = 0; i < concurrency; i++) {
    promises.push(request());
  }

  await Promise.all(promises);

  const successful = results.length;
  const failing = requests - successful;
  const averageTime = results.reduce((a, b) => a + b, 0) / successful;
  const sortedResults = results.slice().sort((a, b) => a - b);
  const minTime = sortedResults[0];
  const maxTime = sortedResults[successful - 1];
  const medianTime = sortedResults[Math.floor(successful / 2)];

  const data = [
    ['Bombarded', `${requests} times`],
    ['Successful', successful],
    ['Failing', failing],
    ['Minimum', `${minTime}ms`],
    ['Maximum', `${maxTime}ms`],
    ['Median', `${medianTime}ms`],
    ['Average', `${averageTime.toFixed(2)}ms`],
  ];

  console.log(table(data));
};

bombard(argv)
