import { UserActionTypes, UserActions, UserState } from '../../models'
import { authService } from '../../services/authService'

const INITIAL_STATE: UserState = {
  loggedinUser: authService.getLoggedinUser(),
}

export function authReducer(state = INITIAL_STATE, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.SET_LOGGEDIN_USER:
      return {
        ...state,
        loggedinUser: action.user,
      }

    default:
      return state
  }
}
