export const getAllTask = async (req, res) => {
    try {
      const signups = await getAllTask();
      res.json(task);
    } catch (error) {
      res.status(500).send("An error occurred fetching task.");
    }
   };
   
   export const postTask = async (req, res) => {

    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).send("Name and description are required.");
    }
    try {
      const newTask = await addSignup(name, email);
      res.render("thankyou", { title: "Thank You", ...newTask });
    } catch (error) {
      if (error.code === "23505") {
         return res.status(400).send("A task is already added.");
      }
      res.status(500).send("An error occurred during task.");
    }
   };
   
