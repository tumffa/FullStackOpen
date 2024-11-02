const express = require('express')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')


const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app