const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.getByTestId('login-form')).toBeVisible()
    await expect(page.getByTestId('username-input')).toBeVisible()
    await expect(page.getByTestId('password-input')).toBeVisible()
    await expect(page.getByTestId('login-submit-button')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'mluukkai', 'wrong password')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await expect(page.getByText('a new blog test title by test author added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByText('test title').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByTestId('remove-button').click()
      await expect(page.getByText('Blog test title by test author removed')).toBeVisible()
    })

    test('remove button is only shown if user created the blog', async ({ page }) => {
      await createBlog(page, 'test title', 'test author', 'test url')
      await page.getByTestId('logout-button').click()
      await login(page, 'testuser', 'testpassword')
      await expect(page.getByTestId('remove-button')).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      createBlog(page, 'test title 1', 'test author 1', 'test url 1')
      await page.waitForSelector('text=test title 1', { state: 'visible' })
      createBlog(page, 'test title 2', 'test author 2', 'test url 2')
      await page.waitForSelector('text=test title 2', { state: 'visible' })
      createBlog(page, 'test title 3', 'test author 3', 'test url 3')
      await page.waitForSelector('text=test title 3', { state: 'visible' })

      await page.getByText('test title 2').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByText('test title 2').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByText('test title 3').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.getByRole('button', { name: 'like' }).click()

      await expect(page.locator('text=test title 3').
      locator('..').locator('text=test title 2').
      locator('..').locator('text=test title 1')).
      toBeVisible()
    })
  })
})