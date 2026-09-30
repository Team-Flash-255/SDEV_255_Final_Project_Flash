import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "../assets/pageLayout";

const API_URL = "http://localhost:3000";

function CourseCreation() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const course = {
      courseNumber: form.courseNumber.value,
      name: form.courseName.value,
      subjectArea: form.courseSubject.value,
      credits: Number(form.creditHours.value),
      description: form.courseDescription.value,
    };

    fetch(`${API_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    })
    .then((res) => {
      if (!res.ok) throw new Error("Failure to create course");
      setMessage({ type: "success", text: "Course created successfully" });
      setTimeout(() => navigate("/courseIndex"), 1000);
    })
    .catch(() => {
      setMessage({
        type: "danger",
        text: "Something went wrong. Check if server is running.",
      });
    });
}

  return (
    <>
      <title>Course Creation</title>
      <PageLayout>
        <div className="row" style={{ height: "100px" }}>
          <div className="col-sm-9 p-3 bg-secondary text-white text-center fs-1">
            Lorem Ipsum School of Placeholder
          </div>
          <div className="col-sm-3 p-3 bg-warning text-dark fs-3">
            Welcome, user!
            <Link to="/login" className="btn btn-outline-dark">
              Sign Out
            </Link>
          </div>
        </div>

        <div className="container p-5 my-5 bg-secondary text-center text-white">
          <h1>Add a Course</h1>
        </div>

        <div className="container p-5 my-5 border bg-secondary">
          <div className="container mt-3">
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text text-dark bg-warning">
                  Course Number
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Number"
                  name="courseNumber"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text text-dark bg-warning">
                  Course Name
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Name"
                  name="courseName"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text text-dark bg-warning">
                  Course Subject
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Subject"
                  name="courseSubject"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text text-dark bg-warning">
                  Credit Hours
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Credit Hours"
                  name="creditHours"
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text text-dark bg-warning">
                  Course Description
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Description"
                  name="courseDescription"
                />
              </div>
              <button type="submit" className="btn btn-outline-warning">
                Create Course
              </button>
            </form>
          </div>
        </div>

        <div className="row" style={{ height: "100px" }}>
          <div className="col-sm-12 p-3 bg-secondary text-warning text-center fs-6">
            Copyright
          </div>
        </div>
      </PageLayout>
    </>
  );
}
export default CourseCreation;
