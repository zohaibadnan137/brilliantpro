import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handle signup logic
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullName = firstName + " " + lastName;
    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: email,
          password: password,
        }),
      });
      if (response.ok) {
        // Extract the user's ID from the response
        const userId = (await response.json()).data._id;

        // Create an audit log
        const auditLog = {
          userId: userId,
          changeDate: new Date(),
          entityName: "learner",
          objectId: userId,
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
          alert("Signup successful! Please login.");
          navigate("/login");
        } else {
          alert("Signup failed! Please try again.");
        }
      } else if (response.status === 409) {
        alert("A learner with that email already exists.");
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className="signupPage">
      <section className="hero is-fullheight is-link">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <p className="title has-text-centered has-text-dark">
                        Create an account
                      </p>

                      <div className="field is-horizontal">
                        <div className="field-body">
                          <div className="field">
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="field">
                            <div className="control">
                              <input
                                className="input"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="field">
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="field has-text-centered">
                        <button
                          className="button is-success"
                          onClick={handleSubmit}
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignupPage;
