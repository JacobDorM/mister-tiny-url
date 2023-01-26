import { Dispatch } from 'redux'
// import { UserCred } from '../../models'
import { userService } from '../../services/userService'

export function loadUsers() {
  return async (dispatch: Dispatch) => {
    try {
      const users = await userService.getUsers()
      dispatch({ type: 'SET_USERS', users })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

// export function loadUser(userId) {
//   return async (dispatch, getState) => {
//     try {
//       const user = await userService.getById(userId)
//       dispatch({ type: 'SET_USER', user })
//       return user
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }

// export function removeUser(userId) {
//   return async (dispatch, getState) => {
//     try {
//       const user = await userService.remove(userId)
//       dispatch({ type: 'REMOVE_USER', userId })
//       return user
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }

// export function saveUser(user, isAdmin) {
//   return async (dispatch, getState) => {
//     try {
//       const savedUser = await userService.save(user)
//       if (isAdmin) user.id ? dispatch({ type: 'UPDATE_USER', savedUser }) : dispatch({ type: 'ADD_USER', savedUser })
//     } catch (err) {
//       console.log('err:', err)
//     }
//   }
// }

// export function setFilterBy(filterBy) {
//   return (dispatch) => {
//     dispatch({ type: 'SET_FILTER_BY', filterBy })
//   }
// }
