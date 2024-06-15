// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port
const PORT = 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Read the index.html file
    const filePath = path.join(__dirname, 'Calculator.js');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
