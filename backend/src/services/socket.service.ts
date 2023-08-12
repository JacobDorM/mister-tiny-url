import logger from './logger.service'
import { Server } from 'http';
import SocketIO,{ RemoteSocket, Socket,} from 'socket.io';
import roomService from'../api/room/room.service'
import { DisconnectReason } from 'socket.io/dist/socket';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
interface Msg {
  _id: string
  txt: string
  byUser: string
}

let gIo: SocketIO.Server

interface CustomSocket extends Socket {
  id: string;
  userId?: string;
  myTopic?: string;
  myRecipient?: string;
}

// interface CustomRemoteSocket extends RemoteSocket<DefaultEventsMap, any> {
// brodcast: any
// }



export function setupSocketAPI(http: Server) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
    },
  })

  gIo.on('connection', (socket: CustomSocket) => {
    logger.info(`New connected socket [id: ${socket.id}]`)
    socket.userId = socket.id
    socket.on('disconnect', (reason) => {
      logger.info(`Socket disconnected [id: ${socket.id}], reason: ${reason}`)
    })

    socket.on('chat-set-topic', (topic: string) => {
      if (socket.myTopic === topic) return
      if (socket.myTopic) {
        socket.leave(socket.myTopic)
        logger.info(`Socket is leaving topic ${socket.myTopic} [id: ${socket.id}]`)
      }
      socket.join(topic)
      socket.myTopic = topic
    })

    socket.on('chat-set-recipient', (recipientId: string) => {
      if (socket.myRecipient === recipientId) return
      socket.myRecipient = recipientId
      logger.info(`Socket is get new recipient: ${socket.myRecipient} [id: ${socket.id}]`)
      // if (socket.myRecipient) {
      //   // socket.leave(socket.myRecipient)
      //   socket.myRecipient = recipientId
      //   logger.info(`Socket is get new recipient: ${socket.myRecipient} [id: ${socket.id}]`)
      //   // logger.info(`Socket is leaving topic ${socket.myRecipient} [id: ${socket.id}]`)
      // }
      // socket.join(recipientId)
      // socket.myRecipient = recipientId
    })

    socket.on('room-chat-send-msg', (msg: Msg) => {
      logger.info(`New chat msg from socket [id: ${socket.id}], emitting to topic ${socket.myTopic}`)
      // emits to all sockets:
      // gIo.emit('chat addMsg', msg)
      // emits only to sockets in the same room
     socket.myTopic && gIo.to(socket.myTopic).emit('room-chat-add-msg', msg)
      roomService.addMsg(socket.myTopic, msg)
    })

    socket.on('user-typing', (user: string) => {
      console.log(`${user} is typing...`)
      socket.myTopic && socket.userId && broadcast({ type: 'user-typing', data: user, room: socket.myTopic, userId: socket.userId })
    })

    socket.on('private-user-typing', (user: string) => {
      console.log(`${user} is typing...`)
      console.log(`socket.myRecipient: ${socket.myRecipient} `)
      socket.myRecipient && socket.to(socket.myRecipient).emit('private-user-typing', user)
      // emitToUser({ type: 'private-user-typing', data: user, userId: socket.myRecipient })
    })

    socket.on('user-watch', (userId: string) => {
      logger.info(`user-watch from socket [id: ${socket.id}], on user ${userId}`)
      socket.join('watching:' + userId)
    })
    socket.on('set-user-socket', (userId: string) => {
      logger.info(`Setting socket.userId = ${userId} for socket [id: ${socket.id}]`)
      socket.userId = userId
    })
    socket.on('unset-user-socket', () => {
      logger.info(`Removing socket.userId for socket [id: ${socket.id}]`)
      delete socket.userId
    })
  })
}

function emitTo({ type, data, label }: { type: string; data: any; label: string }) {
  if (label) gIo.to('watching:' + label).emit(type, data)
  else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }: { type: string; data: any; userId: string }) {
  const socket = await _getUserSocket(userId)

  if (socket) {
    logger.info(`Emiting event: ${type} to user: ${userId} socket [id: ${socket.id}]`)
    socket.emit(type, data)
  } else {
    logger.info(`No active socket for user: ${userId}`)
    // _printSockets()
  }
}

// If possible, send to all sockets BUT not the current socket
// Optionally, broadcast to a room / to all
async function broadcast({ type, data, room = null, userId }: { type: string; data: any; room: string | null; userId: string }) {
  logger.info(`Broadcasting event: ${type}`)
  const excludedSocket: any = await _getUserSocket(userId)
  if (room && excludedSocket) {
    logger.info(`Broadcast to room ${room} excluding user: ${userId}`)
    excludedSocket.broadcast.to(room).emit(type, data)
  } else if (excludedSocket) {
    logger.info(`Broadcast to all excluding user: ${userId}`)
    excludedSocket.broadcast.emit(type, data)
  } else if (room) {
    logger.info(`Emit to room: ${room}`)
    gIo.to(room).emit(type, data)
  } else {
    logger.info(`Emit to all`)
    gIo.emit(type, data)
  }
}

async function _getUserSocket(userId: string) {
  const sockets = await _getAllSockets()
  const socket = sockets.find((s: any) => s.userId === userId)
  return socket
}
async function _getAllSockets() {
  // return all Socket instances
  const sockets = await gIo.fetchSockets()
  return sockets
}

// async function _printSockets() {
//   const sockets = await _getAllSockets()
//   console.log(`Sockets: (count: ${sockets.length}):`)
//   sockets.forEach(socket =>_printSocket(socket))
// }
// function _printSocket(socket: Socket) {
//   console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
// }

module.exports = {
  // set up the sockets service and define the API
  setupSocketAPI,
  // emit to everyone / everyone in a specific room (label)
  emitTo,
  // emit to a specific user (if currently active in system)
  emitToUser,
  // Send to all sockets BUT not the current socket - if found
  // (otherwise broadcast to a room / to all)
  broadcast,
}
