import { useNavigate } from "react-router-dom";
function PageHeader() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    function handleSignOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login");
    }

  return (
    <div className="row" style={{ height: "100px" }}>
      <div className="col-sm-9 p-3 bg-secondary text-white text-center fs-1">
        Course Manager
      </div>
      <div className="col-sm-3 p-3 bg-warning text-dark fs-3">
        Welcome, {username}!
        <button type="button" className="btn btn-outline-dark" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
export default PageHeader;