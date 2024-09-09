const express = require('express');
const logger = require('./middleware/logger');
const { createUser } = require('./modules/userModule');
const db = require('./config/database');
const UserObserver = require('./observers/userObserver');

const app = express();
const PORT = 3000;

// Middleware
app.use(logger);

// Observer
UserObserver.subscribe((msg) => console.log(`Observer: ${msg}`));

// Routes
app.get('/create/:type/:name', (req, res) => {
    const { type, name } = req.params;
    const user = createUser(type, name);
    res.json(user);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Database connection:', db.getConnection());
});
