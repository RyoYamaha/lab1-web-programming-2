🚀 Vocabulary Management Web App (MEVN Stack)

A full-stack vocabulary management system built with Vue.js (frontend), Node.js/Express (backend), and MongoDB (database).

The application supports user authentication (JWT) and full CRUD operations for vocabulary learning, with user-specific data isolation.

✨ Key Features
🔐 Authentication System
User registration and login
Secure password hashing using bcryptjs
JWT-based authentication
Token stored in localStorage
Axios interceptor for automatic token injection
📚 Vocabulary Management (CRUD)
Create new vocabulary entries
View vocabulary list
Update existing words
Delete vocabulary items
Search vocabulary efficiently
👤 User-Specific Data
Each user has isolated vocabulary data
Secure API access via JWT middleware
🧠 Architecture Overview

This project follows a classic MEVN architecture:

Vue.js (Frontend)
   ↓ Axios (HTTP)
Node.js / Express (Backend API)
   ↓ Mongoose
MongoDB (Database)
🎨 Frontend (Vue.js)
⚙️ Tech Stack
Vue.js 2.6
Vue Router
Axios
Semantic UI
jQuery (UI enhancements)
📁 Structure
front-end/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router.js
│   ├── helpers.js
│   ├── main.js
│   └── App.vue
📌 Core Files
Words.vue → Vocabulary list + CRUD UI
helpers.js → Axios instance + token handling
router.js → Route definitions
main.js → App bootstrap
⚙️ Backend (Node.js + Express)
⚙️ Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
bcryptjs
CORS
📁 Structure
server/
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── server.js
└── package.json
📌 Core Modules
authController.js → Register & login logic
vocabController.js → Vocabulary CRUD logic
authMiddleware.js → JWT verification
userModel.js → User schema
vocabModel.js → Vocabulary schema
🗄️ Database Design (MongoDB)

MongoDB is used with Mongoose ODM.

👤 User Collection
email
password (hashed)
name
📚 Vocab Collection
english
german
userId (reference to User)
🔐 Authentication Flow
User registers or logs in
Backend returns JWT token
Frontend stores token in localStorage
Axios interceptor attaches token to every request
Backend verifies token via middleware
🌐 API Endpoints
🔐 Auth Routes
POST /register → Register new user
POST /login    → User login
📚 Vocabulary Routes
GET    /words          → Get all vocabulary
GET    /words/:id      → Get word by ID
POST   /words          → Create word
PUT    /words/:id      → Update word
DELETE /words/:id      → Delete word
GET    /words/search   → Search vocabulary
🧰 Tech Stack
🎨 Frontend
Vue.js 2
Vue Router
Axios
Semantic UI
⚙️ Backend
Node.js
Express.js
MongoDB + Mongoose
JWT Authentication
bcryptjs
CORS
⚙️ How to Run the Project
🖥️ Backend Setup
cd server
npm install
node server.js
🌐 Frontend Setup
cd front-end
npm install
npm run serve
