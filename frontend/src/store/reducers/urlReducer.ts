// what type should you give to null
import { UrlState, IAction, ActionTypes } from '../../models/url.model'

const INITIAL_STATE: UrlState = {
  url: null,
}

export function urlReducer(state = INITIAL_STATE, action: IAction): UrlState {
  switch (action.type) {
    case ActionTypes.SET_URL:
      return {
        ...state,
        url: action.url,
      }

    default:
      return state
  }
}
