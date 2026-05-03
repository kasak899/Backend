const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    let token;

    // get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token failed" });
  }
};

module.exports = authMiddleware;