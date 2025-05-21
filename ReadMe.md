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
express-starter
```

Replace `<project-name>` with the name of your project.


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
[![license](https://img.shields.io/github/license/yourusername/your-repo-name)](https://github.com/aniketraut16/express-starter-cli/blob/main/LICENSE)
