const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

async function query() {
  try {
    const collection = await dbService.getCollection('url')
    const urls = await collection.find({}).toArray()
    return urls
  } catch (err) {
    logger.error('cannot find urls', err)
    throw err
  }
}

async function getByPointer(urlPointer) {
  try {
    const collection = await dbService.getCollection('url')
    const url = await collection.findOne({ pointer: urlPointer })
    return url
  } catch (err) {
    logger.error('cannot find url', err)
    throw err
  }
}

async function add(url) {
  try {
    const collection = await dbService.getCollection('url')
    const addedUrl = await collection.insertOne(url)
    return addedUrl.ops[0]
  } catch (err) {
    logger.error('cannot insert url', err)
    throw err
  }
}

module.exports = {
  query,
  getByPointer,
  add,
}
