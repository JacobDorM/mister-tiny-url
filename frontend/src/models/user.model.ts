export interface UserCred {
  name?: string
  email: string
  password: string
}

interface LoggedinUser {
  name?: string
  email: string
  password?: string
}

export interface UserState {
  loggedinUser: null | LoggedinUser
}

export enum UserActionTypes {
  SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER',
}

// export type UserAction = UserCred
interface SetLoogedinUserAction {
  type: UserActionTypes.SET_LOGGEDIN_USER
  user: LoggedinUser
}

export type UserActions = SetLoogedinUserAction
