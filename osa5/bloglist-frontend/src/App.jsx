import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [resultNotification, setResultNotification] = useState([null, true])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setResultNotification([`welcome ${user.name}`, true])
      resetNotification()
    }
    catch (exception) {
      console.log('wrong credentials')
      setResultNotification(['wrong username or password', false])
      resetNotification()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setResultNotification([`logged out`, true])
    resetNotification()
  }

  const handleAddBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setResultNotification([`a new blog ${blog.title} by ${blog.author} added`, true])
      resetNotification()
    }
    catch (exception) {
      error = blog.error
      console.log('error adding blog', error)
      setResultNotification([error, false])
      resetNotification()
    }
  }

  const resetNotification = () => {
    setTimeout(() => {
      setResultNotification([null, true])
    }, 3000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={resultNotification[0]} error={resultNotification[1]} />
        <LoginForm 
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword} 
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={resultNotification[0]} error={resultNotification[1]} />
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <AddBlogForm 
          handleAddBlog={handleAddBlog}
          newBlog={newBlog} 
          setNewBlog={setNewBlog} 
        />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App