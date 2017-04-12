import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

import PieceEl from './Piece'
import Background from './Background'
import * as util from './util'
import { BoardPiece, BoardPieces, Key } from './types'

interface Props {
  size: number
  pieces: BoardPieces
}

export default class Board extends React.PureComponent<Props, void> {

  render() {
    const { size, pieces } = this.props
    const dims = {
      width: size,
      height: size
    }
    const pieceSize = size / 8
    return (
      <View style={[styles.container, dims]}>
        <Background size={size} darkColor="#83ACBD" lightColor="#F3FAFF" />
        {this.renderPieces(pieces, pieceSize)}
      </View>
    )
  }

  renderPieces(pieces: BoardPieces, pieceSize: number) {
    return Object.keys(pieces)
    .filter((k: Key) => pieces[k] !== undefined)
    .map((k: Key) =>
      this.renderPiece(k, pieces[k]!, pieceSize)
    )
  }

  renderPiece(key: Key, piece: BoardPiece, size: number) {
    return (
      <PieceEl
        key={piece.id}
        size={size}
        pos={util.key2Pos(key, size)}
        set="cburnett"
        role={piece.role}
        color={piece.color}
      />
    )
  }
}

interface Style {
  container: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    width: 200,
    height: 200,
  }
})
