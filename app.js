const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes

// app.get('/hello', (req, res) => {
//     res.send('Task Manager App')
// })

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port,  console.log(`Server is listening to port ${port}...`))
    } catch (err) {
        console.log(err)
    }
}

start()

