const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// TEMP: store todos (in-memory)
let todos = [];

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const jwt = require("jsonwebtoken");
const { authMiddleware, SECRET } = require("./middleware/auth");

// Show login page
app.get("/", (req, res) => {
    res.render("login");
});

// Login
app.post("/login", (req, res) => {
    const { username } = req.body;

    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });

    res.cookie("token", token);
    res.redirect("/dashboard");
});

// Dashboard (Protected)
app.get("/dashboard", authMiddleware, (req, res) => {
    res.render("dashboard", {
        user: req.user,
        todos: todos
    });
});

// Add todo
app.post("/add", authMiddleware, (req, res) => {
    const { task } = req.body;

    if (!task) throw new Error("Task cannot be empty");

    todos.push(task);
    res.redirect("/dashboard");
});

// Delete todo
app.get("/delete/:index", authMiddleware, (req, res) => {
    const index = req.params.index;

    todos.splice(index, 1);
    res.redirect("/dashboard");
});

// Logout
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

// Error middleware (LAST)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);