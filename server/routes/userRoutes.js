const express = require("express");
const router = express.Router();
const db = require("../db/dbSingleton").getConnection();
const { isLoggedIn, isAdmin } = require("../middleware/auth");
const bcrypt = require("bcrypt");

//GET
router.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`You've visited this page ${req.session.views} times`);
  } else {
    req.session.views = 1;
    res.send("Welcome! This is your first visit.");
  }
});
router.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Welcome, ${req.session.users.email}!`);
});

//POST
//Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  
  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  const query = "SELECT * from users where email=?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error during user lookup:", err);
      return res.status(500).json({ message: "Database error. Please try again later." });
    }
    
    if (results.length === 1) {
      return res.status(409).json({ message: "Email already registered. Please use a different email." });
    }
    
    //Means email is not taken
    const newUserQuery =
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    
    db.query(
      newUserQuery,
      [name, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("Database error during user registration:", err);
          return res.status(500).json({ message: "Failed to register user. Please try again later." });
        }
        res.status(201).json({ message: "Registration successful! You can now log in.", id: results.insertId });
      }
    );
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  
  const query = "SELECT * from users where email=? LIMIT 1";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error during login:", err);
      return res.status(500).json({ message: "Database error. Please try again later." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found. Please check your email or register." });
    }

    const user = results[0];
    const isUser = bcrypt.compareSync(password, user.password_hash);

    if (isUser) {
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
      
      // Also set req.session.users for backward compatibility with existing code
      req.session.users = req.session.user;

      res.status(200).json({
        message: "Login successful!",
        user: req.session.user,
      });
    } else {
      res.status(401).json({ message: "Incorrect password. Please try again." });
    }
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

//PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).send("Missing required fields");
    return;
  }
  const query =
    "UPDATE users SET username=?, email=?, password_hash=? WHERE id=?";
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  db.query(query, [username, email, hashedPassword, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User updated" });
  });
});

module.exports = router;
