const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login } = require('./helper')

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
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.waitForSelector('[data-testid="title-input"]', { state: 'visible' })
      await page.getByTestId('title-input').fill('test title')
      await page.getByTestId('author-input').fill('test author')
      await page.getByTestId('url-input').fill('test url')
      await page.getByTestId('submit-form-button').click()
      await expect(page.getByText('a new blog test title by test author added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.waitForSelector('[data-testid="title-input"]', { state: 'visible' })
      await page.getByTestId('title-input').fill('test title')
      await page.getByTestId('author-input').fill('test author')
      await page.getByTestId('url-input').fill('test url')
      await page.getByTestId('submit-form-button').click()
      await page.getByText('test title').locator('..').getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })
  })
})