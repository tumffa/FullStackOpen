const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    try {
      const blogs = await Blog.find({})
      response.json(blogs)
    } catch (error) {
      response.status(500).json({ error: 'Something went wrong' })
    }
  })

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
    })

module.exports = blogsRouter