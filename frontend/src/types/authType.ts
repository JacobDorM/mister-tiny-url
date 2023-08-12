interface LoggedinUser {
  _id?: string
  name?: string
  email: string
  password?: string
}

export interface AuthState {
  loggedinUser: null | LoggedinUser
}

export enum AuthActionTypes {
  SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER',
}

interface SetLoggedinUserAction {
  type: AuthActionTypes.SET_LOGGEDIN_USER
  user: LoggedinUser
}

export type AuthActions = SetLoggedinUserAction
