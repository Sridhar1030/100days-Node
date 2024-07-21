const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// A route that will cause an error
app.get("/error", (req, res) => {
	throw new Error("This is a test error");
});

// Handle 404 errors
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({
		error: {
			message: err.message,
		},
	});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
