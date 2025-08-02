const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authMiddleware(req, res, next) {
     const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, please login first"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next(); // ✅ this is crucial
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;
