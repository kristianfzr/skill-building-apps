const express = require('express')
const router = express.Router()

let tasks = []

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasks)
})

router.post('/', (req, res) => {
    const task = req.body
    tasks.push(task)
    if(!task) {
        return res.status(400).json({ error: 'task is required' })
        }
    res.status(201).json(task)
  })

// Get a specific task by id
router.get('/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id))
    
    if(!task) {
        res.status(404).send('Task not found')
    } 
    
    res.json(task)
})

// Create a new task
router.post('/:id', (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    tasks.push(task)
    res.json(task)
})

// Delete a task by id
router.delete('/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id))
    if(!task) {
        return res.status(404).send('Task not found')
    }
    
    const index = tasks.indexOf(task)
    tasks.splice(index, 1)
    res.json(task)
})

// Update a task by id
router.put('/:id', (req, res) => {
    const task = tasks.find(task => task.id === parseInt(req.params.id))
    
    if(!task) {
        return res.status(404).send('Task not found')
    }
    
    task.title = req.body.title
    task.description = req.body.description
    res.json(task)
})

module.exports = router