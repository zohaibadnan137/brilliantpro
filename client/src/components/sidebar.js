// React
import { useState } from "react";
import { NavLink } from "react-router-dom";

// Styles
import "bulma/css/bulma.min.css";
import "../styles/sidebar.css";

function Sidebar() {
  const [role] = useState(
    JSON.parse(localStorage.getItem("user")).role || "learner"
  );

  // Sidebar for learners
  if (role === "learner")
    return (
      <div className="sidebar">
        <aside className="menu ml-4 mt-4">
          <p className="menu-label">General</p>
          <ul className="menu-list">
            <li>
              <NavLink
                end
                to="/dashboard"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Settings
              </NavLink>
            </li>
          </ul>
          <p className="menu-label">Courses</p>
          <ul className="menu-list">
            <li>
              <NavLink
                to="/dashboard/my-courses"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                My Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/enroll"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Enroll
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    );
  // Sidebar for admins
  else
    return (
      <div className="sidebar">
        <aside className="menu ml-4 mt-4">
          <p className="menu-label">General</p>
          <ul className="menu-list">
            <li>
              <NavLink
                end
                to="/dashboard"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/statistics"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Statistics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Settings
              </NavLink>
            </li>
          </ul>
          <p className="menu-label">Manage</p>
          <ul className="menu-list">
            <li>
              <NavLink
                to="/dashboard/manage-learners"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Learners
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-enrollments"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Enrollments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-courses"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-materials"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Materials
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-assessments"
                className={({ isActive }) => (isActive ? "is-active" : "")}
              >
                Assessments
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    );
}

export default Sidebar;
