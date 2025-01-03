import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, voteAnecdote } from './requests'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [, notificationDispatch] = useContext(NotificationContext)

  const votedAnecdoteMutation = useMutation({ 
    mutationFn: (anecdote) => voteAnecdote(anecdote),
    onSuccess: (anecdote) => {
      notificationDispatch({ type: 'SET', value: `anecdote '${anecdote.content}' voted` })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }, 5000)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    votedAnecdoteMutation.mutate(votedAnecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data || []

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
