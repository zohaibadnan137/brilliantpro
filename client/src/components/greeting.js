// React
import { useEffect, useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

function Greeting() {
  const [learner] = useState(JSON.parse(localStorage.getItem("learner")));
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

  return (
    <div className="greeting">
      <h1 className="title has-text-link">
        {greeting}, {learner.name}!
      </h1>
      <h2 className="subtitle">What would you like to learn today?</h2>
    </div>
  );
}

export default Greeting;
