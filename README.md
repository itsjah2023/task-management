This is a simple Task Management Web App built using Node.js, Express, EJS, and CSS. It allows users to:

    View a list of tasks.

    Add new tasks.

    Mark tasks as complete.

    Delete tasks.

All task data is stored locally in memory.

Features

    Add Tasks: Users can add tasks with a title and optional description.

    Toggle Completion: Users can mark tasks as complete or incomplete.

    Delete Tasks: Users can delete tasks they no longer need.

    Dynamic Rendering: The app uses EJS templates to render pages dynamically on the server.

    Styling: The app is styled using CSS for a clean and user-friendly interface.

    How to Run the App


    

    Install Dependencies:
    Run the following command to install the required dependencies:
    

    npm install

    Start the Server:
    
    Run the following command to start the Express server:
    

    npm start

    Access the App:
    Open your browser and navigate to:
       http://localhost:3000

Project Structure


task-manager/
├── server.js          # Main server file
├── views/
│   └── index.ejs      # EJS template for the main page
├── public/
│   └── styles.css     # CSS file for styling
├── README.md          # This file
└── package.json       # Node.js project file

Routes

    GET /: Displays the main page with the list of tasks and a form to add new tasks.

    POST /add-task: Handles form submissions to add a new task.

    POST /toggle-task/:id: Toggles the completion status of a task.

    POST /delete-task/:id: Deletes a task by its ID.




