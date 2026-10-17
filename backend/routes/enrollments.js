// Login routes (same as tutorial from Module 7)
const express = require("express");
const router = express.Router();
const jwt = require("jwt-simple");
const User = require("../models/user");
const Course = require("../models/course");
const { getCourseById } = require("../data/courseData");
const { requireLogin } = require("../handlers/auth");

router.post("/enroll/:courseId", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.role !== "student") {
      return res.status(403).json({ error: "Only students can enroll" });
    }
    const course = await getCourseById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    if (user.enrolledCourses.some((id) => id.equals(course._id))) {
      return res.status(409).json({ error: "Already enrolled in course!" });
    }

    user.enrolledCourses.push(course._id);
    await user.save();
    res.status(200).json({ message: "Enrolled" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/enroll/:courseId", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const coursesLengthBefore = user.enrolledCourses.length;

    user.enrolledCourses = user.enrolledCourses.filter(
      (id) => !id.equals(req.params.courseId),
    ); //filtering for all courseIds that do NOT match will weed out the one we want to unenroll from
    if (user.enrolledCourses.length === coursesLengthBefore) {
      return res
        .status(409)
        .json({
          error: "Not unenrolled. You are not enrolled in that course.",
        });
    }

    await user.save();
    res.status(200).json({ message: "Unenrolled" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/enrollments", requireLogin, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).populate(
      "enrolledCourses",
    );
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
