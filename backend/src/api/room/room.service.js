const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  getByEmail,
  remove,
  update,
  add,
  addMsg,
}

async function query() {
  try {
    const collection = await dbService.getCollection('room')
    var rooms = await collection.find({}).toArray()
    rooms = rooms.map((room) => {
      delete room.password
      return room
    })
    return rooms
  } catch (err) {
    logger.error('cannot find rooms', err)
    throw err
  }
}

async function getById(roomId) {
  try {
    const collection = await dbService.getCollection('room')
    const room = await collection.findOne({ _id: ObjectId(roomId) })
    return room
  } catch (err) {
    logger.error(`while finding room by id: ${roomId}`, err)
    throw err
  }
}
async function getByEmail(email) {
  try {
    const collection = await dbService.getCollection('room')
    const room = await collection.findOne({ email })
    return room
  } catch (err) {
    logger.error(`while finding room by email: ${email}`, err)
    throw err
  }
}

async function remove(roomId) {
  try {
    const collection = await dbService.getCollection('room')
    await collection.deleteOne({ _id: ObjectId(roomId) })
  } catch (err) {
    logger.error(`cannot remove room ${roomId}`, err)
    throw err
  }
}

async function update(room) {
  try {
    // peek only updatable properties
    const roomToSave = {
      _id: ObjectId(room._id), // needed for the returnd obj
      name: room.name,
      msgs: room.msgs,
    }
    const collection = await dbService.getCollection('room')
    await collection.updateOne({ _id: roomToSave._id }, { $set: roomToSave })
    return roomToSave
  } catch (err) {
    logger.error(`cannot update room ${room._id}`, err)
    throw err
  }
}

async function add(room) {
  try {
    // peek only updatable fields!
    const roomToAdd = {
      name: room.name,
      msgs: room.msgs,
    }
    const collection = await dbService.getCollection('room')
    const { ops } = await collection.insertOne(roomToAdd)
    return ops[0]
  } catch (err) {
    logger.error('cannot insert room', err)
    throw err
  }
}

async function addMsg(roomId, msg) {
  logger.info(`New addMsg for socket [roomId: ${roomId}], msg ${msg}`)
  const room = await getById(roomId)
  room.msgs = room.msgs || []
  room.msgs.push(msg)
  update(room)
}
