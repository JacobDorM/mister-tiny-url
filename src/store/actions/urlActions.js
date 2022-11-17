import { urlService } from '../../services/urlService'

export function loadContacts() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().urlModule
      const urls = await urlService.query(filterBy)
      dispatch({ type: 'SET_URLS', urls })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function loadContact(urlId) {
  return async (dispatch, getState) => {
    try {
      const url = urlId ? await urlService.getById(urlId) : await urlService.getEmpty()
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setContact(url) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'SET_URL', url })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeContact(urlId) {
  return async (dispatch, getState) => {
    try {
      const url = await urlService.remove(urlId)
      dispatch({ type: 'REMOVE_URL', urlId })
      return url
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveContact(url) {
  return async (dispatch, getState) => {
    try {
      const savedContact = await urlService.save({ ...url })
      url._id ? dispatch({ type: 'UPDATE_URL', savedContact }) : dispatch({ type: 'ADD_URL', savedContact })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}
