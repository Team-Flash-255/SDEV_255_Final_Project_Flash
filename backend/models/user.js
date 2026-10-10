const db = require("../db")

const User = db.model("User", {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["teacher", "student"] }
});

module.exports = User;