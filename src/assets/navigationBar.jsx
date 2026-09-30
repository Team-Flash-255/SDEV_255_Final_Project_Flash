import { NavLink } from "react-router-dom";
function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/courseIndex" className="nav-link">
              Course Index
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/courseCreation" className="nav-link">
              Add Course
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/courseDeletion" className="nav-link">
              Delete Course
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/studentHome" className="nav-link">
              Student Side(temporary)
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default NavigationBar;
