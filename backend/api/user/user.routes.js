const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser } = require('./user.controller')
const { log } = require('../../middlewares/logger.middleware')
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', log, getUsers)
router.get('/:id', log, getUser)
router.put('/:id', log, requireAuth, updateUser)
router.post('/:id', log, requireAuth, updateUser)
router.delete('/:id', log, requireAuth, requireAdmin, deleteUser)

module.exports = router
