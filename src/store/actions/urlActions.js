import { urlService } from '../../services/urlService'

export function loadUrls() {
  return async (dispatch) => {
    try {
      const urls = await urlService.query()
      dispatch({ type: 'SET_URLS', urls })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function loadUrl(urlPointer) {
  return async (dispatch) => {
    try {
      const url = await urlService.getByPointer(urlPointer)
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setUrl(url) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeUrl(urlId) {
  return async (dispatch) => {
    try {
      const url = await urlService.remove(urlId)
      dispatch({ type: 'REMOVE_URL', urlId })
      return url
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveUrl(url) {
  return async (dispatch) => {
    try {
      const savedUrl = await urlService.save({ ...url })
      url = savedUrl
      dispatch({ type: 'ADD_URL', savedUrl })
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
