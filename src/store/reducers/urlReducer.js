const INITIAL_STATE = {
  url: null,
}

export function urlReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_URL':
      return {
        ...state,
        url: action.url,
      }

    default:
      return state
  }
}
