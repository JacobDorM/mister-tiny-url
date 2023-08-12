import { UserCred } from '../types'
import { httpService } from './httpService'
import { socketService } from './socketService'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const ENDPOINT = 'auth'

export const authService = {
  getLoggedinUser,
  signup,
  login,
  logout,
}

async function signup(userCred: UserCred) {
  return httpService.post<UserCred>(`${ENDPOINT}/signup`, userCred)
}

async function login(userCred: UserCred) {
  const user = await httpService.post<UserCred>(`${ENDPOINT}/login`, userCred)
  if (user && user._id) {
    socketService.login(user._id)
    return _saveLocalUser(user)
  }
  return
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  socketService.logout()
  return httpService.post<UserCred>(`${ENDPOINT}/logout`)
}

function _saveLocalUser(user: UserCred) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}
