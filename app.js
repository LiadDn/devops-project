const http = require('http');
const client = require('prom-client');

const register = new client.Registry();
client.collectDefaultMetrics({ register });

const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  registers: [register]
});

const server = http.createServer(async (req, res) => {
  if (req.url === '/metrics') {
    res.setHeader('Content-Type', register.contentType);
    res.end(await register.metrics());
    return;
  }
  
  httpRequests.inc();
  res.write('Hello DevOps!');
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

