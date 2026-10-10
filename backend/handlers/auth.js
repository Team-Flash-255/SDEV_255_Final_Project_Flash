// runs before route
const jwt = require("jwt-simple");

// login for student and teacher
function requireLogin(req, res, next){
    if (!req.headers["x-auth"]) {
        return res.status(401).json({
            error: "Missing x-auth"
        });
    }
    const token = req.headers["x-auth"];

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ error: "invalid jwt" });
    }
}

// second one to be a teacher
function requireTeacher(req, res, next) {
    if (req.user.role !== "teacher") {
        return res.status(403).json({ error: "Restricted to teachers" });
    }
    next();
}

module.exports = { requireLogin, requireTeacher };