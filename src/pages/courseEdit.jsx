// update
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../assets/pageLayout";
import PageHeader from "../assets/pageHeader";
import { API_URL } from "../config";

function CourseEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/courses/${id}`, {
            headers: { "x-auth": localStorage.getItem("token")},

        })
        .then((res) => {
            if (!res.ok) throw new Error("Course not found");
            return res.json();
        })
        .then((data) => setCourse(data))
        .catch(() => setMessage({ type: "danger", text: "Could not load course"}));
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;

        const changes = {
            courseNumber: form.courseNumber.value,
            name: form.courseName.value,
            subjectArea: form.courseSubject.value,
            credits: Number(form.creditHours.value),
            description: form.courseDescription.value,
        };

        fetch(`${API_URL}/courses/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-auth": localStorage.getItem("token"),
            },
            body: JSON.stringify(changes),
        })
        .then((res) => {
            if (!res.ok) throw new Error("Failed to update");
            setMessage({ type: "success", text: "Course updated successfully" });
            setTimeout(() => navigate("/courseIndex"), 1000);
        })
        .catch(() => {
            setMessage({
                type: "danger",
                text: "Something went wrong"
            });
        });
    }

    return (
        <>
        <title>Edit Course</title>
        <PageLayout>
            <PageHeader />
            <div className="container p-5 my-5 bg-secondary text-center text-white">
          <h1>Edit a Course</h1>
        </div>

        <div className="container p-5 my-5 border bg-secondary">
          {message && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}
          {!course && !message && <p className="text-white">Loading course...</p>}

          {/* Only show the form once the course has loaded */}
          {course && (
            <div className="container mt-3">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <span className="input-group-text text-dark bg-warning">
                    Course Number
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="courseNumber"
                    defaultValue={course.courseNumber}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text text-dark bg-warning">
                    Course Name
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="courseName"
                    defaultValue={course.name}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text text-dark bg-warning">
                    Course Subject
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="courseSubject"
                    defaultValue={course.subjectArea}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text text-dark bg-warning">
                    Credit Hours
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="creditHours"
                    defaultValue={course.credits}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text text-dark bg-warning">
                    Course Description
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="courseDescription"
                    defaultValue={course.description}
                  />
                </div>
                <button type="submit" className="btn btn-outline-warning">
                  Save Changes
                </button>
              </form>
            </div>
          )}
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
export default CourseEdit;