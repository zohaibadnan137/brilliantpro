// React
import { useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

// Components
import Syllabus from "../components/syllabus";
import Materials from "../components/materials";
import Assessments from "../components/assessments";

function CourseDetails(props) {
  const [course] = useState({
    _id: props._id,
    title: props.title || "Course title",
    overview: props.overview || "Course overview",
    description: props.description || "Course description",
    image: props.image || "https://bulma.io/images/placeholders/1280x960.png",
  });
  const [enrolled, setEnrolled] = useState(props.enrolled || false);
  const [activeTab, setActiveTab] = useState("syllabus");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const materials =
    enrolled === "true" ? (
      <Materials {...props} />
    ) : (
      <p>Please enroll to view the materials for this course.</p>
    );

  const assessments =
    enrolled === "true" ? (
      <Assessments {...props} />
    ) : (
      <p>Please enroll to view the assessments for this course.</p>
    );

  // These states are used to show the progress of the enrollment process
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);

  const handleEnrollment = async () => {
    setIsEnrolling(true);
    setEnrollmentProgress(0);

    // Create a new enrollment
    // Get the learner's ID from the local storage
    const learnerId = JSON.parse(localStorage.getItem("user"))._id;

    const enrollment = {
      learnerId: learnerId,
      courseId: course._id,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:5000/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollment),
      });
      if (response.ok) {
        // Extract the enrollment's ID from the response
        const enrollmentId = (await response.json()).data._id;

        // Create an audit log
        const auditLog = {
          userId: learnerId,
          changeDate: new Date(),
          entityName: "enrollment",
          objectId: enrollmentId,
          fieldName: "N/A",
          oldValue: "N/A",
          newValue: "N/A",
          operationType: "create",
        };
        const auditResponse = await fetch("http://localhost:5000/audit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auditLog),
        });
        if (auditResponse.ok) {
          setIsEnrolling(false);
          setEnrollmentProgress(100);
          setEnrolled("true");
          alert("Enrolled successfully!");
        } else {
          setIsEnrolling(false);
          setEnrollmentProgress(0);
          alert("Something went wrong while enrolling! Please try again.");
        }
      } else {
        setIsEnrolling(false);
        setEnrollmentProgress(0);
        alert("Something went wrong while enrolling! Please try again.");
      }
    } catch (error) {
      setIsEnrolling(false);
      setEnrollmentProgress(0);
      alert("Something went wrong while enrolling! Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="courseDetails">
      <div className="box">
        <div className="columns">
          <div className="column is-half">
            <img src={course.image} alt="Course" />
          </div>
          <div className="column mt-3 mr-6">
            <p className="title is-2 mt-3">{course.title}</p>
            <p className="subtitle is-6 mt-0">{course.overview}</p>
            {enrolled === "true" ? (
              <button className="button is-link mt-3">Enrolled</button>
            ) : (
              <button
                className="button is-success mt-3"
                onClick={handleEnrollment}
                disabled={isEnrolling}
              >
                {isEnrolling ? (
                  <>
                    <span className="icon">
                      <i className="fas fa-spinner fa-spin"></i>
                    </span>
                    <span>Enrolling...</span>
                    <progress
                      className="progress is-small is-primary ml-3"
                      max="100"
                      value={enrollmentProgress}
                    />
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>
            )}
          </div>
        </div>
        <div className="columns">
          <div className="column ml-3">
            <p className="title is-3">Description</p>
            <p className="subtitle is-6 mt-0">{course.description}</p>
          </div>
        </div>

        <div className="tabs is-boxed">
          <ul>
            <li
              className={activeTab === "syllabus" ? "is-active" : ""}
              onClick={() => handleTabClick("syllabus")}
            >
              <a>Syllabus</a>
            </li>
            <li
              className={activeTab === "materials" ? "is-active" : ""}
              onClick={() => handleTabClick("materials")}
            >
              <a>Materials</a>
            </li>
            <li
              className={activeTab === "assessments" ? "is-active" : ""}
              onClick={() => handleTabClick("assessments")}
            >
              <a>Assessments</a>
            </li>
          </ul>
        </div>
        <div className="ml-3">
          {activeTab === "syllabus" && <Syllabus {...props} />}
          {activeTab === "materials" && materials}
          {activeTab === "assessments" && assessments}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
