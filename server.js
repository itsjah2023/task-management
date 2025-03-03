const express = require("express");
const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));


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
  if (!title) {
    return res.status(400).send("Title is required");
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
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});