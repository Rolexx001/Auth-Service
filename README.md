# 🛡️ Advanced Auth Service

A production-ready Authentication & Authorization system built with **Node.js**, **Express**, and **MongoDB**. This project follows the **Repository Design Pattern** and implements modern security practices like JWT rotation, secure hashing, and automated email flows.

---

## 🚀 Key Features

* **Secure Authentication:** Multi-layered security with password hashing using `bcrypt`.
* **Dual Token System:** Short-lived **Access Tokens** for authorization and long-lived **Refresh Tokens** for session persistence.
* **Token Rotation:** Enhanced security by rotating Refresh Tokens on every successful use (prevents replay attacks).
* **Email Verification:** Complete account activation flow via **Nodemailer** (Ethereal/Gmail integration).
* **Password Recovery:** Secure "Forgot Password" flow using expiration-bound SHA-256 hashed tokens.
* **Security Middlewares:**
    * **Rate Limiting:** Protects against brute-force attacks on sensitive endpoints.
    * **Helmet.js:** Secures HTTP headers to prevent common web vulnerabilities.
    * **CORS:** Configured for controlled cross-origin resource sharing.
* **Clean Architecture:** Implements a strict separation of concerns using Controllers, Services, and Repositories for scalability.

---

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