import { useState, useEffect } from "react";
import StudentPageLayout from "../assets/studentPageLayout";
import PageHeader from "../assets/pageHeader";
import { API_URL } from "../config";

function StudentAddDrop() {
  //View only. only teachers have CRUD functions
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = search
    ? `${API_URL}/courses?search=${encodeURIComponent(search)}`
    : `${API_URL}/courses`;

    fetch(url, { headers: { "x-auth": localStorage.getItem("token")}})
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Check if server is running");
        setLoading(false);
      });
  }, [search]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearch(e.target.searchInput.value);
  }

  return (
    <>
      <title>Course List</title>
      <StudentPageLayout>
        <PageHeader />
        <div className="row">
          <div className="col">
            <div>
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
                courses.map((course) => (
                <div className="container mt-3" key={course._id}>
                  <div className="card">
                    <div className="card-header">
                      Course Number: {course.courseNumber}
                      </div>
                    <div className="card-body">
                      Course Name: {course.name}
                      </div>
                    <div className="card-body">
                      Subject: {course.subjectArea}
                      </div>
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
              </div>
            </div>
          </div>
        <div className="row" style={{ height: "100px" }}>
          <div className="col-sm-12 p-3 bg-secondary text-warning text-center fs-6">
            Copyright
          </div>
        </div>
      </StudentPageLayout>
    </>
  );
}
export default StudentAddDrop;
