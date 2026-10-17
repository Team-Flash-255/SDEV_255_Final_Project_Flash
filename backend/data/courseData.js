// previously a placeholder in-memory array. Now connect to MongoDB
const Course = require("../models/course");
const mongoose = require("mongoose");

// Get all courses
async function getAllCourses() {
  return Course.find().sort({ courseNumber: 1 });
}

// Get course by Id
async function getCourseById(id) {
  if (!mongoose.isValidObjectId(id)) return null; //making sure the id is valid and not spam data before request is sent to server
  return Course.findById(id);
}

// Create course
async function createCourse(courseData) {
  const newCourse = new Course({
    courseNumber: courseData.courseNumber,
    name: courseData.name,
    description: courseData.description,
    subjectArea: courseData.subjectArea,
    credits: courseData.credits,
  });
  await newCourse.save();
  return newCourse;
}

// Update course
async function updateCourse(id, courseData) {
  const allowed = [
    "courseNumber",
    "name",
    "description",
    "subjectArea",
    "credits",
  ];
  const changes = {};
  for (const field of allowed) {
    if (courseData[field] !== undefined) {
      changes[field] = courseData[field];
    }
  }
  // return existingCourse
  return Course.findByIdAndUpdate(id, changes, {
    returnDocument: "after",
    runValidators: true,
  });
}

// Delete course
async function deleteCourse(id) {
  const deleted = await Course.findByIdAndDelete(id);
  return deleted !== null;
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
