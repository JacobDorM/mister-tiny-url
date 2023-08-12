const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service.js')
const urlService = require('./url.service')

class Url {
  constructor(pointer, shortUrl, longUrl) {
    this.pointer = pointer
    this.shortUrl = shortUrl
    this.longUrl = longUrl
  }

  printIt() {
    console.log('print It')
  }
}

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
    const pointer = utilService.makeId()
    let url = new Url(pointer, `http://localhost:3000/#/tinyurl/${pointer}`, req.body.longUrl)
    url = await urlService.add(url)
    res.json(url)
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
