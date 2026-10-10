// Login routes (same as tutorial from Module 7)
const express = require("express");
const router = express.Router();
const jwt = require("jwt-simple");
const User = require("../models/user");
const { requireLogin, requireTeacher } = require("../handlers/auth");

// auth login
router.post("/auth", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: "Must enter username and password "});
    }
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || user.password !== req.body.password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.encode({ username: user.username, role: user.role }, process.env.JWT_SECRET);

        res.json({
            username: user.username,
            role: user.role,
            token: token,
            auth: 1
        });
    }
    catch(err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/status", requireLogin, (req, res) => {
    res.json(req.user);
});

router.post("/user", requireLogin, requireTeacher, async (req, res) =>{
    if (!req.body.username || !req.body.password || !req.body.role) {
        return res.status(400).json({ error: "Missing username, password, role" })
    }
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    });
    try {
        await newUser.save();
        res.sendStatus(201);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;