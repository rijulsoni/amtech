# 🚀 Full-Stack Authentication System

A **secure** full-stack authentication application built with **Node.js, Express, PostgreSQL, and EJS templating**. It includes **user registration, login with Google reCAPTCHA v2, profile management, and logout functionality**, along with security enhancements like **JWT authentication, password hashing, and rate limiting**.

---

## ✨ Features  

### 🔑 Authentication & Security  
- **User Registration**: Register with **username, email, and password** (hashed using `bcrypt`).  
- **User Login**: Secure login with **Google reCAPTCHA v2 validation** and **JWT-based session management**.  
- **Logout**: Clears the **JWT cookie** and redirects to the login page.  
- **Password Protection**: Passwords are hashed using **bcrypt** before storing in the database.  
- **JWT Authentication**: Token-based authentication with a **15-minute expiry** for added security.  
- **Google reCAPTCHA v2**: Prevents bot attacks during login.  
- **Rate Limiting**: Limits login attempts to **5 per IP in 15 minutes** to prevent brute-force attacks.  

### 📌 User Management  
- **Profile Page**: A protected route displaying **user details** (ID, username, email, and account creation date).  
- **Input Validation**:  
  - **Client-side & server-side** validation for email, username, and password.  

---

## 📂 Project Structure  

```
auth-system/
├── public/
│   └── styles.css          # Static CSS file
├── views/
│   ├── login.ejs           # Login page template
│   ├── register.ejs        # Registration page template
│   └── profile.ejs         # Profile page template
├── routes/
│   └── auth.router.js      # Authentication routes
├── controllers/
│   └── auth.controller.js  # Logic for authentication operations
├── middlewares/
│   └── auth.middleware.js  # JWT authentication middleware
├── config/
│   └── db.js               # PostgreSQL connection and table setup
├── index.js                # Main Express server
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

---

## 📌 Prerequisites  
- **Node.js**: v16 or higher  
- **PostgreSQL**: v10 or higher  
- **Google reCAPTCHA Keys**: Register at [Google reCAPTCHA](https://www.google.com/recaptcha/admin) for v2 Checkbox keys  

---

## 🛠 Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/rijulsoni/amtech.git
cd amtech
```

### 2️⃣ Install Dependencies  
```bash
npm install
```

### 3️⃣ Setup PostgreSQL  
Create a new database:
```bash
psql -U postgres -c "CREATE DATABASE amtech;"
```
The `db.js` script will automatically create the `users` table on startup.

### 4️⃣ Configure Environment Variables  
Create a `.env` file in the root directory and add the following variables:
```env
JWT_SECRET=your-secret-key
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key
DATABASE_URL=postgresql://username:password@localhost:5432/amtech
PORT=3000
```
- Replace `your-secret-key` with a strong secret key.  
- Replace `your-recaptcha-secret-key` with your Google reCAPTCHA secret key.  
- Update `DATABASE_URL` with your PostgreSQL credentials if needed.  

### 5️⃣ Update reCAPTCHA Site Key  
Edit `views/login.ejs` and replace the `data-sitekey` value with your **reCAPTCHA v2 Checkbox site key**:
```html
<div class="g-recaptcha" data-sitekey="your_recaptcha_site_key"></div>
```

### 6️⃣ Start the Server  
```bash
npm start
```
The server will run on `http://localhost:3000` (or the port specified in `.env`).

---

## 📦 Dependencies  
- `express` – Web framework  
- `pg` – PostgreSQL client  
- `bcrypt` – Password hashing  
- `jsonwebtoken` – JWT authentication  
- `cookie-parser` – Cookie handling  
- `ejs` – Templating engine  
- `express-rate-limit` – Rate limiting  
- `dotenv` – Environment variable management  
- `node-fetch` – For reCAPTCHA verification  

---