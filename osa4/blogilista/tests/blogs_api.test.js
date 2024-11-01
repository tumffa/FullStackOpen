const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'FSO',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/',
        likes: 10
    },
    {
        title: 'Containers',
        author: 'Jami Kousa',
        url: 'https://fullstackopen.com/en/part12',
        likes: 5
    }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body.map(({ id, ...rest }) => rest)
  
  assert.deepStrictEqual(blogs, initialBlogs)
})

test('returned blog has string id value', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.ok(blog.id)
  assert.strictEqual(typeof blog.id, 'string')
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: 'New blog',
    author: 'Author',
    url: 'https://newblog.com/',
    likes: 0
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body
  assert.strictEqual(blogs.length, initialBlogs.length + 1)
})

after(async () => {
  await mongoose.connection.close()
})