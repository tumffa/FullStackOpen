import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmitAnecdote = async (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(setTimedNotification(`created anecdote: '${event.target.anecdote.value}'`, 5))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmitAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
