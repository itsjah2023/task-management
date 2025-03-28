import { query } from "../config/db.js";

export const getAllTask = async () => {
 try {
   const result = await query("SELECT username, email FROM task");
   return result.rows;
 } catch (error) {
   console.error("Error fetching task:", error);
   throw error;
 }
};

export const addTask = async (name, description) => {
    try {
      const result = await query(
        "INSERT INTO signups (name , description) VALUES ($1, $2) RETURNING *",
        [name, description]
      );
      return result.rows[0];
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
   };

   
   
