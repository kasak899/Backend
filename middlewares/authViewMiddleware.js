const jwt = require('jsonwebtoken');

const authViewMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id;

    next();
  } catch (err) {
    return res.redirect('/login');
  }
};

module.exports = authViewMiddleware;