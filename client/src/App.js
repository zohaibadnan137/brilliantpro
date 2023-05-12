// React
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import Dashboard from "./pages/dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check whether the learner object is in local storage
    const learner = JSON.parse(localStorage.getItem("learner"));
    if (learner) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    window.addEventListener("login", () => {
      // Check whether the learner object is in local storage
      const learner = JSON.parse(localStorage.getItem("learner"));
      if (learner) setIsLoggedIn(true);
    });
  });

  useEffect(() => {
    window.addEventListener("logout", () => {
      setIsLoggedIn(false);
    });
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard/*"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
export default App;
