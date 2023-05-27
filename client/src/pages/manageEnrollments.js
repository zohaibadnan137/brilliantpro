// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/manageEnrollments.css";

function ManageEnrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [learners, setLearners] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);

  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedLearnerId, setSelectedLearnerId] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    getAllEnrollments();
    getAllCourses();
    getAllLearners();
  }, []);

  const getAllEnrollments = async () => {
    try {
      const response = await fetch("http://localhost:5001/enrollment/all");
      if (response.ok) {
        const data = await response.json();
        setEnrollments(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/course/all");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllLearners = async () => {
    try {
      const response = await fetch("http://localhost:5001/learner/all");
      if (response.ok) {
        const data = await response.json();
        setLearners(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/learner-course/not-enrolled/${selectedLearnerId}`
        );
        if (response.ok) {
          const data = await response.json();
          setAvailableCourses(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (selectedLearnerId) {
      fetchAvailableCourses();
    }
  }, [selectedLearnerId]);

  // Handlers for opening and closing modals
  const handleCreateClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setSelectedLearnerId(enrollment.learnerId);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedEnrollment(null);
    setSelectedCourseId(null);
    setSelectedLearnerId(null);
    setAvailableCourses([]);

    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // Handler for creating a new enrollment
  const handleEnrollmentCreate = async () => {
    const enrollment = {
      learnerId: selectedLearnerId,
      courseId: selectedCourseId,
    };
    try {
      const response = await fetch("http://localhost:5001/enrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollment),
      });
      if (response.ok) {
        const data = await response.json();

        // Create an audit log
        const auditLog = {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          changeDate: new Date(),
          entityName: "enrollment",
          objectId: data.data._id,
          fieldName: "N/A",
          oldValue: "N/A",
          newValue: "N/A",
          operationType: "create",
        };
        const auditResponse = await fetch("http://localhost:5001/audit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auditLog),
        });

        alert("Enrollment created successfully.");
        getAllEnrollments();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while creating the enrollment. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handler for editing an enrollment
  const handleEnrollmentEdit = async () => {
    const oldEnrollment = selectedEnrollment;
    const updatedEnrollment = {
      learnerId: selectedLearnerId,
      courseId: selectedCourseId,
    };
    try {
      const response = await fetch(
        `http://localhost:5001/enrollment/${selectedEnrollment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEnrollment),
        }
      );
      if (response.ok) {
        const data = await response.json();

        // Create an audit log
        const auditLog = {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          changeDate: new Date(),
          entityName: "enrollment",
          objectId: selectedEnrollment._id,
          fieldName: "courseId",
          oldValue: oldEnrollment.courseId,
          newValue: data.data.courseId,
          operationType: "update",
        };
        const auditResponse = await fetch("http://localhost:5001/audit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auditLog),
        });

        alert("Enrollment updated successfully.");
        getAllEnrollments();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while updating the enrollment. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handler for deleting an enrollment
  const handleEnrollmentDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/enrollment/${selectedEnrollment._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const data = await response.json();

        // Create an audit log
        const auditLog = {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          changeDate: new Date(),
          entityName: "enrollment",
          objectId: selectedEnrollment._id,
          fieldName: "N/A",
          oldValue: "N/A",
          newValue: "N/A",
          operationType: "delete",
        };
        const auditResponse = await fetch("http://localhost:5001/audit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auditLog),
        });

        alert("Enrollment deleted successfully.");
        getAllEnrollments();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while deleting the enrollment. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="manageEnrollments">
      <div className="container">
        <div className="box">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Learner</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((enrollment) => {
                const learner = learners.find(
                  (l) => l._id === enrollment.learnerId
                );
                const course = courses.find(
                  (c) => c._id === enrollment.courseId
                );
                return (
                  <tr key={enrollment._id}>
                    <td>
                      {enrollment._id.substring(enrollment._id.length - 4)}
                    </td>
                    <td>{learner ? learner.name : ""}</td>
                    <td>{course ? course.title : ""}</td>
                    <td>
                      <button
                        className="button is-grey-lighter is-small  mr-1"
                        onClick={() => handleEditClick(enrollment)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="button is-grey-lighter is-small"
                        onClick={() => handleDeleteClick(enrollment)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="button is-link" onClick={handleCreateClick}>
            <span className="icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span>Create</span>
          </button>
        </div>
      </div>

      {/*Create Modal*/}
      {isCreateModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Create Enrollment</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Learner:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          value={selectedLearnerId}
                          onChange={(e) => {
                            setSelectedLearnerId(e.target.value);
                          }}
                        >
                          <option value="">Select a learner</option>
                          {learners.map((learner) => (
                            <option key={learner._id} value={learner._id}>
                              {learner.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Course:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          value={selectedCourseId}
                          onChange={(e) => setSelectedCourseId(e.target.value)}
                        >
                          <option value="">Select a course</option>
                          {availableCourses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={handleEnrollmentCreate}
              >
                Create
              </button>
              <button className="button" onClick={handleModalClose}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      {/*Edit Modal*/}
      {isEditModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Enrollment</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Learner:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select value={selectedLearnerId} disabled>
                          <option value="">Select a learner</option>
                          {learners.map((learner) => (
                            <option key={learner._id} value={learner._id}>
                              {learner.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Course:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select">
                        <select
                          value={selectedCourseId}
                          onChange={(e) => setSelectedCourseId(e.target.value)}
                        >
                          <option value="">Select a course</option>
                          {availableCourses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={handleEnrollmentEdit}
              >
                Save
              </button>
              <button className="button" onClick={handleModalClose}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete Enrollment</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to delete this enrollment?</p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-danger"
                onClick={handleEnrollmentDelete}
              >
                Delete
              </button>
              <button className="button" onClick={handleModalClose}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEnrollments;
