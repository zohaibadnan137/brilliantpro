require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express(); // Create express app
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable parsing of JSON data

// Import routers
const courseRouter = require("./src/routes/courseRouter");
const learnerRouter = require("./src/routes/learnerRouter");
const enrollmentRouter = require("./src/routes/enrollmentRouter");
const learnerCourseRouter = require("./src/routes/learnerCourseRouter");
const authRouter = require("./src/routes/authRouter");
const materialRouter = require("./src/routes/materialRouter");
const assessmentRouter = require("./src/routes/assessmentRouter");
const auditRouter = require("./src/routes/auditRouter");

// Authentication routes
app.use("/auth", authRouter);

// Audit routes
app.use("/audit", auditRouter);

// Routes
app.use("/course", courseRouter);
app.use("/learner", learnerRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/learner-course", learnerCourseRouter);
app.use("/material", materialRouter);
app.use("/assessment", assessmentRouter);

const connectToDatabase = require("./src/config/db");
connectToDatabase();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`The server is running on port ${PORT}...`));
