const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const app = express();

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const port = process.env.PORT || 5000;

// Set up CORS middleware with proper configuration for credentials
app.use((req, res, next) => {
  // Get the origin from the request headers
  const origin = req.headers.origin || 'http://localhost:3000';
  
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

app.use(
  session({
    secret: "final_project",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Routers
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// API routes should be defined before the "catch-all" route

// Handle 404 errors for undefined API routes
app.use('/api', (req, res) => {
  res.status(404).json({ message: "API route not found" });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
