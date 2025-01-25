const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const taskRouter = require('./routes/tasks')

const port = 5000
app.use(bodyParser.json())
app.use(cors())
app.use('/tasks', taskRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})