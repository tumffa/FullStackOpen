import React, { useState } from 'react'

const AddBlogForm = ({ handleAddBlog, newBlog, setNewBlog }) => {

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({
      ...newBlog,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleAddBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleChange}
          />
          <br />
          author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleChange}
          />
          <br />
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AddBlogForm