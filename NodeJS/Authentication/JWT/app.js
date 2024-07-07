const express = require("express");
const app = express();
const protectedRoutes = require("./routes/protectedRoutes");

app.use(express.json());
app.use("/api/protected", protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
