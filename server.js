
import express from "express";
import cors from "cors";
import pool from "./config/db.js";


import { connectToDatabase } from "./config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.set("view engine", "ejs");

// Serve static files (CSS)
app.use(express.static("public"));

// In-memory task storage
let tasks = [];
let idCounter = 1;

// Routes
app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/add-task", (req, res) => {
  const { title, description } = req.body;
  
  // Validation checks
  if (!title.trim()) {
    return res.render("index", { tasks, error: "Title is required." });
  }
  if (title.length < 3 || title.length > 100) {
    return res.render("index", { tasks, error: "Title must be under 100 characters." });
  }
  if (description && description.length > 500) {
    return res.render("index", { tasks, error: "Description must be under 500 characters." });
  }

  
  const newTask = {
    id: idCounter++,
    title,
    description: description || "",
    completed: false,
  };
  tasks.push(newTask);
  res.redirect("/");
});

app.post("/toggle-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).send("Task not found");
  }
  task.completed = !task.completed;
  res.redirect("/");
});

app.post("/delete-task/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.redirect("/");
});

// Start the server
const port = process.env.PORT || 5000;
connectToDatabase();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});