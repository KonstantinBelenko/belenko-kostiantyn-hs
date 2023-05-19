const http = require('http');
const delay = 100;

const server = http.createServer((req, res) => {
  setTimeout(() => {
    if (req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        console.log(body);
        res.end('Body received and logged.');
      });
    } else {
      res.end('Hello, World!');
    }
  }, delay);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

