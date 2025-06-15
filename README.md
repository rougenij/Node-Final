# Book Club Application

A full-stack web application for book enthusiasts to discover, share, and discuss their favorite books.

## Features

- User authentication (login and registration)
- Book management (add, edit, delete books)
- Responsive design for all devices
- Session-based authentication
- MySQL database integration

## Tech Stack

### Frontend
- React with CSS Modules for styling
- Manual navigation (no React Router)
- Form validation
- Responsive design

### Backend
- Node.js with Express 5
- MySQL database
- RESTful API endpoints
- Session-based authentication with express-session
- Password hashing with bcrypt

## Project Structure

```
/
├── client/                  # React frontend
│   ├── public/              # Public assets
│   └── src/                 # Source files
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── utils/           # Utility functions
│       └── assets/          # CSS and images
├── server/                  # Express backend
│   ├── db/                  # Database scripts
│   ├── routes/              # API routes
│   └── app.js               # Main server file
└── README.md                # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL server

### Database Setup
1. Create a MySQL database
2. Run the SQL script in `server/db/book-club.sql` to create the necessary tables

### Backend Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. The server will run on port 3000 by default

### Frontend Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. The frontend will run on port 3001 and proxy API requests to the backend

## Production Deployment
1. Build the React app: `cd client && npm run build`
2. Set the environment variable `NODE_ENV=production` when running the server
3. The server will serve the React app from the `client/build` directory

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `POST /api/users/logout` - Logout a user

### Book Routes
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a specific book
- `POST /api/books` - Add a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Review Routes
- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get a specific review
- `POST /api/reviews` - Add a new review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review

## License
This project is licensed under the MIT License.
