const express = require("express");
const router = express.Router();
const db = require("../db/dbSingleton").getConnection();

//GET
router.get("/:bookId", (req, res) => {
  const { bookId } = req.params;
  const query =
    "SELECT reviews.id AS review_id,users.name AS reviewer_name,reviews.rating,reviews.comment FROM reviews INNER JOIN users ON reviews.user_id = users.id INNER JOIN books ON reviews.book_id =?;";
  db.query(query, [bookId], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "No Reviews found for this book" });
    }
    res.json(results);
  });
});

//POST - Create a new review
router.post("/", (req, res) => {
  const { book_id, user_id, rating, comment } = req.body;
  
  if (!book_id || !user_id || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  
  const query = "INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)";
  db.query(query, [book_id, user_id, rating, comment], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).json({ message: "Review added", id: results.insertId });
  });
});

//PUT - Update a review
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  
  if (!rating) {
    return res.status(400).json({ message: "Rating is required" });
  }
  
  const query = "UPDATE reviews SET rating = ?, comment = ? WHERE id = ?";
  db.query(query, [rating, comment, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    res.json({ message: "Review updated" });
  });
});

//DELETE - Delete a review
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  const query = "DELETE FROM reviews WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    res.json({ message: "Review deleted" });
  });
});

module.exports = router;
