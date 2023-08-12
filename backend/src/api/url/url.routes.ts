import express from 'express'
import  { log } from  '../../middlewares/logger.middleware'
import  { addUrl, getUrl, getUrls } from './url.controller.js'
import { requireAuth } from  '../../middlewares/requireAuth.middleware'
const router = express.Router()

// middleware that is specific to this router
router.use(requireAuth)

router.get('/', log, getUrls)
router.post('/', addUrl)
router.get('/:id', log, getUrl)

export default  router
