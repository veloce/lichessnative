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

  constructor(props: Props) {
    super(props)
  }

  render() {
    const { size, pieces } = this.props
    const dims = {
      width: size,
      height: size
    }
    const sqSize = size / 8
    return (
      <View style={[styles.container, dims]}>
        <Background size={size} darkColor="#83ACBD" lightColor="#F3FAFF" />
        {this.renderPieces(pieces, sqSize)}
      </View>
    )
  }

  // componentWillReceiveProps(newProps: Props) {
  //   const np = newProps.pieces, p = this.props.pieces
  //   let k: Key
  //   for (k in np) {
  //     const n = np[k], o = p[k]
  //     if (n !== undefined && o !== undefined && n !== o && n.color !== o.color) {
  //       captured[k] = o
  //     }
  //   }
  // }

  renderPieces(pieces: BoardPieces, sqSize: number) {
    const ks = Object.keys(pieces)
    const r: JSX.Element[] = []
    for (let i = 0; i < ks.length; i++) {
      const k = ks[i] as Key
      const p = pieces[k]
      if (p !== undefined) r.push(this.renderPiece(k, p, sqSize))
    }
    return r
  }

  renderPiece(key: Key, piece: BoardPiece, size: number) {
    return (
      <PieceEl
        key={piece.id}
        size={size}
        pos={util.key2Pos(key, size)}
        theme="cburnett"
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
