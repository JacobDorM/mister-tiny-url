import { Msg } from './msgType'

export interface Room {
  _id: string
  name: string
  msgs: Msg[] | []
}

export interface RoomsState {
  rooms: Room[] | []
  isLoading: boolean
  error: string
}

export enum RoomsActionTypes {
  SET_ROOMS = 'SET_ROOMS',
  SET_ROOMS_LOADING = 'SET_ROOMS_LOADING',
  SET_ROOMS_FAILURE = 'SET_ROOMS_FAILURE',
  ADD_ROOM = 'ADD_ROOM',
  UPDATE_ROOM = 'UPDATE_ROOM',
  REMOVE_ROOM = 'REMOVE_ROOM',
}

interface SetRoomsAction {
  type: RoomsActionTypes.SET_ROOMS
  rooms: Room[]
}

interface SetRoomsLoadingAction {
  type: RoomsActionTypes.SET_ROOMS_LOADING
  isLoading: boolean
}

interface SetRoomsFailureAction {
  type: RoomsActionTypes.SET_ROOMS_FAILURE
  error: string
}

interface AddRoomAction {
  type: RoomsActionTypes.ADD_ROOM
  room: Room
}

interface UpdateRoomAction {
  type: RoomsActionTypes.UPDATE_ROOM
  room: Room
}

interface RemoveRoomAction {
  type: RoomsActionTypes.REMOVE_ROOM
  roomId: string
}

export type RoomsActions =
  | SetRoomsAction
  | AddRoomAction
  | UpdateRoomAction
  | RemoveRoomAction
  | SetRoomsLoadingAction
  | SetRoomsFailureAction
