import { useState } from "react";
import "bulma/css/bulma.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function MyProfile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("learner")) || {}
  );

  // These are used when the user wants to edit their profile
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSignOut = () => {
    localStorage.removeItem("learner");
    window.dispatchEvent(new Event("logout"));
  };

  const handleEditClick = () => {
    setNewFirstName(user.name.split(" ")[0]);
    setNewLastName(user.name.split(" ")[1]);
    setNewEmail(user.email);

    setIsModalOpen(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/learner/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${newFirstName} ${newLastName}`,
            email: newEmail,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("learner", JSON.stringify(data.data));
        setUser(data.data);
        alert("Profile updated!");
        setIsModalOpen(false);
      } else {
        alert("Something went wrong! Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="myProfile">
      <div className="container">
        <div className="box">
          <button
            className="button is-is-grey-lighter"
            onClick={handleEditClick}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <div className="profile-image has-text-centered">
            <figure className="image is-128x128 is-inline-block">
              <img
                className="is-rounded"
                src="https://bulma.io/images/placeholders/128x128.png"
              />
            </figure>
          </div>

          <div className="profile-details has-text-centered">
            <p className="is-size-6 mt-3">{user.role.toUpperCase()}</p>
            <p className="is-size-5 mt-3">{user.name}</p>
            <p className="is-size-5">{user.email}</p>
            <hr />

            <button className="button is-danger" onClick={handleSignOut}>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleCancelClick}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Edit Profile</p>
              <button
                className="delete"
                aria-label="close"
                onClick={handleCancelClick}
              ></button>
            </header>
            <section className="modal-card-body">
              <div className="field is-horizontal">
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="First name"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        placeholder="Last name"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={handleSaveClick}>
                Save
              </button>
              <button className="button" onClick={handleCancelClick}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
