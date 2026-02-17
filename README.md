# 📝 Todo Backend API

A secure and production-ready backend for a Todo Application built with Node.js, Express, MongoDB, and JWT authentication.

This project demonstrates proper backend architecture including authentication, authorization, middleware structure, validation layer, and database design.

---

## Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Password Hashing (bcryptjs)
- ✅ Protected Routes
- ✅ Full CRUD for Todos
- ✅ Request Validation using Yup
- ✅ MongoDB Atlas Integration
- ✅ Clean and Scalable Project Structure

> Only logged-in users can manage their own todos.

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **Yup**
- **CORS**

---

## 📁 Project Structure

```bash
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── todo.controller.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── validate.middleware.js
│
├── models/
│   ├── user.model.js
│   └── todo.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── todo.routes.js
│
├── validations/
│   ├── auth.validation.js
│   └── todo.validation.js
│
├── utils/
│   ├── hash.util.js
│   └── jwt.util.js
│
├── app.js
├── server.js
└── .env
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

⚠️ Never commit your `.env` file to GitHub.

---

## 🔑 Authentication Flow

1. User registers or logs in
2. Password is hashed or compared
3. JWT token is generated
4. Token is sent to frontend
5. Frontend sends token in Authorization header

Example:

```
Authorization: Bearer <token>
```

---

## 🛡️ Auth Middleware

The authentication middleware:

- Verifies JWT token
- Finds the user
- Attaches user to `req.user`
- Protects private routes

If token is invalid → 401 Unauthorized response.

---

## ✅ Validation Layer

Validation is handled using Yup schemas and a custom validation middleware.

- Validates `req.body` and `req.params`
- Returns 400 if invalid
- Prevents controller from running if data is incorrect

This keeps controllers clean and secure.

---

# 🔗 API Endpoints

## 🔐 Auth Routes

Base URL:

```
/api/auth
```

### Register

```
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Umar",
  "email": "umar@email.com",
  "password": "123456"
}
```

---

### Login

```
POST /api/auth/login
```

Returns JWT token on success.

---

## 📝 Todo Routes (Protected)

Base URL:

```
/api/todos
```

All routes require Authorization header.

---

### Create Todo

```
POST /api/todos
```

---

### Get My Todos

```
GET /api/todos
```

---

### Update Todo

```
PUT /api/todos/:id
```

---

### Delete Todo

```
DELETE /api/todos/:id
```
