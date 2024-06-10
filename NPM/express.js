const express = require("express");
const app = express();

//get,post,put,delete

app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/home", (req, res) => {
  res.send("welcome to home page");
});

app.get("/about", (req, res) => {
  res.send("welcome to about page");
});

//Route parameters

app.get("/about/:id", (req, res) => {
  res.send(req.params.id);
});

app.listen(3000, () => console.log("port is running on 3000"));
