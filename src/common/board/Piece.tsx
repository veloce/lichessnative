import React from 'react'

import { Key, Role, Color } from './types'
import Bishop from './sets/cburnett/Bishop'

interface Props {
  size: number
  set: string
  key: Key
  role: Role
  color: Color
}

export default class Piece extends React.PureComponent<Props, void> {
  render() {
    return (
      <Bishop size={this.props.size} color={this.props.color} />
    )
  }
}
