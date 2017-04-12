import React from 'react'

import { Role, Color, PiecesSet } from './types'
import { piecesSet } from './sets'

interface Props {
  size: number
  set: PiecesSet
  role: Role
  color: Color
}

export default class Piece extends React.PureComponent<Props, void> {
  render() {
    const ThemedPiece = piecesSet[this.props.set][this.props.role]
    return (
      <ThemedPiece size={this.props.size} color={this.props.color} />
    )
  }
}
