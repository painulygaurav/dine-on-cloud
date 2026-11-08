# 1. Backend Project Initiation

## `npm init -y`

It is a shorthand command used in Node.js development to quickly create a `package.json` file for a new project without being asked a series of configuration questions.

- `npm`: The node package manager, used to install, share, and manage dependencies in JavaScript projects.
- `init`: Tell npm to initialize a new Node.js project by generating a package.json file.
- `-y`: Tells npm to accept all the default settings automatically.

## `package.json`

Lives in root directory and acts as a manifest that describes the project.

1. **Project Metadata**
   - `name`: Project name
   - `version`: Current version
   - `description`: A short summary of what the project does.
   - `author` and `license`: Who create it and under which license it can be used.
2. **Dependency Management**
   This is one of its most important jobs. When you install packages using npm (like `express`, `react`, or `lodash`), `package.json` keeps track of them so you don't have to guess what your project needs: - `dependencies`: Packages required for your app to run in production. - `devDependencies`: Packages only needed during development (like testing tools, linters, or bundlers like Vite or Webpack).

Think about it; when you share your project you don't share `node_modules` folder. Instead, anyone can just run `npm install`, and npm will read your package.json and downoad everything automatically.

3. **Custom Scripts**
   It allows you to define shortcuts for running terminal commands. For example, you can define scripts like:

```JSON
"scripts":{
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
}
```

## `node_modules`

It is the physical directory where npm downloads and store all the third-party packages, libraries, and dependencies that your project relies on (along with all of their dependencies).
When you run `npm install express` or `npm install`, npm downloads the actual source code of those packages and places them inside this folder.

- **What is its role and work?**
  - **Houses Your Code's Dependencies**: Every package your project needs to run or build lives here.
  - **Enables Local Requires/Imports**: `const express = require('express');` or `import express from 'express';` in your code, Node.js automatically looks inside the `node_modules` folder to find and load that module.
- **Key Things to Know About `node_modules`**:
  1. **It is usually massive**: Can grow to hundreds of MBs very quickly.
  2. **Never commit it to Git**: Always add `.gitignore`. It can easily be generated.
  3. **It can always be regenerated**: If you delete `node_modules`, it can be regenerated using `package.json` and `npm install`.

# 2. Project Structure - Backend

```
backend/
├── config/        # App configuration
├── controllers/   # Request handlers
├── docs/          # Project documentation
│   └── ADRs/      # Architecture Decision Records
├── env/           # Environment files
├── middlewares/   # Express middleware
├── models/        # Data models
├── routes/        # API route definitions
├── services/      # Business logic
├── src/           # Source code root
├── utils/         # Shared helpers
├── validators/    # Input validation
├── index.js       # Application entry point
└── package.json   # Dependencies and scripts
```

| Folder / File  | Purpose                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `config/`      | Holds centralized configuration (database connection, app settings, third-party setup) so it is not scattered through the code. |
| `controllers/` | Receives the request from a route, calls the right service, and sends back the HTTP response. Contains no heavy business logic. |
| `docs/`        | Project documentation, including learning notes such as this file.                                                              |
| `docs/ADRs/`   | Architecture Decision Records: short documents capturing important technical decisions and the reasoning behind them.           |
| `env/`         | Environment-specific variable files (development, production, etc.). Keep secrets out of Git.                                   |
| `middlewares/` | Functions that run between request and response, such as authentication, logging, error handling and rate limiting.             |
| `models/`      | Defines the data schemas and database entities (e.g. restaurants, menus, orders).                                               |
| `routes/`      | Maps URL paths and HTTP methods to the matching controllers.                                                                    |
| `services/`    | Business logic and database operations, kept separate from HTTP concerns so it is reusable and testable.                        |
| `src/`         | Source code root for application code.                                                                                          |
| `utils/`       | Small reusable helpers (formatters, token generators, custom error classes) used across the backend.                            |
| `validators/`  | Validates and sanitizes incoming request data (body, params, query) before it reaches the controllers.                          |
| `index.js`     | Entry point that starts the server and wires together middleware and routes.                                                    |
| `package.json` | Lists dependencies, scripts and project metadata.                                                                               |

# 3. Installing Dependencies

1. **express**
   - **What it is**: A minimal, popular web framework for Node.js that handles HTTP requests, routing and middleware.
   - **Why we need it**: It is the core of our REST API. It maps endpoints (menus, orders, reservations) to controllers and lets us plug in middleware for auth, validation and error handling.

2. **nodemon**
   - **What it is**: A development tool that watches your files and automatically restarts the Node.js server when they change.
   - **Why we need it**: It saves us from manually stopping and starting the server after every edit. It is only needed during development, so ideally it belongs in `devDependencies` (`npm i -D nodemon`).

3. **dotenv**
   - **What it is**: A small package that loads variables from a `.env` file into `process.env`.
   - **Why we need it**: It keeps secrets and environment-specific values (DB URI, ports, API keys, SMTP credentials) out of the source code and out of Git.

4. **redis**
   - **What it is**: The official Node.js client for Redis, an in-memory key-value store that is extremely fast.
   - **Why we need it**: We use it for caching frequently read data (e.g. menus), storing sessions or OTPs with expiry, and rate limiting, which reduces load on MongoDB.

5. **mongoose**
   - **What it is**: An ODM (Object Data Modeling) library for MongoDB that lets us define schemas and models in JavaScript.
   - **Why we need it**: It is how we connect to MongoDB and work with data. It gives us schema validation, relationships and a clean query API for the `models/` folder.

6. **multer**
   - **What it is**: Express middleware for handling `multipart/form-data`, which is used for file uploads.
   - **Why we need it**: It lets users and restaurant owners upload files such as dish images, restaurant logos and profile pictures, and parses them into `req.file` / `req.files`.

7. **nodemailer**
   - **What it is**: A module for sending emails from Node.js through SMTP or an email provider.
   - **Why we need it**: It sends transactional emails like account verification, password reset, order confirmations and reservation notifications.

# 4. config
