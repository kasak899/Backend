const User = require("../models/User");

// GET PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROFILE
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // optional: only owner can update
    if (user._id.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    user.name = name || user.name;
    user.bio = bio || user.bio;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};