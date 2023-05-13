// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

function Statistics() {
  const [courseCount, setCourseCount] = useState(0);
  const [learnerCount, setLearnerCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);

  const fetchStatistics = async () => {
    // Get all the courses
    try {
      const response = await fetch("http://localhost:5000/course/all");
      if (response.ok) {
        const data = await response.json();
        setCourseCount(data.data.length);
      }
    } catch (error) {
      console.error(error.message);
    }
    // Get all the learners
    try {
      const response = await fetch("http://localhost:5000/learner/all");
      if (response.ok) {
        const data = await response.json();
        setLearnerCount(data.data.length);
      }
    } catch (error) {
      console.error(error.message);
    }
    // Get all the enrollments
    try {
      const response = await fetch("http://localhost:5000/enrollment/all");
      if (response.ok) {
        const data = await response.json();
        setEnrollmentCount(data.data.length);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchStatistics();
  });

  return (
    <div className="columns is-multiline">
      <div className="column">
        <div className="card has-text-centered">
          <div className="card-content">
            <p className="title is-size-1 has-text-link">{courseCount}</p>
            <p className="subtitle is-size-5">Courses</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card has-text-centered">
          <div className="card-content">
            <p className="title is-size-1 has-text-link">{learnerCount}</p>
            <p className="subtitle is-size-5">Learners</p>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="card has-text-centered">
          <div className="card-content">
            <p className="title is-size-1 has-text-link">{enrollmentCount}</p>
            <p className="subtitle is-size-5">Enrollments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
