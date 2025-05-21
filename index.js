#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

let inquirer = require("inquirer");

async function run() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your app?",
      default: "my-app",
    },
    {
      type: "confirm",
      name: "includeNodemailer",
      message: "Do you want to include nodemailer?",
      default: true,
    },
    {
      type: "confirm",
      name: "includeMulter",
      message: "Do you want to include multer?",
      default: true,
    },
  ]);

  const { projectName, includeNodemailer, includeMulter } = answers;

  // Create project folder
  fs.mkdirSync(projectName, { recursive: true });

  // Initialize npm project inside the project folder
  process.chdir(projectName);

  // Initialize npm project
  execSync("npm init -y", { stdio: "inherit" });

  // Build dependencies list based on user choices
  const dependencies = [
    "bcryptjs",
    "config",
    "cors",
    "dotenv",
    "express",
    "jsonwebtoken",
    "mongoose",
  ];

  if (includeNodemailer) {
    dependencies.push("nodemailer");
  }

  if (includeMulter) {
    dependencies.push("multer");
  }

  // Install dependencies
  console.log("Installing dependencies...");
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
  dirs.forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

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
  fs.writeFileSync("config/connect.js", connectJs);

  // Create .env.example
  const envExample = `
MONGO_URI=mongodb://localhost:27017
PORT=5000
jwtSecret=your_jwt_secret_key_here
`;
  fs.writeFileSync(".env.example", envExample);

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
  fs.writeFileSync("index.js", indexJs);

  console.log(`Project ${projectName} initialized successfully!`);
}

run().catch((err) => {
  console.error("Error during project setup:", err);
  process.exit(1);
});
