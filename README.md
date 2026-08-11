# FocusFlow - Task Management Application

FocusFlow is a full-stack task management application designed to help users organize, track, update, and manage their daily tasks through a structured and user-friendly interface.

The application provides user authentication, task creation and management, task status tracking, editing and deletion functionality, and dedicated views for pending, in-progress, and completed tasks.

The project follows a client-server architecture with a React-based frontend and a Node.js/Express backend connected to MongoDB.

---

# Features

* User registration and login
* Authentication-protected task management
* Create new tasks
* View tasks
* Edit existing tasks
* Delete tasks
* Track task progress
* Categorize tasks based on their current status
* Dedicated pending task view
* Dedicated in-progress task view
* Dedicated completed task view
* Dashboard for task management
* Reusable task cards and UI components
* Confirmation dialogs for task deletion
* Dialog for viewing completed task details
* Centralized frontend application state using React Context
* REST API-based frontend and backend communication
* MongoDB database integration
* JWT-based authentication
* Password hashing using bcrypt
* Responsive React application structure

The frontend contains dedicated pages for `Dashboard`, `Pending`, `InProgress`, `CompletedTask`, `CreateTask`, `EditTask`, `Login`, and `Register`.

---

# Tech Stack

## Frontend

* **React.js** - Building the user interface
* **JavaScript / JSX** - Application logic and components
* **Vite** - Frontend development and build tooling
* **CSS** - Application styling
* **React Context API** - Managing shared application state

## The frontend uses Vite configuration and contains React components, pages, context, assets, and styling files.

## Backend

* **Node.js** - JavaScript runtime
* **Express.js** - Backend framework and REST API development
* **MongoDB** - Database
* **MongoDB Node.js Driver / Mongoose-related database tooling** - Database interaction
* **JWT / JSON Web Token** - Authentication
* **bcryptjs** - Password hashing
* **dotenv** - Environment variable management
* **CORS** - Cross-origin communication

## The project dependency tree includes Express, MongoDB, `jsonwebtoken`, `bcryptjs`, `dotenv`, and CORS-related packages.

# Project Architecture

```text
                         USER
                           |
                           v
                 +-------------------+
                 |     FRONTEND      |
                 | React + Vite      |
                 +---------+---------+
                           |
                      HTTP Requests
                           |
                           v
                 +-------------------+
                 |      BACKEND      |
                 | Node.js + Express |
                 +---------+---------+
                           |
              +------------+------------+
              |                         |
              v                         v
      +---------------+         +---------------+
      | Authentication|         | Task APIs     |
      | JWT + bcrypt  |         | CRUD          |
      +-------+-------+         +-------+-------+
              |                         |
              +------------+------------+
                           |
                           v
                  +----------------+
                  |    MongoDB     |
                  | User + Tasks   |
                  +----------------+
```

---

# Project Structure

```text
FocusFlow/
└── TaskManager/
    |
    ├── backend/
    │   |
    │   ├── .gitignore
    │   ├── app.js
    │   |
    │   ├── config/
    │   │   └── database.js
    │   |
    │   ├── controllers/
    │   │   |
    │   │   ├── auth/
    │   │   │   ├── login.js
    │   │   │   └── register.js
    │   │   |
    │   │   └── task/
    │   │       ├── create.js
    │   │       ├── delete.js
    │   │       ├── fetch.js
    │   │       └── update.js
    │   |
    │   ├── middlewares/
    │   │   └── authMiddlewar.js
    │   |
    │   ├── model/
    │   │   ├── TaskSchema.js
    │   │   └── UserSchema.js
    │   |
    │   └── routes/
    │       ├── authRoutes.js
    │       └── taskRoutes.js
    |
    ├── frontend/
    │   |
    │   ├── .gitignore
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── vite.config.js
    │   |
    │   ├── public/
    │   |
    │   └── src/
    │       |
    │       ├── App.jsx
    │       ├── App.css
    │       ├── index.css
    │       ├── main.jsx
    │       |
    │       ├── assets/
    │       |
    │       ├── atom/
    │       │   ├── Button.jsx
    │       │   ├── Heading.jsx
    │       │   ├── IconButton.jsx
    │       │   └── TaskCard.jsx
    │       |
    │       ├── component/
    │       │   ├── Dialog/
    │       │   │   ├── CompleteViewDialog.jsx
    │       │   │   └── DeleteDialog.jsx
    │       │   ├── HeroSection.jsx
    │       │   ├── Navbar.jsx
    │       │   ├── SideComponentWrapper.jsx
    │       │   ├── Sidebar.jsx
    │       │   └── TaskForm.jsx
    │       |
    │       ├── context/
    │       │   └── AppContext.jsx
    │       |
    │       ├── lib/
    │       │   └── GetHeader.js
    │       |
    │       └── pages/
    │           ├── CompletedTask.jsx
    │           ├── CreateTask.jsx
    │           ├── Dashboard.jsx
    │           ├── EditTask.jsx
    │           ├── Home.jsx
    │           ├── InProgress.jsx
    │           ├── Login.jsx
    │           ├── Pending.jsx
    │           └── Register.jsx
    |
    ├── .gitignore
    └── README.md
```

The uploaded project contains separate backend configuration, controllers, middleware, models, and routes, while the frontend is organized into pages, reusable components, dialogs, context, assets, and utility code.

---

# How the Application Works

FocusFlow follows a standard full-stack request-response architecture.

```text
User
 |
React Frontend
 |
API Request
 |
Express Backend
 |
Authentication Middleware
 |
Controller
 |
MongoDB
 |
API Response
 |
React Frontend
 |
Updated UI
```

The backend is separated into authentication controllers, task controllers, routes, models, and authentication middleware.

---

# User Authentication Flow

Authentication allows users to create accounts and securely access their own task-management functionality.

## Registration

```text
User
 |
Register Page
 |
Registration Request
 |
Express Backend
 |
Register Controller
 |
Validate User
 |
Hash Password
 |
Store User
 |
Generate Authentication Token
 |
Authenticated User
```

The project contains dedicated authentication controllers:

```text
backend/
└── controllers/
    └── auth/
        ├── login.js
        └── register.js
```

---

## Login

```text
User
 |
Login Page
 |
Email + Password
 |
Express Backend
 |
Login Controller
 |
Find User
 |
Compare Password
 |
Generate JWT
 |
Authenticated Session
```

The authentication implementation uses `bcryptjs` for password hashing and `jsonwebtoken` for token-based authentication.

---

# Authentication Middleware

Protected task operations pass through authentication middleware.

```text
Frontend Request
      |
      v
Authentication Token
      |
      v
authMiddleware
      |
      +---- Invalid Token ----> Unauthorized
      |
      v
Valid User
      |
      v
Task Controller
```

The project contains a dedicated authentication middleware:

```text
backend/
└── middlewares/
    └── authMiddlewar.js
```

This middleware sits between incoming requests and protected controllers.

---

# Task Management Workflow

The main purpose of FocusFlow is task management.

Each task can be created, retrieved, updated, or deleted.

```text
                 TASK MANAGEMENT
                       |
       +---------------+---------------+
       |               |               |
       v               v               v
     CREATE           FETCH           UPDATE
       |               |               |
       +---------------+---------------+
                       |
                     DELETE
```

The backend contains dedicated controllers for each of these operations:

```text
backend/
└── controllers/
    └── task/
        ├── create.js
        ├── delete.js
        ├── fetch.js
        └── update.js
```

This separation makes each task operation independently manageable.

---

# Create Task Flow

When the user creates a task:

```text
User
 |
Create Task Page
 |
Task Form
 |
API Request
 |
Authentication Middleware
 |
Create Task Controller
 |
Task Model
 |
MongoDB
 |
Success Response
 |
Dashboard Updated
```

The frontend contains a dedicated `CreateTask.jsx` page and reusable `TaskForm.jsx` component.

---

# Fetch Tasks Flow

When the dashboard loads, the application retrieves the user's tasks from the backend.

```text
Dashboard
 |
Request Tasks
 |
Backend
 |
Authentication Middleware
 |
Fetch Controller
 |
MongoDB
 |
Task Records
 |
API Response
 |
React State
 |
Task Cards
```

The task information can then be displayed through reusable task components such as `TaskCard.jsx`.

---

# Update Task Flow

Users can modify existing tasks through the edit functionality.

```text
Task Card
 |
Edit
 |
Edit Task Page
 |
Task Form
 |
Update API
 |
Update Controller
 |
MongoDB
 |
Updated Task
 |
Frontend Refresh
```

## The frontend contains a dedicated `EditTask.jsx` page, while the backend contains a separate `update.js` controller.

# Delete Task Flow

Deleting a task uses a confirmation dialog before sending the deletion request.

```text
Task Card
 |
Delete
 |
Delete Confirmation Dialog
 |
Confirm
 |
Delete API
 |
Delete Controller
 |
MongoDB
 |
Task Removed
 |
Updated Dashboard
```

The project includes a dedicated `DeleteDialog.jsx` component for this interaction.

---

# Task Status Management

FocusFlow organizes tasks according to their current progress.

The frontend provides separate pages for:

```text
Task Status
    |
    +---- Pending
    |
    +---- In Progress
    |
    +---- Completed
```

These correspond to:

```text
Pending.jsx
InProgress.jsx
CompletedTask.jsx
```

The pages are part of the frontend's task-management workflow.

---

# Dashboard

The dashboard acts as the central workspace for managing tasks.

```text
                    Dashboard
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
       Pending      In Progress    Completed
          |
          v
      Task Cards
          |
    +-----+-----+
    |     |     |
   Edit  Delete View
```

## The frontend contains a dedicated `Dashboard.jsx` page along with reusable `TaskCard`, `Sidebar`, `Navbar`, and task-form components.

# Frontend Architecture

The frontend follows a component-based React architecture.

```text
React Application
       |
       +-------------------+
       |                   |
     Pages             Components
       |                   |
       |             +-----+------+
       |             |            |
       |           Atomic       Dialogs
       |          Components
       |
     Context
       |
   Shared State
```

---

## Pages

The project contains:

| Page                | Purpose                             |
| ------------------- | ----------------------------------- |
| `Home.jsx`          | Main application landing page       |
| `Login.jsx`         | User authentication                 |
| `Register.jsx`      | New user registration               |
| `Dashboard.jsx`     | Main task dashboard                 |
| `CreateTask.jsx`    | Create a new task                   |
| `EditTask.jsx`      | Modify an existing task             |
| `Pending.jsx`       | Display pending tasks               |
| `InProgress.jsx`    | Display tasks currently in progress |
| `CompletedTask.jsx` | Display completed tasks             |

These pages are explicitly present in the uploaded project structure.

---

# Reusable Components

The project separates reusable UI components from page-level components.

### Atomic Components

```text
atom/
├── Button.jsx
├── Heading.jsx
├── IconButton.jsx
└── TaskCard.jsx
```

These components provide smaller reusable building blocks for the interface.

### Main Components

```text
component/
├── Dialog/
│   ├── CompleteViewDialog.jsx
│   └── DeleteDialog.jsx
├── HeroSection.jsx
├── Navbar.jsx
├── SideComponentWrapper.jsx
├── Sidebar.jsx
└── TaskForm.jsx
```

This component structure helps avoid repeating the same UI logic throughout the application.

---

# React Context

The project uses a dedicated application context:

```text
src/
└── context/
    └── AppContext.jsx
```

The context provides a centralized location for shared application state and allows multiple components to access common data without passing props through every component.

---

# Backend Architecture

The backend follows a modular structure:

```text
Backend
   |
   +---- Configuration
   |
   +---- Routes
   |
   +---- Middleware
   |
   +---- Controllers
   |
   +---- Models
   |
   +---- Database
```

---

# Routes

The backend contains two major route modules:

```text
backend/
└── routes/
    ├── authRoutes.js
    └── taskRoutes.js
```

Authentication routes handle user registration and login, while task routes handle task-related operations.

---

# Controllers

Controllers contain the application logic for processing requests.

```text
controllers/
|
├── auth/
|   ├── login.js
|   └── register.js
|
└── task/
    ├── create.js
    ├── delete.js
    ├── fetch.js
    └── update.js
```

This structure follows separation of concerns by keeping authentication logic separate from task-management logic.

---

# Database Layer

MongoDB is used to persist application data.

The backend contains:

```text
backend/
├── config/
│   └── database.js
│
└── model/
    ├── TaskSchema.js
    └── UserSchema.js
```

The database configuration is separated from the database models.

```text
Application
     |
Database Configuration
     |
MongoDB
     |
+----+----+
|         |
User     Task
Data     Data
```

## The project explicitly contains separate schemas for users and tasks.

# Task Data Flow

The complete task lifecycle can be represented as:

```text
                  USER
                    |
                    v
              Create Task
                    |
                    v
              React Form
                    |
                    v
              API Request
                    |
                    v
          Authentication Middleware
                    |
                    v
            Create Controller
                    |
                    v
              Task Schema
                    |
                    v
                MongoDB
                    |
                    v
             Stored Task
                    |
                    v
               Dashboard
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Pending  In Progress Completed
          |         |         |
          +---------+---------+
                    |
             Edit / Delete
```

---

# Installation and Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/FocusFlow.git
```

Move into the project:

```bash
cd FocusFlow/TaskManager
```

---

# 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

# 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

`node_modules` should not be committed to GitHub. It is automatically recreated when `npm install` is executed.

---

# Environment Variables

The project contains an `.env` file at the project level.

For security, the `.env` file should not be committed to GitHub.

Create your own `.env` file locally and configure the variables required by the backend.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the exact variable names expected by your backend implementation.

Never commit actual database credentials or authentication secrets.

---

# Running the Application

## Start Backend

From the backend directory:

```bash
npm start
```

If the project uses Nodemon for development:

```bash
npm run dev
```

The backend entry point is:

```text
backend/
└── app.js
```

---

## Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Vite will provide the local development URL in the terminal.

---

# Recommended .gitignore

Make sure the following files are excluded from version control:

```gitignore
# Dependencies
node_modules/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
dist/
build/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Operating system files
.DS_Store
Thumbs.db
```

## The uploaded project currently includes both `.env` and a `node_modules` directory, so these should be removed before pushing the project to GitHub.

# Development Workflow

A typical development workflow for FocusFlow is:

```text
1. Set up React frontend
          |
2. Create Express backend
          |
3. Configure MongoDB
          |
4. Create User and Task schemas
          |
5. Implement registration
          |
6. Implement login
          |
7. Add JWT authentication
          |
8. Create authentication middleware
          |
9. Implement task CRUD APIs
          |
10. Connect frontend to backend
          |
11. Build dashboard
          |
12. Add task status views
          |
13. Add edit and delete functionality
          |
14. Test the complete application
          |
15. Deploy the application
```

---

# API Architecture

The backend is organized around two main API groups.

## Authentication APIs

```text
Authentication
|
+---- Register
|
└---- Login
```

These operations are handled through:

```text
authRoutes.js
```

and the corresponding controllers:

```text
register.js
login.js
```

---

## Task APIs

```text
Task APIs
|
+---- Create Task
|
+---- Fetch Tasks
|
+---- Update Task
|
└---- Delete Task
```

These operations correspond to the dedicated task controllers:

```text
create.js
fetch.js
update.js
delete.js
```

This modular API structure is explicitly represented in the backend source tree.

---

# Security

The application incorporates several basic security practices:

* Password hashing using bcrypt
* JWT-based authentication
* Authentication middleware
* Protected task operations
* Environment variables for sensitive configuration
* Separation of authentication and task-management logic

## The project includes `bcryptjs`, `jsonwebtoken`, `dotenv`, and an authentication middleware in its backend dependency and source structure.

# Learning Outcomes

This project provides practical experience with:

* Full-stack web development
* React.js
* Vite
* Node.js
* Express.js
* MongoDB
* REST API development
* CRUD operations
* JWT authentication
* Password hashing
* Authentication middleware
* React Context API
* Component-based architecture
* Frontend-backend integration
* Database schema design
* Task status management
* Application state management
* Modular backend architecture

---

# Future Improvements

Potential enhancements include:

* Task priorities
* Task due dates
* Task reminders
* Search and filtering
* Task sorting
* Drag-and-drop task management
* User profile management
* Dark mode
* Notifications
* Calendar integration
* Task analytics
* Productivity statistics
* Pagination for large task collections
* Refresh-token authentication
* Automated testing
* Production deployment
* CI/CD integration

---

# Contributing

Contributions are welcome.

1. Fork the repository.

2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.

4. Commit your changes:

```bash
git commit -m "Add new feature"
```

5. Push the branch:

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---
