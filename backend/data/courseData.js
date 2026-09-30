// temporary placeholder for Adrian's database

let courses = [
    {
        id: 1,
        courseNumber: "SDEV255",
        name: "Web App Development",
        description: "Foundations of HTML, CSS, and JavaScript for building web apps",
        subjectArea: "Computer Science",
        credits: 3,
    },
    {
        id: 2,
        courseNumber: "SDEV200",
        name: "Software Development with Java",
        description: "Software Provides a basic understanding of the fundamental concepts involved when using the Java programming development language",
        subjectArea: "Computer Science",
        credits: 3,
    },
];

// Get course by Id
let nextId = 3;

async function getAllCourses() {
    return courses;
}

async function getCourseById(id) {
    return courses.find((c) => c.id === Number(id)) || null;
}

// Create course
async function createCourse(courseData) {
    const newCourse = {
        id: nextId,
        courseNumber: courseData.courseNumber,
        name: courseData.name,
        description: courseData.description,
        subjectArea: courseData.subjectArea,
        credits: courseData.credits,
    },
    nextId = nextId + 1;
    courses.push(newCourse);
    return newCourse;    
}

// Update course
async function updateCourse(id, courseData) {
    const index = courses.findIndex((c) => c.id === Number(id));
    if (index === -1) return null;

    const existingCourse = courses[index];

    if (courseData.courseNumber !== undefined) {
        existingCourse.courseNumber = courseData.courseNumber;
    }
    if (courseData.name !== undefined) {
        existingCourse.name = courseData.name;
    }
    if (courseData.description !== undefined) {
        existingCourse.description = courseData.description;
    }
    if (courseData.subjectArea !== undefined) {
        existingCourse.subjectArea = courseData.subjectArea;
    }
    if (courseData.credits !== undefined) {
        existingCourse.credits = courseData.credits;
    }

    return existingCourse;
}

// Delete course
async function deleteCourse(id) {
    let foundIndex = -1;

    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id === Number(id)) {
            foundIndex = i;
        }
    }

    if (foundIndex === -1) {
        return false;
    }

    const newCourses = [];
    for (let i = 0; i < courses.length; i++) {
        if (i !== foundIndex) {
            newCourses.push(courses[i]);
        }
    }
    courses = newCourses;

    return true;
}

    module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
};