// React
import { useState } from "react";
import { NavLink } from "react-router-dom";

// Styles
import "bulma/css/bulma.min.css";
import "../styles/sidebar.css";

function Sidebar() {
  const [role, setRole] = useState(localStorage.getItem("role") || "learner");

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
}

export default Sidebar;
