import { Dispatch } from 'redux'
import { UserCred } from '../../models'
import { authService } from '../../services/authService'

export function signup(userCred: UserCred) {
  return async () => {
    try {
      await authService.signup(userCred)
    } catch (err) {
      console.log(`couldn't signup: ${err}`)
    }
  }
}

export function login(userCred: UserCred) {
  return async (dispatch: Dispatch) => {
    try {
      const user = await authService.login(userCred)
      dispatch({ type: 'SET_LOGGEDIN_USER', user })
    } catch (err) {
      console.log(`couldn't signup: ${err}`)
    }
  }
}

export function logout() {
  return async (dispatch: Dispatch) => {
    try {
      await authService.logout()
      dispatch({ type: 'SET_LOGGEDIN_USER', user: null })
    } catch (err) {
      console.log(`couldn't signup: ${err}`)
    }
  }
}

export function getLoggedinUserAfterAppClosed() {
  return async (dispatch: Dispatch) => {
    try {
      const user = await authService.getLoggedinUserAfterAppClosed()
      dispatch({ type: 'SET_LOGGEDIN_USER', user })
    } catch (err) {
      console.log(`couldn't signup: ${err}`)
    }
  }
}
