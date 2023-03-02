const logger = require('../services/logger.service')
const authService = require('../api/auth/auth.service')

async function log(req, res, next) {
  if (!req?.session?.loginToken) return next()
  const loggedinUser = authService.validateToken(req.session.loginToken)
  if (loggedinUser) {
    logger.info('Req from: ' + loggedinUser.name)
  }
  next()
}

module.exports = {
  log,
}
