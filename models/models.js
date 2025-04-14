// models.js
import { query } from "../config/db.js";

// ✅ Existing functions...
export const getAllTasksFromDB = async () => {
  try {
    const result = await query("SELECT id, title, description, completed FROM tasks ORDER BY id ASC");
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTaskToDB = async (title, description) => {
  if (!description || description.trim() === "") {
    description = null;
  }

  try {
    const result = await query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// ✅ NEW: Toggle task completion
export const toggleTaskInDB = async (id) => {
  try {
    const result = await query(
      "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error toggling task:", error);
    throw error;
  }
};

// ✅ NEW: Delete task
export const deleteTaskFromDB = async (id) => {
  try {
    await query("DELETE FROM tasks WHERE id = $1", [id]);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

