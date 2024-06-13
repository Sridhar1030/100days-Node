const express = require("express");
const app = express();
const port = 3000;
//get,post,put,delete

app.get("/", (req, res) => {
  res.send("express.js");
});


app.listen(port, () => console.log(`port is running on ${port}`));
