#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

const projectName = process.argv[2] || "my-app";

// Create project folder and move into it
execSync(`mkdir ${projectName} && cd ${projectName}`);

// Initialize npm project
execSync("npm init -y", { stdio: "inherit" });

// Install dependencies
const dependencies = [
  "bcryptjs",
  "config",
  "cors",
  "dotenv",
  "express",
  "jsonwebtoken",
  "mongoose",
  "multer",
  "nodemailer",
];
execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" });

// Set up folder structure
const dirs = [
  "config",
  "controllers",
  "middleware",
  "models",
  "routes",
  "utils",
];
dirs.forEach((dir) => fs.mkdirSync(`${projectName}/${dir}`));

// Create config/connect.js
const connectJs = `
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
`;
fs.writeFileSync(`${projectName}/config/connect.js`, connectJs);

// Create .env.example
const envExample = `
MONGO_URI=mongodb://localhost:27017
PORT=5000
jwtSecret=your_jwt_secret_key_here
`;
fs.writeFileSync(`${projectName}/.env.example`, envExample);

// Create index.js
const indexJs = `
const express = require('express');
const connectDB = require('./config/connect');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
fs.writeFileSync(`${projectName}/index.js`, indexJs);

console.log(`Project ${projectName} initialized successfully!`);
