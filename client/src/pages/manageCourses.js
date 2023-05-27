// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faTrashAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const createUpdateAuditLog = async (fieldName, oldValue, newValue) => {
    const auditLog = {
      userId: JSON.parse(localStorage.getItem("user"))._id,
      changeDate: new Date(),
      entityName: "course",
      objectId: selectedCourse._id,
      fieldName: fieldName,
      oldValue: oldValue,
      newValue: newValue,
      operationType: "update",
    };
    try {
      const response = await fetch("http://localhost:5001/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auditLog),
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/course/all");
      if (response.ok) {
        const data = await response.json();
        setCourses(data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handlers for opening and closing modals
  const handleViewClick = (course) => {
    setSelectedCourse(course);
    setIsViewModalOpen(true);
  };

  const handleCreateClick = () => {
    const newCourse = {
      title: "",
      overview: "",
      description: "",
      syllabus: [],
      image: "",
      deadline: {
        start: new Date().toISOString().substring(0, 10),
        end: new Date().toISOString().substring(0, 10),
      },
      enrollmentLink: "",
    };
    setSelectedCourse(newCourse);
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (course) => {
    setSelectedCourse(course);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCourse(null);
    setIsViewModalOpen(false);
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // Handler for creating a course
  const handleCourseCreate = async () => {
    try {
      const response = await fetch("http://localhost:5001/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedCourse),
      });
      if (response.ok) {
        const data = await response.json();

        // Create an audit log
        const auditLog = {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          changeDate: new Date(),
          entityName: "course",
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

        alert("Course created successfully.");
        getAllCourses();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while creating the course. Please try again."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handler for editing a course
  const handleCourseEdit = async () => {
    // Store the old course
    const oldCourse = selectedCourse;

    try {
      const response = await fetch(
        `http://localhost:5001/course/${selectedCourse._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedCourse),
        }
      );
      if (response.ok) {
        const data = await response.json();

        // Create audit logs
        if (oldCourse.title !== data.data.title) {
          await createUpdateAuditLog("title", oldCourse.title, data.data.title);
        }
        if (oldCourse.overview !== data.data.overview) {
          await createUpdateAuditLog(
            "overview",
            oldCourse.overview,
            data.data.overview
          );
        }
        if (oldCourse.description !== data.data.description) {
          await createUpdateAuditLog(
            "description",
            oldCourse.description,
            data.data.description
          );
        }
        if (oldCourse.syllabus !== data.data.syllabus) {
          await createUpdateAuditLog(
            "syllabus",
            JSON.stringify(oldCourse.syllabus),
            JSON.stringify(data.data.syllabus)
          );
        }
        if (oldCourse.image !== data.data.image) {
          await createUpdateAuditLog("image", oldCourse.image, data.data.image);
        }
        if (oldCourse.deadline.start !== data.data.deadline.start) {
          await createUpdateAuditLog(
            "deadline.start",
            oldCourse.deadline.start,
            data.data.deadline.start
          );
        }
        if (oldCourse.deadline.end !== data.data.deadline.end) {
          await createUpdateAuditLog(
            "deadline.end",
            oldCourse.deadline.end,
            data.data.deadline.end
          );
        }
        if (oldCourse.enrollmentLink !== data.data.enrollmentLink) {
          await createUpdateAuditLog(
            "enrollmentLink",
            oldCourse.enrollmentLink,
            data.data.enrollmentLink
          );
        }

        alert("Course updated successfully.");
        getAllCourses();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while updating the course. Please try again."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handler for deleting a course
  const handleCourseDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/course/${selectedCourse._id}`,
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
          entityName: "course",
          objectId: data.data._id,
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

        alert("Course deleted successfully.");
        getAllCourses();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while deleting the course. Please try again."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="manageCourses">
      <div className="container">
        <div className="box">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Overview</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course._id.substring(course._id.length - 4)}</td>
                  <td>{course.title}</td>
                  <td style={{ maxWidth: "275px" }}>{course.overview}</td>
                  <td>
                    {new Date(course.deadline.start).toLocaleDateString()}
                  </td>
                  <td>{new Date(course.deadline.end).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="button is-grey-lighter is-small mr-1"
                      onClick={() => handleViewClick(course)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                    <button
                      className="button is-grey-lighter is-small  mr-1"
                      onClick={() => handleEditClick(course)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="button is-grey-lighter is-small"
                      onClick={() => handleDeleteClick(course)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
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

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-card" style={{ width: "65%" }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Course Details</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">ID:</label>
                <div className="control">
                  <p>{selectedCourse._id}</p>
                </div>
              </div>

              <div className="field">
                <label className="label">Title:</label>
                <div className="control">
                  <p>{selectedCourse.title}</p>
                </div>
              </div>

              <div className="field">
                <label className="label">Overview:</label>
                <div className="control">
                  <p>{selectedCourse.overview}</p>
                </div>
              </div>

              <div className="field">
                <label className="label">Description:</label>
                <div className="control">
                  <p>{selectedCourse.description}</p>
                </div>
              </div>

              <div className="field">
                <label className="label">Syllabus:</label>
                <div className="control">
                  <ul>
                    {selectedCourse.syllabus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="field">
                <label className="label">Deadline:</label>
                <div className="control">
                  <p>
                    Start Date:{" "}
                    {new Date(
                      selectedCourse.deadline.start
                    ).toLocaleDateString()}
                  </p>
                  <p>
                    End Date:{" "}
                    {new Date(selectedCourse.deadline.end).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="field">
                <label className="label">Image:</label>
                <div className="control">
                  <img
                    src={selectedCourse.image}
                    alt="Course"
                    style={{ maxWidth: "500px", height: "auto" }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Image Link:</label>
                <div className="control">
                  <p>{selectedCourse.image}</p>
                </div>
              </div>

              <div className="field">
                <label className="label">Enrollment Link:</label>
                <div className="control">
                  <p>{selectedCourse.enrollmentLink}</p>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot"></footer>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-card" style={{ width: "65%" }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Create Course</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Title:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={selectedCourse.title}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Overview:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Overview"
                    value={selectedCourse.overview}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        overview: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description:</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Description"
                    value={selectedCourse.description}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="field">
                <label className="label">Syllabus:</label>
                <div className="control">
                  {selectedCourse.syllabus.map((item, index) => (
                    <div key={index}>
                      <input
                        className="input"
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const syllabusCopy = [...selectedCourse.syllabus];
                          syllabusCopy[index] = e.target.value;
                          setSelectedCourse({
                            ...selectedCourse,
                            syllabus: syllabusCopy,
                          });
                        }}
                      />
                    </div>
                  ))}
                  <button
                    className="button is-lighter-grey is-small mt-1"
                    onClick={() => {
                      const syllabusCopy = [...selectedCourse.syllabus];
                      syllabusCopy.push("");
                      setSelectedCourse({
                        ...selectedCourse,
                        syllabus: syllabusCopy,
                      });
                    }}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              <div className="field">
                <label className="label">Image Link:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Image Link"
                    value={selectedCourse.image}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Deadline:</label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    placeholder="Start Date"
                    value={new Date(selectedCourse.deadline.start)
                      .toISOString()
                      .substr(0, 10)}
                    onChange={(e) => {
                      const startDate = new Date(e.target.value).getTime();
                      const endDate = new Date(
                        selectedCourse.deadline.end
                      ).getTime();
                      setSelectedCourse({
                        ...selectedCourse,
                        deadline: { start: startDate, end: endDate },
                      });
                    }}
                  />
                  <input
                    className="input"
                    type="date"
                    placeholder="End Date"
                    value={new Date(selectedCourse.deadline.end)
                      .toISOString()
                      .substr(0, 10)}
                    onChange={(e) => {
                      const startDate = new Date(
                        selectedCourse.deadline.start
                      ).getTime();
                      const endDate = new Date(e.target.value).getTime();
                      setSelectedCourse({
                        ...selectedCourse,
                        deadline: { start: startDate, end: endDate },
                      });
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Enrollment Link:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enrollment Link"
                    value={selectedCourse.enrollmentLink}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        enrollmentLink: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={handleCourseCreate}
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-card" style={{ width: "65%" }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Course</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">ID:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="ID"
                    value={selectedCourse._id}
                    disabled
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Title:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={selectedCourse.title}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Overview:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Overview"
                    value={selectedCourse.overview}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        overview: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Description:</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Description"
                    value={selectedCourse.description}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>

              <div className="field">
                <label className="label">Syllabus:</label>
                <div className="control">
                  {selectedCourse.syllabus.map((item, index) => (
                    <div key={index}>
                      <input
                        className="input"
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const syllabusCopy = [...selectedCourse.syllabus];
                          syllabusCopy[index] = e.target.value;
                          setSelectedCourse({
                            ...selectedCourse,
                            syllabus: syllabusCopy,
                          });
                        }}
                      />
                    </div>
                  ))}
                  <button
                    className="button is-lighter-grey is-small mt-1"
                    onClick={() => {
                      const syllabusCopy = [...selectedCourse.syllabus];
                      syllabusCopy.push("");
                      setSelectedCourse({
                        ...selectedCourse,
                        syllabus: syllabusCopy,
                      });
                    }}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              <div className="field">
                <label className="label">Image Link:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Image Link"
                    value={selectedCourse.image}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Deadline:</label>
                <div className="control">
                  <input
                    className="input"
                    type="date"
                    placeholder="Start Date"
                    value={new Date(selectedCourse.deadline.start)
                      .toISOString()
                      .substr(0, 10)}
                    onChange={(e) => {
                      const startDate = new Date(e.target.value).getTime();
                      const endDate = new Date(
                        selectedCourse.deadline.end
                      ).getTime();
                      setSelectedCourse({
                        ...selectedCourse,
                        deadline: { start: startDate, end: endDate },
                      });
                    }}
                  />
                  <input
                    className="input"
                    type="date"
                    placeholder="End Date"
                    value={new Date(selectedCourse.deadline.end)
                      .toISOString()
                      .substr(0, 10)}
                    onChange={(e) => {
                      const startDate = new Date(
                        selectedCourse.deadline.start
                      ).getTime();
                      const endDate = new Date(e.target.value).getTime();
                      setSelectedCourse({
                        ...selectedCourse,
                        deadline: { start: startDate, end: endDate },
                      });
                    }}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Enrollment Link:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Enrollment Link"
                    value={selectedCourse.enrollmentLink}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        enrollmentLink: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleCourseEdit}>
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
              <p className="modal-card-title">Delete Course</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to delete this course?</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-danger" onClick={handleCourseDelete}>
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

export default ManageCourses;
