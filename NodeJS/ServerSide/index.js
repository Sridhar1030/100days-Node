import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();


// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up the view engine
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
	res.render("index", {
		title: "Home",
		content: "Welcome to SSR with Express!",
	});
});

app.get("/about", (req, res) => {
	res.render("about", { title: "About", content: "This is the about page." });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
