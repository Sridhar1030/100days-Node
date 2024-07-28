import express, { json } from "express";
import routes from "./routes.js";

const app = express();
app.use(json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;

