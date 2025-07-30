require("dotenv").config(); // Must come first
const express = require("express");
const connectDB = require("./src/db/db");
const authRoutes = require("./src/routes/auth.routes");// ✅ Make sure path is correct

const app = express();

connectDB();

// ✅ Middlewares
app.use(express.json()); // for parsing application/json

// ✅ Routes
app.use("/auth", authRoutes); // now /auth/register will work

// ✅ Start server
app.listen(3000, () => {
  console.log("server running on port 3000");
});
