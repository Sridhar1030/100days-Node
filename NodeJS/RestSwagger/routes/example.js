// routes/example.js
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/example", (req, res) => {
	res.status(200).json(["example1", "example2"]);
});

/**
 * @swagger
 * /example/{id}:
 *   get:
 *     summary: Retrieve a single example by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The example ID
 *     responses:
 *       200:
 *         description: A single example
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Example not found
 */
router.get("/example/:id", (req, res) => {
	const { id } = req.params;
	if (id === "1") {
		res.status(200).json("example1");
	} else if (id === "2") {
		res.status(200).json("example2");
	} else {
		res.status(404).send("Example not found");
	}
});

/**
 * @swagger
 * /example:
 *   post:
 *     summary: Create a new example
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Example created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/example", (req, res) => {
	const { name } = req.body;
	if (name) {
		res.status(201).json({ message: "Example created successfully", name });
	} else {
		res.status(400).send("Invalid input");
	}
});

module.exports = router;
