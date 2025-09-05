const { log } = require("console");
const jwt = require("jsonwebtoken");

function verifyUserToken(req, res, next) {
    const token = req.headers["token"] || req.body.token || req.query.token;
    //log(token);
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
        req.user = req.user || {};
        req.user.id = decoded.id;
        log(decoded);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token." });
    }
}
function verifyAdminToken(req, res, next) {
    const token = req.headers["token"] || req.body.token || req.query.token;
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access Denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        req.admin = req.admin || {};
        req.admin.id = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = {
    verifyUserToken,
    verifyAdminToken,
};
