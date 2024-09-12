const express = require("express");
const bodyParser = require("body-parser");
const {
	contents,
	createContent,
	updateContent,
	deleteContent,
} = require("./content");
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static("views"));

// Get all content
app.get("/api/contents", (req, res) => res.json(contents));

// Create new content
app.post("/api/contents", (req, res) => {
	const newContent = createContent(req.body);
	res.json(newContent);
});

// Update content
app.put("/api/contents/:id", (req, res) => {
	const updatedContent = updateContent(req.params.id, req.body);
	res.json(updatedContent);
});

// Delete content
app.delete("/api/contents/:id", (req, res) => {
	const deleted = deleteContent(req.params.id);
	res.json({ success: deleted });
});

// Serve HTML page
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.listen(PORT, () => console.log(`CMS running at http://localhost:${PORT}`));
