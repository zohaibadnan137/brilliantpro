// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

function ManageLearners() {
  const [learners, setLearners] = useState([]);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const createUpdateAuditLog = async (fieldName, oldValue, newValue) => {
    console.log("Creating audit log");
    const auditLog = {
      userId: JSON.parse(localStorage.getItem("user"))._id,
      changeDate: new Date(),
      entityName: "learner",
      objectId: selectedLearner._id,
      fieldName: fieldName,
      oldValue: oldValue,
      newValue: newValue,
      operationType: "update",
    };
    try {
      const response = await fetch("http://localhost:5000/audit", {
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
    getAllLearners();
  }, []);

  const getAllLearners = async () => {
    try {
      const response = await fetch("http://localhost:5000/learner/all");
      if (response.ok) {
        const data = await response.json();
        setLearners(data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handlers for opening and closing modals
  const handleCreateClick = () => {
    const newLearner = {
      name: "",
      image: "",
      email: "",
      password: "",
    };
    setSelectedLearner(newLearner);
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (learner) => {
    setSelectedLearner(learner);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (learner) => {
    setSelectedLearner(learner);
    setIsDeleteModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedLearner(null);

    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // Handler for creating a learner
  const handleLearnerCreate = async () => {
    try {
      const response = await fetch("http://localhost:5000/learner/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedLearner),
      });
      if (response.ok) {
        const data = await response.json();

        // Create an audit log
        const auditLog = {
          userId: JSON.parse(localStorage.getItem("user"))._id,
          changeDate: new Date(),
          entityName: "learner",
          objectId: data.data._id,
          fieldName: "N/A",
          oldValue: "N/A",
          newValue: "N/A",
          operationType: "create",
        };
        const auditResponse = await fetch("http://localhost:5000/audit/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(auditLog),
        });

        alert("Learner created successfully.");
        getAllLearners();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while creating the learner. Please try again."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handler for editing a learner
  const handleLearnerEdit = async () => {
    // Store the old learner
    const oldLearner = selectedLearner;

    try {
      const response = await fetch(
        `http://localhost:5000/learner/${selectedLearner._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedLearner),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("New", data.data);
        console.log("Old", oldLearner);

        // Create audit logs
        if (oldLearner.name !== data.data.name) {
          await createUpdateAuditLog("name", oldLearner.name, data.data.name);
        }
        if (oldLearner.image !== data.data.image) {
          await createUpdateAuditLog(
            "image",
            oldLearner.image,
            data.data.image
          );
        }
        if (oldLearner.email !== data.data.email) {
          await createUpdateAuditLog(
            "email",
            oldLearner.email,
            data.data.email
          );
        }
        if (oldLearner.password !== data.data.password) {
          await createUpdateAuditLog(
            "password",
            oldLearner.password,
            data.data.password
          );
        }

        alert("Learner updated successfully.");
        getAllLearners();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while updating the learner. Please try again."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handler for deleting a learner
  const handleLearnerDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/learner/${selectedLearner._id}`,
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
          entityName: "learner",
          objectId: data.data._id,
          fieldName: "N/A",
          oldValue: "N/A",
          newValue: "N/A",
          operationType: "delete",
        };
        const auditResponse = await fetch("http://localhost:5000/audit/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(auditLog),
        });

        alert("Learner deleted successfully.");
        getAllLearners();
        handleModalClose();
      } else {
        alert(
          "Something went wrong while deleting the learner. Please try again."
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="manageLeaners">
      <div className="container">
        <div className="box">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {learners.map((learner) => (
                <tr key={learner._id}>
                  <td>{learner._id.substring(learner._id.length - 4)}</td>
                  <td>{learner.name}</td>
                  <td>{learner.email}</td>
                  <td>{learner.password}</td>
                  <td>
                    <button
                      className="button is-grey-lighter is-small  mr-1"
                      onClick={() => handleEditClick(learner)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="button is-grey-lighter is-small"
                      onClick={() => handleDeleteClick(learner)}
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

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleModalClose}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Create Learner</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Name:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={selectedLearner.name}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Image Link:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Image Link"
                    value={selectedLearner.image}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email:</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={selectedLearner.email}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Password"
                    value={selectedLearner.password}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-success"
                onClick={handleLearnerCreate}
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
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Learner</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field">
                <label className="label">Name:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={selectedLearner.name}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Image Link:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Image Link"
                    value={selectedLearner.image}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        image: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email:</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={selectedLearner.email}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password:</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Password"
                    value={selectedLearner.password}
                    onChange={(e) =>
                      setSelectedLearner({
                        ...selectedLearner,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleLearnerEdit}>
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
              <p className="modal-card-title">Delete Learner</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleModalClose}
              ></button>
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to delete this learner?</p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-danger"
                onClick={handleLearnerDelete}
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

export default ManageLearners;
