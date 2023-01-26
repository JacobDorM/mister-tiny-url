import { Dispatch } from 'redux'
import { urlService } from '../../services/urlService'
import { Url } from '../../models'

export function loadUrl(urlPointer: string) {
  return async (dispatch: Dispatch) => {
    try {
      const url: Url = await urlService.getByPointer(urlPointer)
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setUrl(url: Url | null) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveUrl(url: Url) {
  return async (dispatch: Dispatch) => {
    try {
      url = await urlService.save({ ...url })
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
