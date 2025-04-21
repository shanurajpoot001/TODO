# Todo Application

A modern Todo application built with Next.js, Node.js, Express, and MongoDB.

## Features

- Create, read, update todos
- Pagination support
- Search functionality
- Responsive design
- Real-time updates

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Setup

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following content:

```
MONGODB_URI=mongodb://localhost:27017/todo-app
PORT=5000
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `backend/`: Node.js and Express backend
  - `models/`: MongoDB models
  - `routes/`: API routes
  - `server.js`: Main server file

- `frontend/`: Next.js frontend
  - `src/app/`: Next.js app router pages
  - `src/components/`: React components
  - `src/styles/`: CSS and Tailwind styles

## API Endpoints

- `GET /api/todos`: Get todos with pagination
- `POST /api/todos`: Create a new todo
- `PUT /api/todos/:id`: Update a todo
- `GET /api/todos/:id`: Get a single todo 