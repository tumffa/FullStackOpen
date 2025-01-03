import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(a => a.id === id)
      votedAnecdote.votes++
      return sortAnecdotes(state)
    },
    newAnecdote(state, action) {
      return sortAnecdotes([...state, asObject(action.payload)])
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})

export const { voteAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer