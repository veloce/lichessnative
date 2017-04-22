import React from 'react'
import {
  StyleSheet,
  View,
  ViewStyle,
  LayoutChangeEvent,
  LayoutRectangle,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native'

import PieceEl from './Piece'
import Background from './Background'
import * as util from './util'
import { BoardPiece, BoardPieces, Key } from './types'

interface Props {
  size: number
  pieces: BoardPieces
}

const hiddenShadowPos = { x: 999999, y: 999999 }

export default class Board extends React.PureComponent<Props, void> {
  private layout: LayoutRectangle
  private panResponder: PanResponderInstance
  private shadowKey: Key | null
  private shadow?: View

  constructor(props: Props) {
    super(props)

    this.shadowKey = null

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease
    })
  }

  render() {
    const { size, pieces } = this.props
    const dims = {
      width: size,
      height: size
    }
    const sqSize = size / 8
    const shadowPos = this.shadowKey !== null ? util.key2Pos(this.shadowKey, sqSize) : hiddenShadowPos
    const shadowStyle = {
      width: sqSize * 2,
      height: sqSize * 2,
      transform: [{ translate: [shadowPos.x - sqSize / 2, shadowPos.y - sqSize / 2] }]
    }
    return (
      <View
        style={[styles.container, dims]}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        <Background size={size} darkColor="#83ACBD" lightColor="#F3FAFF" />
        <View ref={(e: any) => { this.shadow = e }} style={[styles.shadow, shadowStyle]} />
        {this.renderPieces(pieces, sqSize)}
      </View>
    )
  }

  private onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    this.layout = nativeEvent.layout
  }

  private handlePanResponderGrant = () => {
  }

  private handlePanResponderMove = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const c = util.getCoordFromEvent({ x: gestureState.moveX, y: gestureState.moveY }, this.layout)
    const prevKey = this.shadowKey
    this.shadowKey = c ? util.coord2Key(c) : null
    if (this.shadow && prevKey !== this.shadowKey) {
      const sqSize = this.props.size / 8
      const shadowPos = this.shadowKey !== null ? util.key2Pos(this.shadowKey, sqSize) : hiddenShadowPos
      this.shadow.setNativeProps({
        style: {
          transform: [{ translate: [shadowPos.x - sqSize / 2, shadowPos.y - sqSize / 2] }]
        }
      })
    }
  }

  private handlePanResponderRelease = () => {
    this.shadowKey = null
    if (this.shadow) {
      this.shadow.setNativeProps({
        style: {
          transform: [{ translate: [hiddenShadowPos.x, hiddenShadowPos.y] }]
        }
      })
    }
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
  shadow: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    width: 200,
    height: 200,
  },
  shadow: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50
  }
})
