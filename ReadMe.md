# Express Starter CLI

Express Starter CLI is a command-line tool that helps you quickly scaffold a Node.js + Express.js project with MongoDB. It sets up the basic structure and installs essential packages like `express`, `mongoose`, `jsonwebtoken`, and more. This tool saves you from repetitive setup work so you can start building your application faster.

## Features

- Creates a fully working Node.js + Express.js application.
- Sets up a MongoDB connection using `mongoose`.
- Includes JWT authentication setup with `jsonwebtoken`.
- Installs necessary middleware like `cors`, `bcryptjs`, `multer` for handling requests and file uploads.
- Provides a pre-configured folder structure (controllers, models, routes, middleware, utils).
- Includes a `.env.example` file for environment variable configuration.
- Adds a sample API endpoint to get you started.

## Installation

To install the Express Starter CLI globally on your machine, you can use npm:

```bash
npm install -g express-starter-cli
```

This will make the `express-starter` command available globally in your terminal.

## Usage

Once the CLI is installed, you can create a new project by running:

```bash
express-starter <project-name>
```

Replace `<project-name>` with the name of your project.

### Example:

```bash
express-starter my-awesome-app
```

This command will create a folder called `my-awesome-app` with the following structure:

```
my-awesome-app/
├── config/
│   └── connect.js           # MongoDB connection setup
├── controllers/             # Controllers for your routes
├── middleware/              # Custom middleware (e.g., for auth)
├── models/                  # Mongoose models
├── routes/                  # Route handlers
├── utils/                   # Utility functions (e.g., token generation)
├── .env.example             # Example environment variable file
├── index.js                 # Main file to run the application
├── package.json             # NPM package configuration
```

After running the command, navigate into your project folder:

```bash
cd my-awesome-app
```

### Running the Project

Before running the application, make sure to set up your environment variables. Copy the `.env.example` file to `.env` and update the values as needed:

```bash
cp .env.example .env
```

You can then start the server using Node.js:

```bash
node index.js
```

or using [Nodemon](https://www.npmjs.com/package/nodemon) for automatic restarts:

```bash
npm install -g nodemon
nodemon index.js
```

By default, the server will be running on `http://localhost:5000`. You can change the port by updating the `PORT` value in your `.env` file.

## Folder Structure Overview

- **`config/connect.js`**: Sets up the connection to MongoDB using `mongoose`.
- **`controllers/`**: This folder is where you define functions for your routes (e.g., handling user registration, login, etc.).
- **`middleware/`**: Any custom middleware, like JWT authentication middleware, goes here.
- **`models/`**: Mongoose models that define the structure of your database collections.
- **`routes/`**: Define your application’s routes and link them to the controller functions.
- **`utils/`**: Helper functions, such as generating JSON Web Tokens, are stored here.

### Sample Files:

#### config/connect.js

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

#### index.js

```javascript
const express = require("express");
const connectDB = require("./config/connect");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Get the port from environment variables or use 5000 by default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Environment Variables

The CLI generates an `.env.example` file where you can specify your environment variables. After copying the file to `.env`, update the following values:

- **`MONGO_URI`**: MongoDB connection string (e.g., `mongodb://localhost:27017/mydatabase`).
- **`PORT`**: The port where your app will run (default: 5000).
- **`jwtSecret`**: Secret key used for signing JWT tokens.

Here’s an example `.env` file:

```plaintext
MONGO_URI=mongodb://localhost:27017/mydatabase
PORT=5000
jwtSecret=your_jwt_secret_key_here
```

## Additional Commands

After creating your project, you may want to add additional features. You can manually install other npm packages as needed. Here are some examples:

- **For logging**:
  ```bash
  npm install morgan
  ```
- **For validation**:
  ```bash
  npm install express-validator
  ```

## Contributing

We welcome contributions! If you'd like to add a new feature, report a bug, or improve the code, please open an issue or submit a pull request on [GitHub](https://github.com/yourusername/your-repo-name).

To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[![npm version](https://badge.fury.io/js/express-starter-cli.svg)](https://www.npmjs.com/package/express-starter-cli)
[![downloads](https://img.shields.io/npm/dm/express-starter-cli.svg)](https://www.npmjs.com/package/express-starter-cli)
[![license](https://img.shields.io/github/license/yourusername/your-repo-name)](https://github.com/yourusername/your-repo-name/blob/main/LICENSE)
