# Book Library Management System

A full-stack web application for managing books in a library. The application provides user authentication and allows users to add, view, search, edit, update, and delete book records.

## Features

- User signup and login
- Password hashing using bcrypt
- User logout
- Add new books
- View all books
- Search books by title or author
- Edit book details
- Delete books
- Mark books as Available or Issued
- MongoDB database storage
- REST API using Express.js
- Responsive React interface

## Tech Stack

### Frontend
- React.js
- React Router
- CSS
- React Icons
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
Book-Library-Management-System/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Book.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bookRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
