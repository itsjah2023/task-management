
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import { getAllTask , addTask , toggleTask , deleteTask  } from "./controllers/controllers.js";



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
app.get("/", getAllTask );

app.post("/add-task", addTask );

app.post("/toggle-task/:id", toggleTask);

app.post("/delete-task/:id", deleteTask);

// Start the server
const port = process.env.PORT || 5000;
connectToDatabase();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});