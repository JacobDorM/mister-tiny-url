const express = require('express')
const { login, signup, logout, getLoggedinUser } = require('./auth.controller')
const router = express.Router()

router.get('/loggedinuser', getLoggedinUser)
router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

module.exports = router
