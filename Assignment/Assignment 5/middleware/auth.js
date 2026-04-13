const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded.username;
        next();
    } catch (err) {
        return res.redirect("/");
    }
}

module.exports = { authMiddleware, SECRET };