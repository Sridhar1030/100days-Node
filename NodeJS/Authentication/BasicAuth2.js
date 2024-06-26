const express = require('express');
const basicAuth = require('basic-auth');

const app = express();
const port = 3000;

// Middleware for Basic Authentication
const authenticate = (req, res, next) => {
    const user = basicAuth(req);

    // Check if user credentials are correct
    if (!user || user.name !== 'admin' || user.pass !== 'password') {
        res.set('WWW-Authenticate', 'Basic realm="Basic Authentication"');
        return res.status(401).send('Authentication required.');
    }

    // If credentials are correct, proceed to next middleware or route handler
    next();
};

// Apply authentication middleware to all routes
app.use(authenticate);

// Protected route
app.get('/protected', (req, res) => {
    res.send('Hello, you are authenticated!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
