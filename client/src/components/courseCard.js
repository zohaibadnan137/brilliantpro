import { useState } from "react";
import "bulma/css/bulma.min.css";

function CourseCard(props) {
  const [course, setCourse] = useState({
    title: props.title || "Course title",
    overview: props.overview || "Course overview",
    image: props.image || "https://bulma.io/images/placeholders/1280x960.png",
  });

  return (
    <div className="courseCard">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={course.image} alt="Course image" />
          </figure>
        </div>

        <div className="card-content">
          <p className="title is-4 ">{course.title}</p>
          <div className="content">{course.overview}</div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
