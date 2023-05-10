import { useState } from "react";
import "bulma/css/bulma.min.css";

import CourseCard from "../components/courseCard";

// This page will display the courses that the user is enrolled in.

function MyCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/brain-with-digital-circuit-programmer-with-laptop-machine-learning-artificial-intelligence-digital-brain-artificial-thinking-process-concept-vector-isolated-illustration_335657-2246.jpg?w=996&t=st=1683636286~exp=1683636886~hmac=1b578f28cf50f7efccdecd7901b5059016314b1063ff6bf461cf65dfebe9cb9a",
      title: "Machine Learning",
      overview:
        "In this course, you will learn the basics of machine learning and how to apply it to real-world problems.",
      description:
        "Machine learning is a rapidly growing field that has the potential to revolutionize the way we interact with technology. At its core, machine learning is a type of artificial intelligence that allows computer systems to automatically improve their performance over time by learning from data. This can be incredibly powerful, as it enables machines to recognize patterns and make predictions in ways that were once thought to be impossible. In this course, you'll learn the foundational principles of machine learning, including key algorithms, techniques for working with large data sets, and best practices for building effective models. Whether you're looking to build your skills for a career in data science or simply interested in learning more about this exciting field, this course is the perfect place to start.",
    },
    {
      id: 2,
      image:
        "https://img.freepik.com/free-vector/flat-design-nft-concept-illustration_23-2148954417.jpg?w=826&t=st=1683636196~exp=1683636796~hmac=17e1fe70774d92646f2fe01d1f7f8dc6e9abaa6fdef40af41da0c5134088605b",
      title: "Blockchain",
      overview:
        "In this course, you will learn the fundamentals of blockchain technology and how it can be used to secure digital transactions.",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/free-vector/people-analyzing-growth-charts_23-2148866843.jpg?w=996&t=st=1683636243~exp=1683636843~hmac=499f69b60255e2e32a5e7e3c9b134e8e35405812d7c08708608dc6db71ebc541",
      title: "Data Science",
      overview:
        "In this course, you will learn the basics of data science and how to use statistical methods to analyze and interpret data.",
    },
  ]);

  const getEnrolledCourses = () => {};

  return (
    <div className="myCourses">
      <div className="container">
        <div className="columns is-multiline">
          {courses.map((course) => (
            <div className="column is-one-third" key={course.id}>
              <CourseCard {...course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
