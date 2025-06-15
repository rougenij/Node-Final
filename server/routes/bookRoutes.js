const express = require("express");
const router = express.Router();
const db = require("../db/dbSingleton").getConnection();
const { isAdmin } = require("../middleware/auth");

//GET
router.get("/", (req, res) => {
  const query = "SELECT * from books";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * from books where id=?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (results.length === 0)
      res.status(404).json({ message: "Book not found" });
    res.json(results);
  });
});

//POST
router.post("/", (req, res) => {
  const { title, author, description } = req.body;
  const query = "INSERT INTO books (title,author,description) VALUES (?,?,?)";
  db.query(query, [title, author, description], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Book added", id: results.insertId });
  });
});

//PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;
  const query = "UPDATE books SET title=?, author=?, description=? WHERE id=?";
  db.query(query, [title, author, description, id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Book updated" });
  });
});

//DELETE
router.delete("/:id", isAdmin, (req, res) => {
  const { id } = req.params;
  const query = "DELETE from books WHERE id=?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "Book deleted" });
  });
});

module.exports = router;
