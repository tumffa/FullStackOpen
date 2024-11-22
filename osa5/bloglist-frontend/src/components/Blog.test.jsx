import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library'
  }

  const mockHandleLike = vi.fn()
  const mockHandleDelete = vi.fn()
  const user = { username: 'testuser' }

  render(
  <Blog 
    blog={blog} 
    handleLike={mockHandleLike} 
    handleDelete={mockHandleDelete}
    user={user}
    />
  )

  expect(
    screen.getByText(
      'Component testing is done with react-testing-library'
    )
  ).toBeDefined()
})