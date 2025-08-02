require("dotenv").config(); // Must come first
const express = require("express");
const connectDB = require("./src/db/db");

const authRoutes = require("./src/routes/auth.routes");
const postRoutes = require("./src/routes/post.routes"); // ✅ added
const cookieParser = require("cookie-parser");



const app = express();

connectDB();

// ✅ Middlewares
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // ✅ Add before routes

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/posts", postRoutes); // ✅ added

// ✅ Start server
app.listen(3000, () => {
  console.log("server running on port 3000");
});
