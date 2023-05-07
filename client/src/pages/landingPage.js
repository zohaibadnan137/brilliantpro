import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

function LandingPage() {
  return (
    <div className="landingPage">
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome to BrilliantPro!</h1>
            <h2 className="subtitle">
              The ultimate learning management system
            </h2>
            <div className="buttons">
              <Link className="button is-success is-medium" to="/login">
                Log in
              </Link>
              <Link className="button is-light is-medium" to="/signup">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
