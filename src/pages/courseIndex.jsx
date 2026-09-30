import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "../assets/pageLayout";

const API_URL = "http://localhost:3000";

function CourseIndex() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = search
      ? `${API_URL}/courses?search=${encodeURIComponent(search)}`
      : `${API_URL}/courses`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
  })
  .catch(() => {
    setError("Could not load courses. Check if server is running");
    setLoading(false);
  });
}, [search]);

function handleSearchSubmit(e) {
  e.preventDefault();
  setSearch(e.target.searchInput.value);
}

  return (
    <>
      <title>Course Index</title>
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

        <div className="container p-5 my-5 bg-secondary text-white text-center">
          <h1>Course Index</h1>
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
            courses.map((course) =>(
              <div className="container mt-3" key={course.id}>
                <div className="card">
                  <div className="card-header">
                    Course Number: {course.courseNumber}
                  </div>
                  <div className="card-body">Course Name: {course.name}</div>
                  <div className="card-body">Subject: {course.subjectArea}</div>
                  <div className="card-body">
                    Description: {course.description}
                  </div>
                  <div className="card-footer">
                    Credit Hours: {course.credits}
                  </div>
                </div>
              </div>
            ))}
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
export default CourseIndex;
