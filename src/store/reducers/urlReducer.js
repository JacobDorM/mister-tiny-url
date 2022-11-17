const INITIAL_STATE = {
  urls: null,
  url: null,
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

    case 'SET_URL':
      return {
        ...state,
        url: action.url,
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
      console.log(state.urls)
      return {
        ...state,
        urls: [...state.urls, action.savedUrl],
      }

    case 'REMOVE_URL':
      return {
        ...state,
        urls: state.urls.filter((url) => url._id !== action.urlId),
      }

    case 'UPDATE_URL':
      return {
        ...state,
        urls: state.urls.map((url) => (url._id === action.savedUrl._id ? action.savedUrl : url)),
      }

    default:
      return state
  }
}
