// what type should you give to null
interface UrlState {
  url: null
}

const INITIAL_STATE: UrlState = {
  url: null,
}

enum ActionTypes {
  SET_URL = 'SET_URL',
  GET_URL = 'GET_URL',
}

// understand what type to give to url
interface urlSet {
  type: ActionTypes.SET_URL
  url: object
}

interface urlGet {
  type: ActionTypes.GET_URL
  b: string
}

type IAction = urlSet | urlGet

export function urlReducer(state = INITIAL_STATE, action: IAction) {
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
