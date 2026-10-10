import StudentPageLayout from "../assets/studentPageLayout";
import PageHeader from "../assets/pageHeader";

function StudentHome() {
  return (
    <>
      <title>Student Home</title>
      <StudentPageLayout>
        <PageHeader />

        <div className="container p-5 my-5 bg-secondary text-white text-center">
          <h1>Your current schedule:</h1>
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
export default StudentHome;
