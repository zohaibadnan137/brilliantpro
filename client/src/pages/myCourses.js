// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

// Components
import CourseCard from "../components/courseCard";

// This page will display the courses that a learner is enrolled in
function MyCourses(props) {
  const [learner] = useState(JSON.parse(localStorage.getItem("user")));
  const [courses, setCourses] = useState([]);

  // Fetch the courses that the learner is enrolled in
  useEffect(
    () => async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/learner-course/enrolled/${learner._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [learner._id]
  );

  return (
    <div className="myCourses">
      <div className="container">
        <div className="columns is-multiline">
          {courses.map((course) => (
            <div className="column is-one-third" key={course._id}>
              <CourseCard
                {...course}
                onCourseClick={props.onCourseClick}
                enrolled="true"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
