import { RoomsActionTypes, RoomsActions, RoomsState } from '../../types'

const INITIAL_STATE: RoomsState = {
  rooms: [],
  isLoading: false,
  error: '',
}

export function roomReducer(state = INITIAL_STATE, action: RoomsActions): RoomsState {
  switch (action.type) {
    case RoomsActionTypes.SET_ROOMS:
      return {
        ...state,
        rooms: action.rooms,
      }

    case RoomsActionTypes.SET_ROOMS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }

    case RoomsActionTypes.SET_ROOMS_FAILURE:
      return {
        ...state,
        error: action.error,
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
