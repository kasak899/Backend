const Post = require("../models/Post");


// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user,
    });

    await post.save();

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET ALL POSTS
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET SINGLE POST
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE POST (OWNER ONLY)
exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check owner
    if (post.author.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// DELETE POST (OWNER ONLY)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check owner
    if (post.author.toString() !== req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchPosts = async (req, res) => {
  try {
    const keyword = req.query.q;

    const posts = await Post.find({
      title: { $regex: keyword, $options: "i" },
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};