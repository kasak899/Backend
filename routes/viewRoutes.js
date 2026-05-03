const express = require("express");
const router = express.Router();
const axios = require("axios");

// BASE URL (your backend API)
const API = "http://localhost:5000/api";

// 🔐 AUTH MIDDLEWARE (protect routes)
const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  next();
};

// ================= AUTH ROUTES =================

// Register Page
router.get("/register", (req, res) => {
  res.render("pages/register");
});

// Register POST
router.post("/register", async (req, res) => {
  try {
    await axios.post(`${API}/auth/register`, req.body);
    res.redirect("/login");
  } catch (err) {
    res.send("Error in registration");
  }
});

// Login Page
router.get("/login", (req, res) => {
  res.render("pages/login");
});

// Login POST
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${API}/auth/login`, req.body);

    const token = response.data.token;

    // store token in cookie
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/dashboard");
  } catch (err) {
    res.send("Invalid credentials");
  }
});

// Logout
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// ================= MAIN PAGES =================

// 🛡️ Dashboard (Protected)
router.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const posts = await axios.get(`${API}/posts`);
    res.render("pages/dashboard", { posts: posts.data });
  } catch (err) {
    res.send("Error loading dashboard");
  }
});

// 🛡️ Create Post Page (Protected)
router.get("/create", requireAuth, (req, res) => {
  res.render("pages/createPost");
});

// 🛡️ Create Post (Protected)
router.post("/create", requireAuth, async (req, res) => {
  try {
    const token = req.cookies.token;

    await axios.post(`${API}/posts`, req.body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.send("Error creating post");
  }
});

// Single Post Page
router.get("/post/:id", async (req, res) => {
  try {
    const post = await axios.get(`${API}/posts/${req.params.id}`);
    res.render("pages/post", { post: post.data });
  } catch (err) {
    res.send("Post not found");
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;