const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')

function requireAuth(req, res, next) {
  if (!req?.session?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.session.loginToken)
  if (!loggedinUser) return res.status(401).send('Not Authenticated')
  next()
}

function requireAdmin(req, res, next) {
  if (!req?.session?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedinUser = authService.validateToken(req.session.loginToken)
  if (!loggedinUser.isAdmin) {
    logger.warn(loggedinUser.fullname + 'attempted to perform admin action')
    res.status(403).end('Not Authorized')
    return
  }
  next()
}

// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin,
}
