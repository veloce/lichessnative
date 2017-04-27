import { actionCreator } from '../common/util/redux'
import { Key } from '../common/board/types'

export const selectSquareAction = actionCreator<Key>('SELECT_SQUARE')
