# Full Stack Note-Taking Application

## Overview

Quotely is a note-taking application built using React for the frontend and Node.js with Express for the backend. The application provides users with a seamless experience for creating, editing, and managing notes. MongoDB is used as the database to store user data, and socket.io enables real-time updates.

## Features

- User authentication (registration & login)
- Create, read, update, and delete notes
- Real-time updates using WebSockets (socket.io)
- Responsive UI with React and Tailwind CSS
- Backend API built with Express and MongoDB
- Secure authentication with JWT and bcryptjs

## Tech Stack

### Frontend

- **React** (v18.3.1)
- **React Router DOM** (v6.28.1)
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Query** for state management and server-side data fetching
- **React Hot Toast** for notifications
- **Socket.io Client** for real-time communication
- **Vite** for fast development and build tooling

### Backend

- **Node.js** (v18+)
- **Express** for building RESTful APIs
- **MongoDB** (via Mongoose) as the database
- **JWT (jsonwebtoken)** for authentication
- **Bcrypt.js** for password hashing
- **Socket.io** for real-time communication
- **Helmet** for securing HTTP headers
- **CORS** for handling cross-origin requests
- **Dotenv** for environment variable management

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v18 or higher)
- MongoDB (locally or via a cloud service like MongoDB Atlas)

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

#### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

#### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### Running the Application

#### 1. Start the Backend Server

Replace the origin URL in CORS options to local URL in the backend server:
Open `server.js` and replace:

```javascript
origin: "https://quotely-one.vercel.app";
```

with:

```javascript
origin: "http://localhost:5173";
```

```bash
cd backend
npm run start
```

OR (for development with hot reloading)

```bash
npm run start:watch
```

#### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173/` by default.

### Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

### Scripts

#### Frontend

- **dev**: Starts the development server using Vite
- **build**: Builds the frontend for production
- **lint**: Runs ESLint for code linting
- **preview**: Previews the production build

#### Backend

- **start**: Starts the backend server
- **start:watch**: Starts the backend server with nodemon for hot reloading
- **test**: Placeholder for running tests

## Project Structure

```
root
├── frontend
│   ├── src
│   │   ├── components  # React components
│   │   ├── pages       # Application pages
│   │   ├── utils       # Utility functions
│   │   └── App.jsx     # Main app component
│   └── ...             # Other frontend files
└── backend
    ├── controllers     # Request handlers
    ├── models          # Mongoose models
    ├── routes          # Express routes
    ├── middleware      # Custom middleware
    ├── server.js       # Entry point
    └── ...             # Other backend files
```

## Dependencies

### Frontend

| Dependency            | Version  |
| --------------------- | -------- |
| @tanstack/react-query | ^5.64.0  |
| axios                 | ^1.7.9   |
| lucide-react          | ^0.471.0 |
| react                 | ^18.3.1  |
| react-dom             | ^18.3.1  |
| react-hot-toast       | ^2.5.1   |
| react-router-dom      | ^6.28.1  |
| socket.io-client      | ^4.8.1   |
| tailwindcss           | ^3.4.17  |
| vite                  | ^6.0.5   |

### Backend

| Dependency        | Version |
| ----------------- | ------- |
| bcryptjs          | ^2.4.3  |
| cookie-parser     | ^1.4.7  |
| cors              | ^2.8.5  |
| dotenv            | ^16.4.7 |
| express           | ^4.21.2 |
| express-validator | ^7.2.1  |
| helmet            | ^8.0.0  |
| jsonwebtoken      | ^9.0.2  |
| mongoose          | ^8.9.4  |
| socket.io         | ^4.8.1  |

### Dev Dependencies

| Dependency | Version |
| ---------- | ------- |
| nodemon    | ^3.1.9  |

## License

This project is licensed under the ISC License.
