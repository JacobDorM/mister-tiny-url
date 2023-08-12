import express from 'express'
import  { requireAuth } from '../../middlewares/requireAuth.middleware'
import  { getRoom, getRooms, deleteRoom, updateRoom, addRoom } from './room.controller'
import { log } from '../../middlewares/logger.middleware'
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', log, requireAuth, getRooms)
router.get('/:id', log, requireAuth, getRoom)
router.put('/', log, requireAuth, updateRoom)
router.post('/', log, requireAuth, addRoom)
router.delete('/:id', log, requireAuth, deleteRoom)

export default router
