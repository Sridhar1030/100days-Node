const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

let courses = [
	{ id: 1, name: "JavaScript" },
	{ id: 2, name: "Python" },
	{ id: 3, name: "Java" },
	{ id: 4, name: "C++" },
];

// GET request handler to fetch all courses
app.get("/courses", (req, res) => {
	res.send(courses);
});

// POST request handler to add a new course
app.post("/course", (req, res) => {
	const course = {
		id: courses.length + 1,
		name: req.body.name,
	};
	courses.push(course);
	res.send(course);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
