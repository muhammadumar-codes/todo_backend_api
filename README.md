# 📝 Todo Backend API – Full Documentation

Umar jani 💙 this document explains your **Todo Backend Application** from zero to production, in **simple language**, with **real examples**, so you can revise, present, or extend it later.

---

## 1️⃣ Project Overview

This backend is a **RESTful API** built with:

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **Deployed on Vercel**

### 🎯 Purpose

* User Registration & Login
* JWT-based Authentication
* Create, Read, Update, Delete Todos


---

## 2️⃣ Folder Structure

```
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── auth.controller.js
│   └── todo.controller.js
│
├── middleware/
│   └── auth.middleware.js
│
├── models/
│   ├── user.model.js
│   └── todo.model.js
│
├── routes/
│   ├── auth.routes.js
│   └── todo.routes.js
│
├── app.js
├── server.js
├── .env
└── package.json
```

---

## 3️⃣ Environment Variables (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=super_secret_key
```

⚠️ Never push `.env` to GitHub.

---

## 4️⃣ Database Connection (config/db.js)

### 🔹 Purpose

Connect backend to MongoDB Atlas.

### 🔹 Key Points

* Uses `mongoose.connect`
* Handles connection errors

---

## 5️⃣ Models

### 👤 User Model (user.model.js)

Fields:

* `name` – String (required)
* `email` – String (unique, required)
* `password` – Hashed using bcrypt
* `createdAt`

---

### ✅ Todo Model (todo.model.js)

Fields:

* `title` – String
* `completed` – Boolean
* `user` – ObjectId (reference to User)
* `createdAt`

---

## 6️⃣ Authentication Flow (JWT)

### 🔐 How Login Works

1. User sends email & password
2. Password is compared using bcrypt
3. JWT token is generated
4. Token sent to frontend
5. Frontend stores token in `localStorage`

---

## 7️⃣ Middleware – auth.middleware.js

### 🔹 Purpose

Protect private routes.

### 🔹 How it Works

* Reads `Authorization: Bearer <token>` header
* Verifies JWT
* Adds `req.user`

Without token → Access denied

---

## 8️⃣ Routes & APIs

### 🔓 Auth Routes (`/api/auth`)

#### ✅ Register User

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

Response:

```json
{
  "token": "jwt_token",
  "user": { "id": "...", "email": "..." }
}
```

---

#### ✅ Login User

```
POST /api/auth/login
```

---

#### 🔒 Get All Users (Admin / Protected)

```
GET /api/auth/users
```

Headers:

```
Authorization: Bearer <token>
```

---

### 🔐 Todo Routes (`/api/todos`)

All routes require JWT token.

#### ➕ Create Todo

```
POST /api/todos
```

#### 📥 Get My Todos

```
GET /api/todos
```

#### ✏️ Update Todo

```
PUT /api/todos/:id
```

#### ❌ Delete Todo

```
DELETE /api/todos/:id
```

---

## 9️⃣ app.js

### 🔹 Purpose

* Initialize Express app
* Add JSON middleware
* Attach routes

---

## 🔟 server.js (Production Ready – Vercel)

### 🔹 Purpose

* Load env variables
* Enable CORS
* Connect database
* Start server

### 🔹 CORS Configuration

Allows:

* Localhost frontend
* Vercel frontend

---

## 1️⃣1️⃣ CORS Explanation (Very Important)

Why CORS is needed:

* Backend & frontend are on **different domains**

Example:

* Backend → `todo-backend-api.vercel.app`
* Frontend → `react-todo.vercel.app`

CORS allows browser communication.

---
