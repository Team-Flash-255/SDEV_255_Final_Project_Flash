import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // POST /auth with username and password
    fetch(`${API_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        username: form.username.value,
        password: form.pswd.value,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (!data.token) {
        setError(data.error || "Sign in failed");
        return;
      }

      //localStorage save
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);

      // send role to specific home page
      if (data.role === "teacher") {
        navigate("/");
      } else {
        navigate("/studentHome");
      }
    })
    .catch(() => {
      setError("Could not reach server. Try refreshing.")
    });
  }
  return (
    <>
      <title>Sign In</title>
        <div className="row" style={{ height: "100px" }}>
          <div className="col-sm-12 p-3 bg-secondary text-white text-center fs-1">
            Course Manager
          </div>
        </div>

        <div className="container p-5 my-5 bg-warning text-dark">
          <div className="container mt-3">
            <h2>Sign In</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
             <div className="mb-3 mt-3">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter username"
                  name="username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pwd">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter password"
                  name="pswd"
                  autoComplete="current-password"
                  required
                />
              </div>
              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="row" style={{ height: "100px" }}>
          <div className="col-sm-12 p-3 bg-secondary text-warning text-center fs-6">
            Copyright
          </div>
        </div>
    </>
  );
}
export default Login;
