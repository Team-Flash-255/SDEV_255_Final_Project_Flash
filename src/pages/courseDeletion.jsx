import { useState, useEffect } from "react";
import PageLayout from "../assets/pageLayout";
import PageHeader from "../assets/pageHeader";
import { API_URL } from "../config";

function CourseDeletion() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function loadCourses() {
    setLoading(true);
    setError(null);
    const url = search
      ? `${API_URL}/courses?search=${encodeURIComponent(search)}`
      : `${API_URL}/courses`;

    fetch(url, { headers: { "x-auth": localStorage.getItem("token") } })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(loadCourses, [search]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearch(e.target.searchInput.value);
  }

  function handleDelete(courseObj) {
    if (
      !window.confirm(
        `Delete course #${courseObj.courseNumber}: ${courseObj.name}?`,
      )
    )
      return;
    fetch(`${API_URL}/courses/${courseObj._id}`, {
      method: "DELETE",
      headers: { "x-auth": localStorage.getItem("token") },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failure to delete course");
        }

        loadCourses();
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <>
      <title>Course Deletion</title>
      <PageLayout>
        <PageHeader />

        <div className="container p-5 my-5 bg-secondary text-white text-center">
          <h1>Delete a Course</h1>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              name="searchInput"
            />
            <button className="btn btn-warning" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="container p-5 my-5 border bg-warning">
          {loading && <p>Loading courses...</p>}
          {error && <p className="text-dark">{error}</p>}
          {!loading && !error && courses.length === 0 && (
            <p>No courses found.</p>
          )}
          {!loading &&
            !error &&
            courses.map((course) => (
              <div className="container mt-3" key={course._id}>
                <div className="card">
                  <div className="card-header">
                    Course Number: {course.courseNumber}
                  </div>
                  <div className="card-body">Course Name: {course.name}</div>
                  <div className="card-body">Subject: {course.subjectArea}</div>
                  <div className="card-body">
                    Description: {course.description}
                  </div>
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span>Credit Hours: {course.credits}</span>
                    <button
                      className="btn btn-danger"
                      type="button"
                      onClick={() => handleDelete(course)}
                    >
                      Delete Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </PageLayout>
    </>
  );
}
export default CourseDeletion;
