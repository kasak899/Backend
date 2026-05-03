const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

// public
router.get("/:id", getUserProfile);

// protected
router.put("/:id", authMiddleware, updateUserProfile);

module.exports = router;