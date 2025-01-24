import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks')
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (!task.trim()) {
      return setError('Task cannot be empty!')
    }

    try {
      const response = await axios.post('http://localhost:5000/tasks', { task })
      setTasks([...tasks, response.data])
      setTask('')
      setError('')
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={addTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value)
            setError('')
          }}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>{task.task}</li>
        ))}
      </ol>
    </div>
  )
}

export default App