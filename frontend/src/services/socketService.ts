import { DefaultEventsMap } from '@socket.io/component-emitter'
import io, { Socket } from 'socket.io-client'
import { authService } from './authService'

export const SOCKET_EVENT_SAVE_ROOM = 'save-room'
export const SOCKET_EVENT_DELETE_ROOM = 'delete-room'
export const SOCKET_EVENT_ROOM_CHAT_ADD_MSG = 'room-chat-add-msg'
export const SOCKET_EVENT_USER_CHAT_ADD_MSG = 'user-chat-add-msg'

export const SOCKET_USER_TYPING = 'user-typing'
export const SOCKET_PRIVATE_USER_TYPING = 'private-user-typing'

const SOCKET_EMIT_LOGIN = 'set-user-socket'
const SOCKET_EMIT_LOGOUT = 'unset-user-socket'
export const SOCKET_EMIT_USER_WATCH = 'user-watch'
export const SOCKET_EMIT_SET_TOPIC = 'chat-set-topic'
export const SOCKET_EMIT_SET_RECIPIENT = 'chat-set-recipient'
export const SOCKET_EMIT_SEND_PRIVATE_MSG = 'send-private-msg'
export const SOCKET_EMIT_ROOM_CHAT_SEND_MSG = 'room-chat-send-msg'

const baseUrl = process.env.NODE_ENV === 'production' ? '' : '//localhost:3030'
export const socketService = createSocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()

function createSocketService() {
  var socket: null | Socket<DefaultEventsMap, DefaultEventsMap> = null
  const socketService = {
    setup() {
      socket = io(baseUrl)
      setTimeout(() => {
        const user = authService.getLoggedinUser()
        if (user) this.login(user._id)
      }, 500)
    },
    on(eventName: string, cb: any) {
      socket?.on(eventName, cb)
    },
    off(eventName: string, cb = null) {
      if (!socket) return
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName: string, data: any) {
      data = JSON.parse(JSON.stringify(data))
      socket?.emit(eventName, data)
    },
    login(userId: string) {
      socket?.emit(SOCKET_EMIT_LOGIN, userId)
    },
    logout() {
      socket?.emit(SOCKET_EMIT_LOGOUT)
    },
    terminate() {
      socket = null
    },
  }
  return socketService
}
