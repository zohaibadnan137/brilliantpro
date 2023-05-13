// React
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "bulma/css/bulma.min.css";

// Components
import Sidebar from "../components/sidebar";
import MyCourses from "./myCourses";
import Enroll from "./enroll";
import CourseDetails from "./courseDetails";
import MyProfile from "./myProfile";
import Greeting from "../components/greeting";
import Settings from "./settings";
import Statistics from "./statistics";

import ManageCourses from "./manageCourses";
import ManageLearners from "./manageLearners";
import ManageMaterials from "./manageMaterials";
import ManageAssessments from "./manageAssessments";
import ManageEnrollments from "./manageEnrollments";

function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  // A fallback function to be passed to the CourseCard component
  const onCourseClick = (course, enrolled) => {
    setSelectedCourse(course);
    setIsEnrolled(enrolled);
  };

  // Dashboard for learners
  if (user.role === "learner")
    return (
      <div className="dashboard">
        <div className="columns">
          <div className="column is-2 has-background-light">
            <Sidebar />
          </div>
          <div className="column pb-0">
            <section className="hero is-fullheight">
              <div className="hero-body">
                <div className="container">
                  <Routes>
                    <Route path="/" Component={Greeting} />

                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/settings" Component={Settings} />
                    <Route
                      path="/my-courses"
                      element={<MyCourses onCourseClick={onCourseClick} />}
                    />
                    <Route
                      path="/enroll"
                      element={<Enroll onCourseClick={onCourseClick} />}
                    />
                    <Route
                      path="/course-details"
                      element={
                        <CourseDetails
                          {...selectedCourse}
                          enrolled={isEnrolled}
                        />
                      }
                    />
                  </Routes>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  // Dashboard for admins
  else
    return (
      <div className="dashboard">
        <div className="columns">
          <div className="column is-2 has-background-light">
            <Sidebar />
          </div>
          <div className="column pb-0">
            <section className="hero is-fullheight">
              <div className="hero-body">
                <div className="container">
                  <Routes>
                    <Route path="/" Component={Greeting} />
                    <Route path="/statistics" Component={Statistics} />
                    <Route path="/my-profile" Component={MyProfile} />
                    <Route path="/settings" Component={Settings} />

                    <Route path="/manage-courses" Component={ManageCourses} />
                    <Route path="/manage-learners" Component={ManageLearners} />
                    <Route
                      path="/manage-enrollments"
                      Component={ManageEnrollments}
                    />
                    <Route
                      path="/manage-materials"
                      Component={ManageMaterials}
                    />
                    <Route
                      path="manage-assessments"
                      Component={ManageAssessments}
                    />
                  </Routes>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
}

export default Dashboard;
