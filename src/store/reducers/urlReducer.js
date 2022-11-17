const INITIAL_STATE = {
  urls: null,
  longUrl: null,
  shortUrl: null,
}

export function urlReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_URLS':
      return {
        ...state,
        urls: action.urls,
      }

    case 'SET_LONG_URL':
      return {
        ...state,
        longUrl: action.longUrl,
      }

    case 'SET_SHORT_URL':
      return {
        ...state,
        shortUrl: action.shortUrl,
      }

    case 'ADD_URL':
      return {
        ...state,
        urls: [...state.urls, action.savedContact],
      }

    case 'REMOVE_URL':
      return {
        ...state,
        urls: state.urls.filter((url) => url._id !== action.urlId),
      }

    case 'UPDATE_URL':
      return {
        ...state,
        urls: state.urls.map((url) => (url._id === action.savedContact._id ? action.savedContact : url)),
      }

    default:
      return state
  }
}
