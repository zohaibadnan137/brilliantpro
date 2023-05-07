import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}
export default App;
