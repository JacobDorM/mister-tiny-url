import { Dispatch } from 'redux'
import { urlService } from '../../services/urlService'
import { Url, UrlActionTypes } from '../../types'

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
      dispatch({ type: UrlActionTypes.SET_URL, url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveUrl(url: Url | null) {
  return async (dispatch: Dispatch) => {
    try {
      if (url) {
        url = await urlService.save({ ...url })
        dispatch({ type: 'SET_URL', url })
      }
    } catch (err) {
      console.log('err:', err)
    }
  }
}
