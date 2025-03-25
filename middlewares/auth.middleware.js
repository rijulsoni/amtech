const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    console.log("auth middleware", req.cookies)
    const token = req.cookies.token;
    if (!token) return res.redirect('/api/auth/login?error=Please login first');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.redirect('/api/auth/login?error=Session expired');
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };