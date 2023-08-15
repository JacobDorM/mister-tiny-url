import { DefaultEventsMap } from '@socket.io/component-emitter'
import io, { Socket, SocketOptions } from 'socket.io-client'
import { authService } from './authService'
import { config } from '../config/config'
import { SOCKET_EMIT_LOGIN, SOCKET_EMIT_LOGOUT } from '../constants/socket/emit'

export const SOCKET_USER_TYPING = 'user-typing'
export const SOCKET_PRIVATE_USER_TYPING = 'private-user-typing'

interface SocketEventListener {
  event: string
  callback: (data: any) => void
}

class SocketService {
  private socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null
  private eventListeners: SocketEventListener[] = []

  constructor() {
    this.setup()
  }

  private setup() {
    // const auth = {
    // token: authService.getAuthToken(), // Example: Get the authentication token
    // Add other authentication-related properties as needed
    // };
    const socketOptions: SocketOptions = {
      // auth,
      retries: 5, // Limit the number of reconnection attempts
      ackTimeout: 1000, // Initial delay before reconnection attempts (in ms)
    }

    this.socket = io(config.socket.apiBaseUrl, socketOptions)

    this.addConnectionListeners()
    this.connect()
  }

  private addConnectionListeners() {
    if (this.socket) {
      // this.socket.on('connect', () => {
      //   const user = authService.getLoggedinUser()
      //   if (user) this.login(user._id)
      // })

      setTimeout(() => {
        const user = authService.getLoggedinUser()
        if (user) this.login(user._id)
      }, 500)

      this.socket.on('disconnect', () => {
        this.eventListeners.forEach((listener) => this.socket?.off(listener.event, listener.callback))
        // You can add custom handling for disconnects here
      })

      this.socket.on('reconnect', (attemptNumber: number) => {
        console.log("log reconnect attemps for user", attemptNumber)
        // Handle successful reconnection
      })

      this.socket.on('reconnect_attempt', (attemptNumber: number) => {
        console.log("log reconnect_attempt for user", attemptNumber)
        // Handle a reconnection attempt, it happens before each reconnect attemp.
      })

      this.socket.on('reconnect_error', (error: any) => {
        console.error('SocketService: Reconnection error', error)
        // Handle reconnection error
      })
    }
  }

  on(eventName: string, callback: (data: any) => void) {
    this.socket?.on(eventName, callback)
    this.eventListeners.push({ event: eventName, callback })
  }

  off(eventName: string, callback?: (data: any) => void) {
    if (!this.socket) return

    if (callback) {
      this.socket.off(eventName, callback)
      this.eventListeners = this.eventListeners.filter(
        (listener) => listener.event !== eventName || listener.callback !== callback
      )
    } else {
      this.socket.removeAllListeners(eventName)
      this.eventListeners = this.eventListeners.filter((listener) => listener.event !== eventName)
    }
  }

  connect() {
    if (this.socket && !this.socket.connected) {
      console.log("try to connect")
      this.socket.connect()
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  emit(eventName: string, data?: any) {
    if (this.socket?.connected) {
      data = JSON.parse(JSON.stringify(data));
      this.socket.emit(eventName, data);
    } else {
      console.warn(`SocketService: Cannot emit '${eventName}' event. Socket is not connected.`)
      // Handle emit when not connected
    }
  }

  login(userId: string) {
    this.emit(SOCKET_EMIT_LOGIN, userId)
  }

  logout() {
    this.emit(SOCKET_EMIT_LOGOUT)
  }

  terminate() {
    if (this.socket) {
      this.eventListeners.forEach((listener) => this.socket?.off(listener.event, listener.callback))
      this.socket.disconnect()
      this.socket = null
    }
  }
}

export const socketService = new SocketService()
