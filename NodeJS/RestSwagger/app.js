// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const exampleRoutes = require("./routes/example");
const swaggerApp = require("./swagger");

app.use(bodyParser.json());
app.use("/api", exampleRoutes);

// Swagger setup
app.use(swaggerApp);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
