
import {
    getAllTasksFromDB,
    addTaskToDB,
    toggleTaskInDB,
    deleteTaskFromDB,
  } from "../models/models.js"; 
  
  // GET: Show all tasks
  export const getAllTask = async (req, res) => {
    try {
      const error = req.query.error;
      const tasks = await getAllTasksFromDB(); 
      res.render("index", { tasks, error });
    } catch (error) {
      res.status(500).send("An error occurred fetching tasks.");
    }
  };
  
  // POST: Add a new task
  export const addTask = async (req, res) => {
    const { title, description } = req.body;
    const tasks = await getAllTasksFromDB();
  
    if (!title || title.length < 3) {
      return res.render("index", {
        error: "Title is required and must be longer than three characters.",
        tasks,
      });
    }
  
    if (title.length > 100) {
      return res.render("index", {
        error: "Title cannot exceed 100 characters.",
        tasks,
      });
    }
  
    if (description && description.length > 500) {
      return res.render("index", {
        error: "Description cannot exceed 500 characters.",
        tasks,
      });
    }
  
    try {
      await addTaskToDB(title, description);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("An error occurred during the task creation.");
    }
  };
  
  // POST: Toggle task completion
  export const toggleTask = async (req, res) => {
    const taskId = parseInt(req.params.id);
    try {
      await toggleTaskInDB(taskId);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error toggling task.");
    }
  };
  
  // POST: Delete task
  export const deleteTask = async (req, res) => {
    const taskId = parseInt(req.params.id);
    try {
      await deleteTaskFromDB(taskId);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Error deleting task.");
    }
  };
  
