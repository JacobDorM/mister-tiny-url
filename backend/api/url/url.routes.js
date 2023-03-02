const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { addUrl, getUrl, getUrls } = require('./url.controller')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getUrls)
router.post('/', log, requireAuth, addUrl)
router.get('/:id', log, getUrl)

module.exports = router
