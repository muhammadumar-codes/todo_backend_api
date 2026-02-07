# 📝 Todo Backend API

This repository contains the backend for a **Todo Application**, built step‑by‑step with scalability and real‑world usage in mind. The goal of this project is not just to make CRUD APIs, but to understand how **authentication, authorization, database design, and production deployment** work together.

This README is written in **plain, human language** so that anyone (including your future self) can understand the system without confusion.

---

## What This Backend Does

This backend provides:

- User registration and login
- Secure authentication using JWT
- Protected routes for todos
- Full CRUD operations on todos
- Connection with MongoDB Atlas
- Deployment-ready setup for Vercel

In short: **only logged‑in users can manage their own todos**.

---

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB + Mongoose** – Database and ODM
- **JWT (JSON Web Tokens)** – Authentication
- **bcryptjs** – Password hashing
- **CORS** – Frontend ↔ Backend communication
- **Vercel** – Production deployment

---

## 📁 Project Structure

```
backend/
│
├── config/
│   └── db.js            # MongoDB connection logic
│
├── controllers/
│   ├── auth.controller.js   # Register, login, users
│   └── todo.controller.js   # Todo business logic
│
├── middleware/
│   └── auth.middleware.js   # JWT protection
│
├── models/
│   ├── user.model.js        # User schema
│   └── todo.model.js        # Todo schema
│
├── routes/
│   ├── auth.routes.js       # Auth endpoints
│   └── todo.routes.js       # Todo endpoints
│
├── app.js                   # Express app setup
├── server.js                # Server + production config
├── .env                     # Environment variables
└── package.json
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

These values are **never committed to GitHub** and must be set again in Vercel when deploying.

---

## Database Connection

The database connection is handled in `config/db.js`.

What happens here:

- Mongoose connects to MongoDB Atlas
- The app waits until the database is connected
- If the connection fails, the server stops

This prevents the backend from running in a broken state.

---

## 👤 User Model

The user schema defines how users are stored in the database.

Main fields:

- `name` – user’s full name
- `email` – unique email address
- `password` – hashed password (never plain text)
- timestamps – created and updated time

Passwords are **always hashed** before saving.

---

## ✅ Todo Model

Each todo belongs to a specific user.

Fields:

- `title` – short task title
- `description` – optional details
- `completed` – task status
- `user` – reference to the user who owns the todo
- timestamps

This design ensures:

> A user can only see and manage their own todos.

---

## 🔑 Authentication Flow (JWT)

1. User registers or logs in
2. Backend verifies credentials
3. A JWT token is generated
4. Token is sent to the frontend
5. Frontend stores token (usually in `localStorage`)
6. Token is sent with every protected request

Example header:

```
Authorization: Bearer <token>
```

---

## 🛡️ Auth Middleware

The middleware checks:

- Is a token provided?
- Is the token valid?

If valid:

- `req.user` is attached
- Request continues

If not:

- Access is denied

This is what protects private routes like `/api/todos`.

---

## 🔗 API Routes

### Auth Routes (`/api/auth`)

#### Register

```
POST /api/auth/register
```

Request body:

```json
{
  "name": "Umar",
  "email": "umar@email.com",
  "password": "123456"
}
```

---

#### Login

```
POST /api/auth/login
```

Returns a JWT token on success.

---

#### Get All Users (Protected)

```
GET /api/auth/users
```

Requires Authorization header.

---

### Todo Routes (`/api/todos`)

All todo routes are protected.

#### Create Todo

```
POST /api/todos
```

#### Get My Todos

```
GET /api/todos
```

#### Update Todo

```
PUT /api/todos/:id
```

#### Delete Todo

```
DELETE /api/todos/:id
```

---

## ⚙️ app.js

This file:

- Creates the Express app
- Enables JSON parsing
- Attaches routes

It does **not** start the server.

---

## 🌍 server.js

This file:

- Loads environment variables
- Enables CORS
- Connects to MongoDB
- Starts the server

This separation keeps the code clean and production‑ready.

---

## 🌐 CORS (Why It Matters)

Your frontend and backend live on different URLs.

Example:

- Frontend: `react-todo.vercel.app`
- Backend: `todo-backend-api.vercel.app`

Browsers block requests by default.

CORS explicitly allows trusted frontends to access the backend.

---

## ✅ Final Notes

This backend is:

- Secure
- Scalable
- Easy to extend

You can confidently add:

- Admin roles
- Pagination
- Swagger docs
- Testing
- Frontend dashboards

This is a **real-world backend**, not a demo project.
