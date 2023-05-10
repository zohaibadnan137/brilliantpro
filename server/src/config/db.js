const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Connect to database
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Use new URL parser instead of deprecated one
      useUnifiedTopology: true, // Use new Server Discover and Monitoring engine instead of deprecated one
    });
    console.log("Connected to database.");
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1); // Exit with failure
  }
}

module.exports = connectToDatabase;
