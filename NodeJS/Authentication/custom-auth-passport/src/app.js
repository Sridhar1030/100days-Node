import express from "express";
import passport from "./auth/customStrategy.js"; // Ensure the correct path is used
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(passport.initialize());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
