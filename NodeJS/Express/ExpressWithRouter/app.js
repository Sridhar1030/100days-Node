const express = require("express");
const app = express();
const port = 3000;

// Import the router
const userRouter = require("./routes/userRouter");

// Use the router
app.use("/users", userRouter);

app.get("/", (req, res) => {
	res.send("Welcome to the main page!");
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
