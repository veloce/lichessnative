import { createStore, combineReducers } from 'redux'

import board from './reducers/board'

const rootReducer = combineReducers({
  board
})

export const store = createStore(rootReducer)
