const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getRoom, getRooms, deleteRoom, updateRoom, addRoom } = require('./room.controller')
const { log } = require('../../middlewares/logger.middleware')
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', log, requireAuth, getRooms)
router.get('/:id', log, requireAuth, getRoom)
router.put('/', log, requireAuth, updateRoom)
router.post('/', log, requireAuth, addRoom)
router.delete('/:id', log, requireAuth, deleteRoom)

module.exports = router
