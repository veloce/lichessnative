import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'

import { combineReducers } from '../redux'

import { BoardPieces, Key } from './types'

export interface State {
  pieces: BoardPieces
  selected: Key | null
}

export const actions = {
  selectSquare: new Subject<Key>()
}

export const rootReducer = combineReducers<State>(
  actions.selectSquare.map(
    (k: Key) => (s: State): State => ({ ...s, selected: k })
  )
)
