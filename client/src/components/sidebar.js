import useState from "react";
import "bulma/css/bulma.min.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <aside className="menu ml-4 mt-4">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <a className="is-active">Dashboard</a>
          </li>
          <li>
            <a>My Profile</a>
          </li>
          <li>
            <a>Settings</a>
          </li>
        </ul>
        <p className="menu-label">Courses</p>
        <ul className="menu-list">
          <li>
            <a>My Courses</a>
          </li>
          <li>
            <a>Enroll</a>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
