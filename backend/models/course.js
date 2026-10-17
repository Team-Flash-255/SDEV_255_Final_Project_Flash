const db = require("../db");

const Course = db.model("Course", {
  courseNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  subjectArea: { type: String, required: true },
  credits: { type: Number, required: true, min: 0 },
  createdBy: { type: String, required: true },
  available: { type: Boolean, default: true },
});

module.exports = Course;
