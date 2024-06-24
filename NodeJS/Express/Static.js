const express = require("express");
const app = express();
const port = 3000;

// Middleware to serve static files from the 'public' directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
