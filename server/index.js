require("dotenv").config();

const express = require("express");
const app = express();

const courseRouter = require("./src/routes/courseRouter");
const learnerRouter = require("./src/routes/learnerRouter");
const enrollmentRouter = require("./src/routes/enrollmentRouter");
const learnerCourseRouter = require("./src/routes/learnerCourseRouter");
const authRouter = require("./src/routes/authRouter");

app.use(express.json());
app.use("/course", courseRouter);
app.use("/learner", learnerRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/learner-course", learnerCourseRouter);

// Authentication routes
app.use("/auth", authRouter);

const connectToDatabase = require("./src/config/db");
connectToDatabase();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}...`));
