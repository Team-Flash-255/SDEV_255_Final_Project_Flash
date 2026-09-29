import { useState, userEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CourseIndex from "./pages/courseIndex";
import CourseCreation from "./pages/courseCreation";
import CourseDeletion from "./pages/courseDeletion";
import Home from "./pages/home";
import Login from "./pages/login";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courseIndex" element={<CourseIndex />} />
        <Route path="/courseCreation" element={<CourseCreation />} />
        <Route path="/courseDeletion" element={<CourseDeletion />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
