const login = async (page, username, password) => {
    await page.getByTestId('username-input').fill(username)
    await page.getByTestId('password-input').fill(password)
    await page.getByTestId('login-submit-button').click()
  }

export { login }