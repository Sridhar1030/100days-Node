const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data
let books = [
	{ id: 1, title: "1984", author: "George Orwell" },
	{ id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

// GET all books
app.get("/books", (req, res) => {
	res.json(books);
});

// GET a single book by ID
app.get("/books/:id", (req, res) => {
	const book = books.find((b) => b.id === parseInt(req.params.id));
	if (!book) return res.status(404).send("Book not found");
	res.json(book);
});

// POST a new book
app.post("/books", (req, res) => {
	const newBook = {
		id: books.length + 1,
		title: req.body.title,
		author: req.body.author,
	};
	books.push(newBook);
	res.status(201).json(newBook);
});

// PUT to update a book by ID
app.put("/books/:id", (req, res) => {
	const book = books.find((b) => b.id === parseInt(req.params.id));
	if (!book) return res.status(404).send("Book not found");

	book.title = req.body.title;
	book.author = req.body.author;
	res.json(book);
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
	const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
	if (bookIndex === -1) return res.status(404).send("Book not found");

	const deletedBook = books.splice(bookIndex, 1);
	res.json(deletedBook);
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
