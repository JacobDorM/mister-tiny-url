const roomService = require('./room.service')
const logger = require('../../services/logger.service')
const { broadcast } = require('../../services/socket.service')
// const authService = require('../../api/auth/auth.service')
const asyncLocalStorage = require('../../services/als.service')

async function getRoom(req, res) {
  try {
    const room = await roomService.getById(req.params.id)
    res.send(room)
  } catch (err) {
    logger.error('Failed to get room', err)
    res.status(500).send({ err: 'Failed to get room' })
  }
}

async function getRooms(req, res) {
  try {
    const rooms = await roomService.query()
    res.send(rooms)
  } catch (err) {
    logger.error('Failed to get rooms', err)
    res.status(500).send({ err: 'Failed to get rooms' })
  }
}

async function deleteRoom(req, res) {
  try {
    const roomId = req.params.id
    await roomService.remove(roomId)
    const { userId } = asyncLocalStorage.getStore()
    broadcast({ type: 'delete-room', data: roomId, userId })
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    logger.error('Failed to delete room', err)
    res.status(500).send({ err: 'Failed to delete room' })
  }
}

async function updateRoom(req, res) {
  try {
    const room = req.body
    const savedRoom = await roomService.update(room)
    const { userId } = asyncLocalStorage.getStore()
    broadcast({ type: 'save-room', data: savedRoom, userId })
    res.send(savedRoom)
  } catch (err) {
    logger.error('Failed to update room', err)
    res.status(500).send({ err: 'Failed to update room' })
  }
}

async function addRoom(req, res) {
  const room = req.body
  try {
    const addedRoom = await roomService.add(room)
    const { userId } = asyncLocalStorage.getStore()
    broadcast({ type: 'save-room', data: addedRoom, userId })
    res.json(addedRoom)
  } catch (err) {
    logger.error('Failed to add room', err)
    res.status(500).send({ err: 'Failed to update room' })
  }
}

module.exports = {
  getRoom,
  getRooms,
  deleteRoom,
  updateRoom,
  addRoom,
}
