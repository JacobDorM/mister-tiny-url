import { urlService } from '../../services/urlService'

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

export function saveUrl(url) {
  return async (dispatch) => {
    try {
      url = await urlService.save({ ...url })
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
