const logger = require('../../services/logger.service')
const urlService = require('./url.service')

async function getUrls(req, res) {
  try {
    const urls = await urlService.query()
    res.send(urls)
  } catch (err) {
    logger.error('Cannot get urls', err)
    res.status(500).send({ err: 'Failed to get urls' })
  }
}

async function getUrl(req, res) {
  try {
    const url = await urlService.getByPointer(req.params.id)
    res.send(url)
  } catch (err) {
    logger.error('Cannot get url', err)
    res.status(500).send({ err: 'Failed to get url' })
  }
}

async function addUrl(req, res) {
  try {
    let url = req.body
    url = await urlService.add(url)
    res.send(url)
  } catch (err) {
    logger.error('Failed to add url', err)
    res.status(500).send({ err: 'Failed to add url' })
  }
}

module.exports = {
  getUrls,
  getUrl,
  addUrl,
}
