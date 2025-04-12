const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//db connection
const db = mysql.createConnection({
  host: "sql5.freesqldatabase.com",
  user: "sql5772815",
  password: "4m6lfYdhp4",
  database: "sql5772815",
  port: 3306,
});

db.connect((err) => {
  err ? console.log("db connection failed😞😞😞", err) : console.log("db connected😄😄😃");
});

//Read
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    err ? console.log("Error fetching data from db", err) : res.json(data);
  });
});
//create
app.post("/add", (req, res) => {
  const { title, description, cover } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const sql = "INSERT INTO books (title, description, cover) VALUES (?, ?, ?)";
  const values = [title, description, cover];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Book added successfully", bookId: result.insertId });
  });
});

//delete
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("DELETE FROM books WHERE id = ?", [bookId], (err, result) => {
    if (err) res.json(err);
    else res.json({ message: "Book deleted successfully!" });
  });
});

//update
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const { title, description, cover } = req.body;
  const sql = "UPDATE books SET title=?, description=?, cover=? WHERE id=?";
  db.query(sql, [title, description, cover, bookId], (err, result) => {
    if (err) res.json(err);
    else res.json({ message: "Book updated successfully!" });
  });
});

app.listen(3000);
