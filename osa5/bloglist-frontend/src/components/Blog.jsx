import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        {blog.user && blog.user.username && (
          <div>{blog.user.username}</div>
        )}
      </div>
      <div>
      {user && blog.user && blog.user.username === user.username && (
        <button onClick={handleDelete}>remove</button>
      )}
      </div>
  </div>
)}

export default Blog