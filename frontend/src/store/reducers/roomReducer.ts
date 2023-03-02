import { RoomsActionTypes, RoomsActions, RoomsState } from '../../models'

const INITIAL_STATE: RoomsState = {
  rooms: [],
}

export function roomReducer(state = INITIAL_STATE, action: RoomsActions): RoomsState {
  switch (action.type) {
    case RoomsActionTypes.SET_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
      }

    case RoomsActionTypes.ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.room],
      }

    case RoomsActionTypes.UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) => (room._id === action.room._id ? action.room : room)),
      }

    case RoomsActionTypes.REMOVE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.roomId),
      }
    default:
      return state
  }
}
