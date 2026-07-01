Vocabulary Management Web Application
Overview

This is a full-stack vocabulary management web application built using Vue.js (frontend), Node.js/Express (backend), and MongoDB (Mongoose) as the database.

The system allows users to register, log in, and perform full CRUD operations on vocabulary items.

Architecture
Frontend (Vue.js)
Framework: Vue.js 2.6
Router: Vue Router
State management: Local component state (no Vuex/Pinia)
HTTP client: Axios
UI libraries: Semantic UI, jQuery
Project Structure
front-end/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── helpers.js
│   ├── App.vue
│   ├── main.js
│   └── router.js
Key Files
Words.vue: Vocabulary list and CRUD interface
helpers.js: Axios instance and token handling
Backend (Node.js / Express)
Framework: Express.js
Database: MongoDB (Mongoose)
Authentication: JWT + bcryptjs
Middleware: JWT authentication middleware
Project Structure
server/
├── api/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── routes/
├── server.js
└── package.json
Key Components
authController.js: Register and login logic
vocabController.js: CRUD operations for vocabulary
authMiddleware.js: JWT verification
userModel.js, vocabModel.js: MongoDB schemas
Database Design

MongoDB is used with Mongoose ODM.

Collections

User

email
password (hashed)
name

Vocab

english
german
userId (reference to User)
Authentication
Method: Email and Password
Password hashing: bcryptjs
Token system: JWT
Token storage: localStorage (frontend)
Axios interceptor automatically attaches token to requests
Features
User registration and login
JWT authentication
Create, read, update, delete vocabulary items
Search vocabulary
User-specific data handling
API Endpoints
Auth
POST /register: Register user
POST /login: Login user
Vocabulary
GET /words: Get all words
POST /words: Create word
GET /words/:id: Get word by ID
PUT /words/:id: Update word
DELETE /words/:id: Delete word
GET /words/search: Search words
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
No Flutter or Android Native is used in this project
No Firebase integration
No Vuex or Pinia (uses local state only)
Setup Instructions
Backend
cd server
npm install
node server.js
Frontend
cd front-end
npm install
npm run serve
Summary

This project is a MEVN-style full-stack application focused on authentication and vocabulary CRUD management, using Vue.js for frontend and Node.js + Express + MongoDB for backend.
