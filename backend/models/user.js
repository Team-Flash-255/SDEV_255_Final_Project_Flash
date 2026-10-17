const db = require("../db");

const User = db.model("User", {
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["teacher", "student"] },
  enrolledCourses: [{ type: db.Schema.Types.ObjectId, ref: "Course" }], //We're using an array of Course object ids;  ref tells mongodb which model to look at for (course) object data
});

module.exports = User;
