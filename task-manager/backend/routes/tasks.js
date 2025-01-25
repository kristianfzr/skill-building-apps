const express = require('express')
const router = express.Router()

let tasks = [] // Temporary in-memory storage

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks)
})

// Create a new task
router.post('/', (req, res) => {
    const task = { id: Date.now(), task: req.body.task }
    tasks.push(task)
    res.status(201).json(task)
})

// Get a specific task by id
router.get('/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id))
    if (!task) return res.status(404).send('Task not found')
    res.json(task)
})

// Update a task by id
router.put('/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id))
    if (!task) return res.status(404).send('Task not found')

    task.task = req.body.task // Update only the task field
    res.json(task)
})

// Delete a task by id
router.delete('/:id', (req, res) => {
    const { id } = req.params
    tasks = tasks.filter(task => task.id !== parseInt(id))
    res.status(204).send() // 204 No Content
})

module.exports = router
