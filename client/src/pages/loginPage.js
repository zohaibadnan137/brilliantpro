import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    console.log("Login form submitted");
    event.preventDefault();
    // Send the login request to the server
    let response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // If the login is successful, save the learner object to local storage
    if (response.ok) {
      response = await response.json();
      const learner = response.data;
      localStorage.setItem("learner", JSON.stringify(learner));
      // Create a custom login event
      window.dispatchEvent(new CustomEvent("login"));
      // Navigate to the dashboard
      navigate("/dashboard");
    } else {
      alert("Login failed! Please try again.");
    }
  };

  return (
    <section className="hero is-fullheight is-link">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="card">
                <div className="card-content">
                  <div className="content">
                    <p className="title has-text-centered has-text-dark">
                      Welcome back!
                    </p>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
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
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="field has-text-centered">
                      <button
                        className="button is-success"
                        onClick={handleSubmit}
                      >
                        Login
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
  );
}

export default LoginPage;
