// what type should you give to null
import { UrlState, UrlActions, UrlActionTypes } from '../../types'

const INITIAL_STATE: UrlState = {
  url: null,
}

export function urlReducer(state = INITIAL_STATE, action: UrlActions): UrlState {
  switch (action.type) {
    case UrlActionTypes.SET_URL:
      return {
        ...state,
        url: action.url,
      }

    default:
      return state
  }
}
