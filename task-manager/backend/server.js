const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const taskRouter = require('./routes/tasks')

const port = 5000
app.use(bodyParser.json())

app.use('/tasks', taskRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})