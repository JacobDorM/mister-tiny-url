// import { utilService } from './utilService'
// import { storageService } from './async-storage-service.js'
import { UserCred } from '../models'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const authService = {
  getLoggedinUser,
  getLoggedinUserAfterAppClosed,
  signup,
  login,
  logout,
}

async function signup(userCred: UserCred) {
  const user = await httpService.post('auth/signup', userCred)
  return user
  // return _saveLocalUser(user)
}

async function login(userCred: UserCred) {
  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
  return
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // socketService.emit('unset-user-socket')
  return await httpService.post('auth/logout')
}

function _saveLocalUser(user: UserCred) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

async function getLoggedinUserAfterAppClosed() {
  const user = await httpService.get('auth/loggedinuser')
  if (user) return _saveLocalUser(user)
  return
}
