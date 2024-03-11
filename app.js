const express = require ('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

app.use(express.json({ extended: true}))

// app.use('/' , require('./routes/task.routes'))

const PORT = config.get('port') || 5000

async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => console.log(`App has been started on ${PORT} port`))
    } catch (e) {
        console.log(`Server erorr ${e.message}`)
        process.exit(1)
    }
}

start()