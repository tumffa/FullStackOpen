const login = async (page, username, password) => {
  await page.getByTestId('username-input').fill(username)
  await page.getByTestId('password-input').fill(password)
  await page.getByTestId('login-submit-button').click()
}

const createBlog = async (page, title, author, url) => {
  await page.waitForSelector('[data-testid="create-new-blog-button"]', { state: 'visible' })
  await page.getByTestId('create-new-blog-button').click()
  await page.waitForSelector('[data-testid="title-input"]', { state: 'visible' })
  await page.getByTestId('title-input').fill(title)
  await page.getByTestId('author-input').fill(author)
  await page.getByTestId('url-input').fill(url)
  await page.getByTestId('submit-form-button').click()
}

module.exports = { login, createBlog }