import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { urlReducer } from './reducers/urlReducer'
import { userReducer } from './reducers/userReducer'
import { authReducer } from './reducers/authReducer'

const rootReducer = combineReducers({
  urlModule: urlReducer,
  userModule: userReducer,
  authModule: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

window.gStore = store
