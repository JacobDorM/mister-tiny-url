const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
  const { email, password } = req.body
  try {
    const user = await authService.login(email, password)
    logger.info('User login: ', user)
    const loginToken = authService.getLoginToken(user)
    req.session.loginToken = loginToken
    res.json(user)
  } catch (err) {
    logger.error('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req, res) {
  try {
    const credentials = req.body
    // Never log passwords - means don't log credentials
    const account = await authService.signup(credentials)
    logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
  } catch (err) {
    logger.error('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req, res) {
  try {
    req.session.destroy()
    res.send({ msg: 'Logged out successfully' })
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}

async function getLoggedinUser(req, res) {
  try {
    if (!req?.session?.loginToken) return res.status(401).send('loggedinUser does not exist')
    const loggedinUser = authService.validateToken(req.session.loginToken)
    res.json(loggedinUser)
  } catch (err) {
    res.status(500).send({ err: 'Failed to getLoggedinUser' })
  }
}

module.exports = {
  login,
  signup,
  logout,
  getLoggedinUser,
}
