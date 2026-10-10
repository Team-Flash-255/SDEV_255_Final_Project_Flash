// route handlers - call in functions from courseData.js

const express = require("express");
const router = express.Router();
const courseData = require("../data/courseData");
const { requireLogin, requireTeacher } = require("../handlers/auth");

// GET courses - all
router.get("/courses", requireLogin, async (req, res) => {
   try { 
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
}
catch (err){
    res.status(500).json({ error: err.message })
    }
});

// GET courses - get one course
router.get("/courses/:id", requireLogin, async (req, res) => {
    try {
     const course = await courseData.getCourseById(req.params.id);
     if (!course) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
}
catch (err){
    res.status(400).json({ error: err.message });
}
});

// POST - create new course
router.post("/courses", requireLogin, requireTeacher, async (req, res) => {
    const { courseNumber, name, description, subjectArea, credits } = req.body;

    if (!courseNumber || !name || !description || !subjectArea || credits === undefined) {
        return res.status(400).json({
            error:
            "courseNumber, name, description, subjectArea, and credits are all required",
        });
    }
    
    try {
     const newCourse = await courseData.createCourse({
        courseNumber,
        name,
        description,
        subjectArea,
        credits,
    });
    res.status(201).json(newCourse);
}
catch (err) {
    res.status(400).json({ error: err.message });
}
});

// PUT - update existing course
router.put("/courses/:id", requireLogin, requireTeacher, async (req, res) => {
    try {
     const updated = await courseData.updateCourse(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Course not found" });
      }
     res.json(updated);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE - delete a course
router.delete("/courses/:id", requireLogin, requireTeacher, async (req, res) => {
    try {
    const deleted = await courseData.deleteCourse(req.params.id);
    if (!deleted) {
        return res.status(404).json({ error: "Course not found" });
    }
    res.status(204).send();
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;