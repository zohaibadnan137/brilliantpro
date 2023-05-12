// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

// Components
import CourseCard from "../components/courseCard";

// This page will display the courses that the user CAN enroll in

function Enroll(props) {
  const [learner, setLearner] = useState(
    JSON.parse(localStorage.getItem("learner"))
  );
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(
    () => async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/learner-course/not-enrolled/${learner._id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAvailableCourses(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return (
    <div className="enroll">
      <div className="container">
        <div className="columns is-multiline">
          {availableCourses.map((course) => (
            <div className="column is-one-third" key={course._id}>
              <CourseCard
                {...course}
                onCourseClick={props.onCourseClick}
                enrolled="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Enroll;
