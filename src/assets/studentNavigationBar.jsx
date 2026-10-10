import { NavLink } from "react-router-dom";
function StudentNavigationBar() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/studentHome" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/studentAddDrop" className="nav-link">
              Add/Drop
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default StudentNavigationBar;