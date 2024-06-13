const http = require("http");

// Define the hostname and port
const hostname = "127.0.0.1";
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  // Set the response header with a status code and content type
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  // Send the response body
  res.end("Hello, World!\n");
});

// Make the server listen on the specified port and hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
