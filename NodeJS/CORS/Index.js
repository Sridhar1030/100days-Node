const express = require("express");
const cors = require("cors");

const app = express();

// Basic usage (allow all origins)
app.use(cors());

// To allow only specific origins
const corsOptions = {
	origin: "http://example.com",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true,
	optionsSuccessStatus: 204,
};

// To allow multiple origins
app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("CORS configuration is successful!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
