# 🛡️ Advanced Auth Service

A production-ready Authentication & Authorization system built with **Node.js**, **Express**, and **MongoDB**. This project follows the **Repository Design Pattern** and implements modern security practices like JWT rotation, secure hashing, and automated email flows.

---

## 🚀 Features Breakdown

### 🔐 Authentication & Session Management
* **User Registration:** Secure onboarding with data validation.
* **Secure Login:** Credential-based access with brute-force protection.
* **JWT Authentication:** Implementation of industry-standard JSON Web Tokens.
* **Advanced Token Strategy:** * **Access Tokens:** Short-lived tokens for secure API access.
    * **Refresh Tokens:** Long-lived tokens for maintaining sessions.
    * **Refresh Token Rotation:** Enhanced security by issuing a new refresh token on every rotation (prevents replay attacks).
* **Cookie-based Sessions:** Securely storing tokens in `HttpOnly` and `SameSite` cookies.
* **Logout System:** Securely invalidating sessions and clearing cookies.
* **Logout From All Devices:** Revoking all active refresh tokens for a specific user.

### 🛡️ Security & Authorization
* **RBAC Authorization:** Role-Based Access Control (Admin, User, etc.) to manage permissions.
* **Protected Routes:** Middleware-level checks to guard sensitive endpoints.
* **Global Error Handling:** Centralized error management for consistent API responses.
* **Environment Configuration:** Secure management of secrets using `.env`.

### 📧 Account Management Flows
* **Email Verification:** Automated account activation via Nodemailer.
* **Resend Verification:** Logic to re-trigger activation emails.
* **Forgot/Reset Password:** Secure, token-based password recovery flow.
* **Google OAuth 2.0:** One-click social login integration for better UX.

### 🏗️ Architecture & Dev-Ops
* **Production Folder Structure:** Scalable organization (Controllers, Services, Repositories).
* **Repository Design Pattern:** Decoupling database logic from business rules.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Security:** JWT (jsonwebtoken), Bcrypt, Crypto, Express-Rate-Limit
* **Communication:** Nodemailer (SMTP Service)

---

## 📂 Project Structure

```text
src/
├── config/             # Database & SMTP configurations
├── controllers/        # Request handling & API Response formatting
├── models/             # Mongoose Schemas (User, Token, Session)
├── repositories/       # Direct Database abstraction layer
├── services/           # Core Business logic & validations
├── utils/              # Helper functions (hashing, token utils, email)
├── middlewares/        # Auth guards, Rate-limiters, & Global Error handlers
└── routes/             # API Endpoint definitions