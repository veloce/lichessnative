import { connect } from 'react-redux'
import { selectSquareAction } from '../../actions/board'
import Board from './Board'
import { Key } from './types'

const BoardContainer = connect(
  (state) => ({ ...state }),
  (dispatch) => ({ onSelect: (k: Key) => dispatch(selectSquareAction(k)) })
)(Board)

export default BoardContainer
