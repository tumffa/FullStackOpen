import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
      return sortAnecdotes([...state, action.payload])
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})

export const { voteAnecdote, newAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdoteObject = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newAnecdoteObject))
  }
}

export const vote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer