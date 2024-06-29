// index.js
require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`DB_HOST is set to: ${process.env.DB_HOST}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
