import { AnyAction, is } from '../common/util/redux'

import * as fenUtil from '../common/board/fen'
import * as boardUtil from '../common/board/util'
import { BoardState } from '../common/board/state'

import { selectSquareAction } from '../actions/board'

const uidGen = boardUtil.uidGenFactory()

const defaultState: BoardState = {
  orientation: 'white',
  turnColor: 'white',
  pieces: fenUtil.initialBoard(fenUtil.initial, uidGen),
  selected: null,
  moveDests: null,
  check: null,
  animate: true
}

export default function boardReducer(state = defaultState, action: AnyAction): BoardState {
  if (is(action, selectSquareAction)) {
    return {
      ...state,
      selected: action.payload
    }
  }

  return state
}
