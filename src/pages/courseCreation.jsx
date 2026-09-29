import { Link } from "react-router-dom";
import PageLayout from "../assets/pageLayout";
function CourseCreation() {
  return (
    <>
      <title>Course Creation</title>
      <PageLayout>
        <div className="row" style={{ height: "100px" }}>
          <div className="col-sm-9 p-3 bg-secondary text-white text-center fs-1">
            Lorem Ipsum School of Placeholder
          </div>
          <div className="col-sm-3 p-3 bg-info text-dark fs-3">
            Welcome, user!
            <Link to="/login" className="btn btn-warning">
              Sign Out
            </Link>
          </div>
        </div>

        <div className="container p-5 my-5 bg-secondary text-center text-white">
          <h1>Add a Course</h1>
        </div>

        <div className="container p-5 my-5 border bg-info">
          <div className="container mt-3">
            <form action="/action_page.php">
              <div className="input-group mb-3">
                <span className="input-group-text text-white bg-secondary">
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
                <span className="input-group-text text-white bg-secondary">
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
                <span className="input-group-text text-white bg-secondary">
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
                <span className="input-group-text text-white bg-secondary">
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
                <span className="input-group-text text-white bg-secondary">
                  Course Description
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Description"
                  name="courseDescription"
                />
              </div>
              <button type="submit" className="btn btn-warning">
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
