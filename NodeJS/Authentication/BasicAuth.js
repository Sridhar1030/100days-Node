const express = require('express');
const bcrypt = require('bcrypt');
const basicAuth = require('basic-auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory user store (for simplicity)
const users = {};

// Middleware for Basic Authentication
const authenticate = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || !users[user.name]) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }

    bcrypt.compare(user.pass, users[user.name].password, (err, result) => {
        if (result) {
            next();
        } else {
            res.set('WWW-Authenticate', 'Basic realm="example"');
            return res.status(401).send('Authentication required.');
        }
    });
};

// Register a new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(409).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    res.status(201).send('User registered');
});

// Authenticated route
app.get('/protected', authenticate, (req, res) => {
    res.send('Hello, you are authenticated!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
