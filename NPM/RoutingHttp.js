const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Basic routing
    if (req.url === '/') {
      res.end('Welcome to the homepage!');
    } else if (req.url === '/about') {
    res.end('This is the about page.');
  } else if (req.url === '/contact') {
    res.end('This is the contact page.');
  } else {
    res.statusCode = 404;
    res.end('Page not found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
