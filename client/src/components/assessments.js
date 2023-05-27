// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function Assessments(props) {
  const [course] = useState({
    _id: props._id,
  });
  const [assessments, setAssessments] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/assessment/for-course/${course._id}`
      );
      if (response.ok) {
        const data = await response.json();
        setAssessments(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleViewAssessment = (questions) => {
    setSelectedQuestions(questions);
    const modal = document.getElementById("questions-modal");
    modal.classList.add("is-active");
  };

  const handleCloseModal = () => {
    setSelectedQuestions([]);
    const modal = document.getElementById("questions-modal");
    modal.classList.remove("is-active");
  };

  return (
    <div className="assessments">
      <div className="container">
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Time Limit</th>
              <th>Passing Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((assessment) => (
              <tr key={assessment._id}>
                <td>{assessment.name}</td>
                <td>{assessment.timeLimit || "N/A"}</td>
                <td>{assessment.passingScore || "N/A"}</td>
                <td>
                  <button
                    className="button is-small is-grey-lighter"
                    onClick={() => handleViewAssessment(assessment.questions)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for displaying questions */}
      <div className="modal" id="questions-modal">
        <div className="modal-background" onClick={handleCloseModal}></div>
        <div className="modal-content">
          <div className="box">
            <h3 className="title is-3">Questions</h3>
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Statement</th>
                  <th>Options</th>
                  <th>Correct Option</th>
                </tr>
              </thead>
              <tbody>
                {selectedQuestions.map((question, index) => (
                  <tr key={index}>
                    <td>{question.statement}</td>
                    <td>{question.options.join(", ")}</td>
                    <td>{question.correctOption}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={handleCloseModal}
        ></button>
      </div>
    </div>
  );
}

export default Assessments;
