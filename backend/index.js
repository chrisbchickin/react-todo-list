import express, { response } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "101808(Jla)02678901",
  database: "todos_db",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the backend!");
});

app.get("/todos", (req, res) => {
  const q = "SELECT * FROM todos";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/todos", (req, res) => {
  const q = "INSERT INTO todos (`title`, `completed`) VALUES (?)";
  const values = [req.body.title, req.body.completed];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    console.log("todo has been created successfully!");
    return res.json(data);
  });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  const q = `DELETE FROM todos WHERE id = ?`;
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);

    console.log(`todo with id ${id} has been deleted successfully!`);
    res.json({ message: "todo deleted successfully!" });
  });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;

  const q = `UPDATE todos SET completed = ? WHERE id = ?;`;
  db.query(q, [completed, id], (err, data) => {
    if (err) return res.json(err);

    console.log(`todo with id ${id} has been updated successfully!`);
    res.json({ message: "todo updated successfully!" });
  });
});

app.listen(3303, () => {
  console.log("Connected to backend!");
});
