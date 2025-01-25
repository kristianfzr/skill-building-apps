# Task Manager

A simple task manager application with a backend built using Express and a frontend built using React and Vite.

![image](https://github.com/user-attachments/assets/86a8a35f-3c26-4429-b18c-a69f4bcf27ae)


## Features

- Add tasks
- View tasks
- Update tasks
- Delete tasks
- Mark tasks as complete

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/kristianfzr/skill-building-apps
   cd /skill-building-apps/task-manager
   ```
   
2. Install dependencies for the app.

   ```sh
   cd backend
   npm install
   cd ../client
   npm install
   ```
   
## Running the Application:

1. Start the backend server:

  ```sh
  npm run start-backend
  ```
- Endpoint: `http://localhost:5000`

2. Start the client:

  ```sh
  npm run start-client
  ```
- Endpoint: `http://localhost:5173/`

3. Run both:

  ```sh
  npm rn start-app
  ```
  
## Project Structure
  ```sh
  task-manager/
  ├── backend/
  │   ├── routes/
  │   │   └── tasks.js
  │   ├── server.js
  │   └── package.json
  ├── client/
  │   ├── src/
  │   │   ├── App.jsx
  │   │   ├── App.css
  │   │   └── main.jsx
  │   ├── index.html
  │   └── package.json
  ├── package.json
  └── README.md
  ```
## API Endpoints

- Fetch all tasks:
`GET /tasks`

- Add a new task:
`POST /tasks`
-- Request Body:
   ```sh
   {
     "task": "Your task description"
   }
   ```

- Update task by ID:
`PUT /tasks/:id`
-- Request Body:
   ```sh
   {
     "task": "Your task description"
   }
   ```
   
- Delete task by ID:
`DELETE /tasks/:id`

## License
This project is licensed under the MIT License.

## README
This `README.md` file provides an overview of the project, installation instructions, how to run the application, and the project structure.
