# 📚 BookReview Platform - Backend (MERN)

A robust and scalable backend for a modern web platform where users can explore, review, and share their thoughts about their favorite books.

This repository contains the **backend** codebase of the BookReview Platform project, built with Node.js, Express, and MongoDB.

---

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT, Google OAuth (Passport.js)
- **File Handling:** Multer
- **Security:** Helmet, XSS-Clean, Express-Mongo-Sanitize, HPP
- **Validation:** Express-Validator

---

## 📂 Frontend Repository

👉 [Frontend Repository](https://github.com/sadvika05/book-review-platform-frontend)

---

## 🏗️ Project Architecture

Follows the **MVC architecture** to ensure modularity and separation of concerns.

```
BookReview-Platform-MERN-BE/
│
├── src/
│   ├── model/          # Mongoose models (Schemas)
│   ├── controller/     # Controller logic for handling requests
│   ├── route/          # API routes (endpoints)
│   ├── middleware/     # Middleware for authentication, error handling, etc.
│   ├── config/         # Configuration files (DB connection, environment variables)
│   ├── app.js          # Express app - setup for middlewares and routes
│
├── server.js           # Main entry point - connects DB and starts the server
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation (this file)
```

---


---

## 📋 Prerequisites

Ensure the following tools are installed and configured:

- **Node.js** (v14+)
- **MongoDB** (local or cloud via Atlas)
- **Google OAuth** credentials for social login

---

## 🔧 Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sadvika05/book-review-platform-backend.git
   cd book-review-platform-backend

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```bash
   MONGODB_URL=your_mongodb_connection_string

   JWT_SECRET=your_jwt_secret
   
   # Email configuration (for email notifications)
   mailID=your_email_service
   mailPass=your_email_password
   
   # Google OAuth credentials
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
   GOOGLE_REDIRECT_URL=http://localhost:3000/profile

   CLIENT_URL=http://localhost:3000

   SALT_VALUE=20
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

   The backend server will now be running locally.

---

## 🔒 Security Implementations

This backend includes several key security features to protect both the system and its users:

- **JSON Web Tokens (JWT)** for secure user authentication
- **Password hashing** with bcrypt for secure password storage
- **HTTP security headers** using Helmet to secure the API
- **Rate limiting** to prevent brute-force attacks
- **Data sanitization** with Express-Mongo-Sanitize to prevent NoSQL injection
- **XSS protection** through XSS-Clean
- **Parameter pollution prevention** (HPP)

---

## 🚨 Error Handling

The API features a global error-handling middleware that ensures consistent and informative error responses, including:

- Validation errors
- Authentication errors
- Authorization errors
- Resource not found errors
- Database errors
