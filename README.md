Vocabulary Management Web App
Overview

This is a full-stack vocabulary management web application built using Vue.js (frontend) and Node.js/Express (backend) with MongoDB (Mongoose) as the database.

The system allows users to register, log in, and manage vocabulary items with full CRUD functionality.

Architecture
Frontend (Vue.js)
Framework: Vue.js 2.6
Router: Vue Router
State management: Local component state (no Vuex/Pinia)
HTTP client: Axios
UI libraries: Semantic UI, jQuery

Structure:

front-end/
 ├── src/
 │   ├── assets/
 │   ├── components/
 │   ├── views/
 │   ├── helpers.js
 │   ├── App.vue
 │   ├── main.js
 │   └── router.js

Key files:

Words.vue → vocabulary list & CRUD UI
helpers.js → Axios instance + token handling
Backend (Node.js / Express)
Framework: Express.js
Database: MongoDB (Mongoose)
Authentication: JWT + bcryptjs
Middleware: JWT auth middleware

Structure:

server/
 ├── api/
 │   ├── controllers/
 │   ├── models/
 │   ├── middleware/
 │   └── routes/
 ├── server.js
 └── package.json

Key components:

authController.js → register/login logic
vocabController.js → CRUD vocabulary operations
authMiddleware.js → JWT verification
userModel.js, vocabModel.js → MongoDB schemas
Database Design

MongoDB is used with Mongoose ODM.

Collections:

User

email
password (hashed)
name

Vocab

english
german
userId (reference to User)
Authentication
Authentication method: Email/Password
Password hashing: bcryptjs
Token system: JWT
Token storage: localStorage (frontend)
Axios interceptor automatically attaches token to requests
Features
User registration & login
JWT-based authentication
Create / Read / Update / Delete vocabulary words
Search vocabulary
User-specific data management
API Structure
Auth
POST /register → create user
POST /login → login user
Vocabulary
GET /words → get all words
POST /words → create word
GET /words/:id → get single word
PUT /words/:id → update word
DELETE /words/:id → delete word
GET /words/search → search words
Tech Stack
Frontend
Vue.js 2
Vue Router
Axios
Semantic UI
Backend
Node.js
Express.js
MongoDB + Mongoose
JWT
bcryptjs
CORS
Notes
No Flutter / Android Native module found in this project.
No Firebase integration is used.
State management is handled locally in Vue components (no Vuex/Pinia).
How to Run
Backend
cd server
npm install
node server.js
Frontend
cd front-end
npm install
npm run serve
Summary

This project is a classic MEVN-style architecture (Vue + Express + MongoDB) focusing on authentication and CRUD-based vocabulary management.
