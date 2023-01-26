import { UserActionTypes, UserActions, UserState } from '../../models'

const INITIAL_STATE: UserState = {
  loggedinUser: null,
}

export function userReducer(state = INITIAL_STATE, action: UserActions): UserState {
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
