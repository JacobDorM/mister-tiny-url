import { Dispatch } from 'redux'
import { RootState } from '..'
import { Room } from '../../types'
import { roomService } from '../../services/roomService'

export function loadRooms() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: 'SET_ROOMS_LOADING', isLoading: true })
      const rooms = await roomService.getRooms()
      dispatch({ type: 'SET_ROOMS', rooms })
      dispatch({ type: 'SET_ROOMS_LOADING', isLoading: false })
    } catch (err: any) {
      dispatch({ type: 'LOAD_ROOMS_FAILURE', error: err.message })
      // Todo: change to loggerService
      console.log('err:', err)
    }
  }
}

export function saveRoom(room: Room, onlyDispatch = false) {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const { rooms } = getState().roomModule
      const isRoomExist = rooms.some((roomI) => roomI._id === room._id)
      if (!onlyDispatch) await roomService.save({ ...room })
      isRoomExist ? dispatch({ type: 'UPDATE_ROOM', room }) : dispatch({ type: 'ADD_ROOM', room })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeRoom(roomId: string, onlyDispatch = false) {
  return async (dispatch: Dispatch) => {
    try {
      if (!onlyDispatch) await roomService.remove(roomId)
      dispatch({ type: 'REMOVE_ROOM', roomId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
