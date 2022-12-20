import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { urlReducer } from './reducers/urlReducer'

const rootReducer = combineReducers({
  urlModule: urlReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

window.gStore = store
