const express = require("express");
const mongoose = require("mongoose");

// Initialize express
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/brilliantpro");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB."));
