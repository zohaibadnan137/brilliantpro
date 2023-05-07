import { useState } from "react";
import "bulma/css/bulma.min.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic
  };

  return (
    <section className="hero is-fullheight is-primary">
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
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="field has-text-centered">
                      <button className="button is-success">Login</button>
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
