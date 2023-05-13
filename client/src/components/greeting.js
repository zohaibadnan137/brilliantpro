// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

function Greeting() {
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // Greering for learners
  if (user.role === "learner")
    return (
      <div className="greeting">
        <h1 className="title has-text-link">
          {greeting}, {user.name}!
        </h1>
        <h2 className="subtitle">What would you like to learn today?</h2>
      </div>
    );
  // Greering for admins
  else
    return (
      <div className="greeting">
        <h1 className="title has-text-link">
          {greeting}, {user.name}!
        </h1>
        <h2 className="subtitle">What would you like to do today?</h2>
      </div>
    );
}

export default Greeting;
