import express from 'express'
import  { requireAuth, requireAdmin } from '../../middlewares/requireAuth.middleware'
import { getUser, getUsers, deleteUser, updateUser } from  './user.controller'
import  { log } from '../../middlewares/logger.middleware'
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', log, getUsers)
router.get('/:id', log, getUser)
router.put('/:id', log, requireAuth, updateUser)
router.post('/:id', log, requireAuth, updateUser)
router.delete('/:id', log, requireAuth, requireAdmin, deleteUser)

export default router
