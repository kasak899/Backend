const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const authMiddleware = require("../middlewares/authMiddleware");

// protected
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

// public
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);

module.exports = router;