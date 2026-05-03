const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.set("views", "./views");



// Test Route
app.get("/", (req, res) => {
  res.send("API Running...");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

const postRoutes = require("./routes/postRoutes");

app.use("/api/posts", postRoutes);

const viewRoutes = require("./routes/viewRoutes");

app.use("/", viewRoutes);



module.exports = app;