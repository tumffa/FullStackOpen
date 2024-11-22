import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Tester',
  url: 'http://localhost',
  likes: 5,
}

const mockHandleLike = vi.fn()
const mockHandleDelete = vi.fn()
const testUser = { username: 'testuser' }

test('renders content', () => {
  render(
  <Blog 
    blog={blog} 
    handleLike={mockHandleLike} 
    handleDelete={mockHandleDelete}
    user={testUser}
    />
  )

  expect(
    screen.findByText(
      'Component testing is done with react-testing-library'
    )
  ).toBeDefined()
})

test('renders full content when view button is clicked', () => {
  render(
    <Blog
      blog={blog}
      handleLike={mockHandleLike}
      handleDelete={mockHandleDelete}
      user={testUser}
    />
  )

  const button = screen.getByText('view')
  userEvent.click(button)

  expect(screen.findByText(
    'Component testing is done with react-testing-library'
  )).toBeDefined()
  expect(screen.findByText('Tester')).toBeDefined()
  expect(screen.findByText('http://localhost')).toBeDefined()
  expect(screen.findByText('likes 5')).toBeDefined()
  expect(screen.findByText('testuser')).toBeDefined()
})