import { Msg } from '.'

export interface UserCred {
  _id?: string
  name?: string
  email: string
  password: string
  msgs: Msg[] | []
}

export interface User {
  _id: string
  name: string
  email: string
  msgs: Msg[] | []
}

export interface UsersState {
  users: null | UserCred[]
}

export enum UsersActionTypes {
  SET_USERS = 'SET_USERS',
}

// export type UserAction = UserCred
interface SetUsersAction {
  type: UsersActionTypes.SET_USERS
  users: UserCred[]
}

export type UsersActions = SetUsersAction
