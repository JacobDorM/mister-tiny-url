import { AuthActionTypes, AuthActions, AuthState } from '../../types'
import { authService } from '../../services/authService'

const INITIAL_STATE: AuthState = {
  loggedinUser: authService.getLoggedinUser(),
}

export function authReducer(state = INITIAL_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.SET_LOGGEDIN_USER:
      return {
        ...state,
        loggedinUser: action.user,
      }

    default:
      return state
  }
}
