import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks");
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
      return setError("Task cannot be empty!");
    }
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        task,
      });
      setTasks([...tasks, response.data]);
      setTask("");
      setError("");
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, {
        task: editingTask,
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, task: response.data.task } : task
        )
      );
      setEditingTaskId(null);
      setEditingTask("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const completeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            setError("");
          }}
          placeholder="Add a new task"
        />
        <button type="submit" className="button-submit">
          Add Task
        </button>
      </form>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-content">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed || false}
                onChange={() => completeTask(task.id)}
              />
              {task.id === editingTaskId ? (
                <input
                  type="text"
                  value={editingTask}
                  onChange={(e) => setEditingTask(e.target.value)}
                  placeholder="Edit task"
                />
              ) : (
                <span
                  className={`task-text ${task.completed ? "task-complete" : ""}`}
                >
                  {task.task}
                </span>
              )}
            </div>
            {task.id === editingTaskId ? (
              <button
                className="button-update"
                onClick={() => updateTask(task.id)}
              >
                Save
              </button>
            ) : (
              <>
                <button
                  className="button-update"
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditingTask(task.task);
                  }}
                >
                  Update
                </button>
                <button
                  className="button-delete"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
