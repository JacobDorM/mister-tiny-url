// import { utilService } from './utilService'
// import { storageService } from './async-storage-service.js'
// import { UserCred } from '../models'
import { httpService } from './http.service'

export const userService = {
  getUsers,
  // getById,
  // remove,
  // update,
}

function getUsers() {
  // return storageService.query('user')
  return httpService.get(`user`)
}

// async function getById(userId) {
//   // const user = await storageService.get('user', userId)
//   const user = await httpService.get(`user/${userId}`)
//   // gWatchedUser = user
//   return user
// }
// function remove(userId) {
//   // return storageService.remove('user', userId)
//   return httpService.delete(`user/${userId}`)
// }

// async function update(user) {
//   // await storageService.put('user', user)
//   user = await httpService.put(`user/${user._id}`, user)
//   // Handle case in which admin updates other user's details
//   if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
//   return user
// }
