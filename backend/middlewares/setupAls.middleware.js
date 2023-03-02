const authService = require('../api/auth/auth.service')
const asyncLocalStorage = require('../services/als.service')

async function setupAsyncLocalStorage(req, res, next) {
  const storage = {}
  asyncLocalStorage.run(storage, () => {
    if (!req?.session?.loginToken) return next()
    const loggedinUser = authService.validateToken(req.session.loginToken)
    if (loggedinUser) {
      const alsStore = asyncLocalStorage.getStore()
      alsStore.userId = loggedinUser._id
    }
    next()
  })
}

module.exports = setupAsyncLocalStorage
