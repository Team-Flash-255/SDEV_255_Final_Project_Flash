import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active text-warning">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/CourseIndex" className="nav-link">
              Course Index
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/CourseCreation" className="nav-link">
              Add Course
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/CourseDeletion" className="nav-link">
              Delete Course
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default NavigationBar;
