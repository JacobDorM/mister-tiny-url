import express from 'express'
import { login, signup, logout, getLoggedinUser }  from './auth.controller'
const router = express.Router()

router.get('/loggedinuser', getLoggedinUser)
router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

export default router
