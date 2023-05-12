// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

// Components
import CourseCard from "../components/courseCard";

// This page will display the courses that the user is enrolled in.

function MyCourses(props) {
  const [learner, setLearner] = useState(
    JSON.parse(localStorage.getItem("learner"))
  );
  const [courses, setCourses] = useState([]);

  useEffect(
    () => async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/learner-course/enrolled/${learner._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
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
