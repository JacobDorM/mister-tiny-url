import { UsersActionTypes, UsersActions, UsersState } from '../../types'

const INITIAL_STATE: UsersState = {
  users: null,
}

export function userReducer(state = INITIAL_STATE, action: UsersActions): {} {
  switch (action.type) {
    case UsersActionTypes.SET_USERS:
      return {
        ...state,
        users: action.users,
      }

    default:
      return state
  }
}
