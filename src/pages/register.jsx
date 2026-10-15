import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    // POST /auth with username and password
    fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: form.username.value,
        password: form.pswd.value,
        role: form.roleRadio.value,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failure to create user");
        alert("User registered successfully", "Okay");
      })
      .catch(() => {
        setError("Could not reach server. Try refreshing.");
      });
  }

  function handleSignIn() {
    navigate("/login");
  }

  return (
    <>
      <title>Register</title>
      <div className="row" style={{ height: "100px" }}>
        <div className="col-sm-9 p-3 bg-secondary text-white text-center fs-1">
          Course Manager
        </div>
        <div className="col-sm-3 p-3 bg-warning text-dark text-center fs-3">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>

      <div className="container p-5 my-5 bg-warning text-dark">
        <div className="container mt-3">
          <h2>Register Account</h2>
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
            <div className="mb-3">
              <label>Role:</label>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roleRadio"
                  id="radioStudent"
                  value="student"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="radioStudent">
                  Student
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="roleRadio"
                  id="radioTeacher"
                  value="teacher"
                />
                <label className="form-check-label" htmlFor="radioTeacher">
                  Teacher
                </label>
              </div>
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
export default Register;
