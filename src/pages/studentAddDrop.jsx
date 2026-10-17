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
  const [enrolled, setEnrolled] = useState([]);
  const token = localStorage.getItem("token");
  const enrolledIds = new Set(enrolled.map((c) => c._id)); //ids of enrolled classes

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`${API_URL}/enrollments`, { headers: { "x-auth": token } })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setEnrolled(data);
      })
      .catch(() => {});
  }, [token]);

  useEffect(() => {
    setLoading(true);
    const url = search
      ? `${API_URL}/courses?search=${encodeURIComponent(search)}`
      : `${API_URL}/courses`;

    fetch(url, { headers: { "x-auth": token } })
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
  }, [search]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearch(e.target.searchInput.value);
  }

  function enroll(courseIdSelected) {
    fetch(`${API_URL}/enroll/${courseIdSelected}`, {
      method: "POST",
      headers: { "x-auth": token },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        setEnrolled((prevEnrolledList) => [
          ...prevEnrolledList, //this uses the old state of "enrolled" in case user clicks (sends requests) rapidly in a short time
          courses.find((courseObj) => courseObj._id === courseIdSelected),
        ]);
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function unenroll(courseIdSelected) {
    fetch(`${API_URL}/enroll/${courseIdSelected}`, {
      method: "DELETE",
      headers: { "x-auth": token },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        setEnrolled((prevEnrolledList) =>
          prevEnrolledList.filter(
            (courseObj) => courseObj._id !== courseIdSelected,
          ),
        );
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <>
      <title>Course List</title>
      <StudentPageLayout>
        <PageHeader />
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="p-4 my-4 bg-secondary text-white text-center">
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

            <div className="p-3 my-2 border bg-warning">
              {loading && <p>Loading courses...</p>}
              {error && <p className="text-dark">{error}</p>}
              {!loading && !error && courses.length === 0 && (
                <div className="card text-center">No courses found.</div>
              )}
              {!loading &&
                !error &&
                courses.map((course) => (
                  <div className="p-3 mt-3" key={course._id}>
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
                      <div className="card-footer d-flex justify-content-between align-items-center">
                        <span>Credit Hours: {course.credits}</span>
                        {enrolledIds.has(course._id) ? (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => unenroll(course._id)}
                          >
                            Drop class
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => enroll(course._id)}
                          >
                            Enroll in class
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="p-3 my-2 border bg-warning">
              <div className=" p-4 my-4 bg-secondary text-white text-center">
                <h1>Your Schedule:</h1>
              </div>
              {enrolled.length === 0 && (
                <div className="card text-center">No courses found.</div>
              )}
              {enrolled.map((course) => (
                <div className="p-3 mt-3" key={course._id}>
                  <div className="card">
                    <div className="card-header">
                      Course Number: {course.courseNumber}
                    </div>
                    <div className="card-body">Course Name: {course.name}</div>
                    <div className="card-body">
                      Subject: {course.subjectArea}
                    </div>
                    <div className="card-body">
                      Description: {course.description}
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center">
                      <span>Credit Hours: {course.credits}</span>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => unenroll(course._id)}
                      >
                        Drop class
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-3" style={{ height: "100px" }}>
          <div className="col-sm-12 p-3 bg-secondary text-warning text-center fs-6">
            Copyright
          </div>
        </div>
      </StudentPageLayout>
    </>
  );
}
export default StudentAddDrop;
