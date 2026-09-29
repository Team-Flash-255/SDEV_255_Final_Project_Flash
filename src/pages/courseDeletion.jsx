import { Link } from "react-router-dom";
import PageLayout from "../assets/pageLayout";
function CourseDeletion() {
  return (
    <>
      <title>Course Deletion</title>
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

        <div className="container p-5 my-5 bg-secondary text-white text-center">
          <h1>Delete a Course</h1>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              name="searchInput"
            />
            <button className="btn btn-info" type="button">
              Search
            </button>
          </form>
        </div>

        <div className="container p-5 my-5 border bg-info">
          <div className="container mt-3">
            <div className="card">
              <div className="card-header">Course Number: LI101</div>
              <div className="card-body">Course Name: Intro to Lorem Ipsum</div>
              <div className="card-body">Subject: Lorem Ipsum</div>
              <div className="card-body">
                Description: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Consequatur dolore laborum eligendi consectetur nihil
                perferendis laudantium nesciunt enim totam porro placeat odio
                similique modi est reiciendis error, aliquid architecto culpa.
              </div>
              <div className="card-footer">Credit Hours: 3</div>
              <div className="card-footer">
                <button className="btn btn-danger" type="button">
                  x Delete Course
                </button>
              </div>
            </div>
          </div>

          <div className="container mt-3">
            <div className="card">
              <div className="card-header">Course Number: LI201</div>
              <div className="card-body">Course Name: Advanced Lorem Ipsum</div>
              <div className="card-body">Subject:Lorem Ipsum</div>
              <div className="card-body">
                Description: Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Ex aut dignissimos itaque, optio sed cumque necessitatibus
                earum rerum nobis id explicabo reprehenderit accusantium
                expedita beatae provident error nulla! Dolorum, rerum!
              </div>
              <div className="card-footer">Credit Hours: 3</div>
              <div className="card-footer">
                <button className="btn btn-danger" type="button">
                  x Delete Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
export default CourseDeletion;
