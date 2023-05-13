// React
import { useState } from "react";

// Styles
import "bulma/css/bulma.min.css";

function Syllabus(props) {
  const [syllabus] = useState(props.syllabus || ["Course syllabus"]);

  return (
    <div className="syllabus">
      <ul>
        {syllabus.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Syllabus;
