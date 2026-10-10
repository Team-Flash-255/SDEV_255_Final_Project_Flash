import { Navigate } from "react-router-dom";
import PageLayout from "../assets/pageLayout";
import PageHeader from "../assets/pageHeader";
function Home() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <title>Teacher Home</title>
      <PageLayout>
        <PageHeader />

        <div className="container p-5 my-5 bg-secondary text-white text-center">
          <h1>Your current course list:</h1>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              name="searchInput"
            />
            <button className="btn btn-warning" type="button">
              Search
            </button>
          </form>
        </div>

        <div className="container p-5 my-5 border bg-warning">
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
            </div>
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
export default Home;
