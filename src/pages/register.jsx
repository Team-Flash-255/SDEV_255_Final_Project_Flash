import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import PageLayout from "../assets/pageLayout";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const hasToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const body = {
      username: form.username.value,
      password: form.pswd.value,
    };
    let adaptiveAPIurl = `${API_URL}/register/student`;
    if (hasToken) {
      adaptiveAPIurl = `${API_URL}/user`;
      body.role = form.roleRadio.value;
    }

    // POST /auth with username and password
    fetch(adaptiveAPIurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth": localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error((await res.json()).error || "Failure to create user");
        }
        alert("User registered successfully");
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  function handleAuth() {
    if (hasToken) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    }
    navigate("/login");
  }

  const innerContent = [
    <div className="row" style={{ height: "100px" }} key={"headerKey"}>
      <div className="col-sm-9 p-3 bg-secondary text-white text-center fs-1">
        Course Manager
      </div>
      <div className="col-sm-3 p-3 bg-warning text-dark text-center fs-3">
        {hasToken ? `Welcome, ${username}! ` : null}
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={handleAuth}
        >
          {hasToken ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </div>,
  ];

  return (
    <>
      {hasToken ? <PageLayout>{innerContent}</PageLayout> : innerContent}
      <title>Register</title>
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
                {hasToken ? (
                  <input
                    className="form-check-input"
                    type="radio"
                    name="roleRadio"
                    id="radioTeacher"
                    value="teacher"
                  />
                ) : (
                  <input
                    className="form-check-input"
                    type="radio"
                    name="roleRadio"
                    id="radioTeacher"
                    value="teacher"
                    disabled={!hasToken}
                  />
                )}

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
