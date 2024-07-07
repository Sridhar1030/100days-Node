const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/dashboard', authMiddleware, (req, res) => {
    res.send('This is the protected dashboard route.');
});

module.exports = router;
