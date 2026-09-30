// route handlers - call in functions from courseData.js

const express = require("express");
const router = express.Router();
const courseData = require("../data/courseData");

// GET courses - all
router.get("/courses", async (req, res) => {
    const courses = await courseData.getAllCourses();
    const { search } = req.query;

    if (!search) {
        return res.json(courses);
    }

    const term = search.toLowerCase();
    const filtered = courses.filter((c) =>
    c.name.toLowerCase().includes(term) ||
    c.courseNumber.toLowerCase().includes(term)
);
res.json(filtered);
});

// GET courses - get one course
router.get("/courses/:id", async (req, res) => {
    const course = await courseData.getCourseById(req.params.id);
    if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
});

// POST - create new course
router.post("/courses", async (req, res) => {
    const { courseNumber, name, description, subjectArea, credits } = req.body;

    if (!courseNumber || !name || !description || !subjectArea || credits === undefined) {
        return res.status(400).json({
            error:
            "courseNumber, name, description, subjectArea, and credits are all required",
        });
    }

    const newCourse = await courseData.createCourse({
        courseNumber,
        name,
        description,
        subjectArea,
        credits,
    });
    res.status(201).json(newCourse);
});

// PUT - update existing course
router.put("/courses/:id", async (req, res) => {
    const updated = await courseData.updateCourse(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.json(updated);
});

// DELETE - delete a course
router.delete("/courses/:id", async (req, res) => {
    const deleted = await courseData.deleteCourse(req.params.id);
    if (!deleted) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.status(204).send();
});

module.exports = router;