import StudentPageLayout from "../assets/studentPageLayout";
import PageHeader from "../assets/pageHeader";
import { useState, useEffect } from "react";
import { API_URL } from "../config";

function StudentHome() {
  const [loading, setLoading] = useState(true);

  const [enrolled, setEnrolled] = useState([]);
  const token = localStorage.getItem("token");

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
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      <title>Student Home</title>
      <StudentPageLayout>
        <PageHeader />
        <div className="container p-5 my-5 bg-secondary text-white text-center">
          <h1>Your current schedule:</h1>
        </div>

        <div className="p-3 my-2 border bg-warning">
          {loading && <p>Loading courses...</p>}

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
                <div className="card-body">Subject: {course.subjectArea}</div>
                <div className="card-body">
                  Description: {course.description}
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <span>Credit Hours: {course.credits}</span>
                </div>
              </div>
            </div>
          ))}
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
export default StudentHome;
