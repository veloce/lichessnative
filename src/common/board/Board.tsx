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
import SquareLight from './SquareLight'
import Background from './Background'
import * as util from './util'
import { BoardPiece, BoardPieces, Key } from './types'

interface BoardActions {
  selectSquare: (k: Key | null) => void
}

interface Props {
  size: number
  pieces: BoardPieces
  selected: Key | null
  actions: BoardActions
}

const hiddenShadowPos = { x: 999999, y: 999999 }

export default class Board extends React.PureComponent<Props, void> {
  private layout: LayoutRectangle
  private panResponder: PanResponderInstance
  // board key that is currently overflown by a piece during drag
  // null if out of bounds or no piece currently dragged
  private shadowKey: Key | null
  // ref to the shadow view element
  private shadow?: View

  // ref to the dragging piece
  private draggingPiece: PieceEl | null

  constructor(props: Props) {
    super(props)

    this.shadowKey = null
    this.draggingPiece = null

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
    const { size, pieces, selected } = this.props
    const sqSize = size / 8
    const shadowStyle = {
      width: sqSize * 2,
      height: sqSize * 2,
      transform: this.getCurrentShadowTransform()
    }
    return (
      <View
        style={[styles.container, { width: size, height: size }]}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
      >
        <Background size={size} darkColor="#83ACBD" lightColor="#F3FAFF" />
        <View
          ref={(e: any) => { this.shadow = e }}
          style={[styles.shadow, shadowStyle]}
        />
        { selected !== null ?
          <SquareLight light="selected" size={sqSize} boardKey={selected} /> :
          null
        }
        <View
          style={[styles.innerContainer, { width: size, height: size }]}
        >
          {this.renderPieces(pieces, sqSize)}
        </View>
      </View>
    )
  }

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
        boardKey={key}
        size={size}
        theme="cburnett"
        role={piece.role}
        color={piece.color}
        animate={true}
        ref={key}
      />
    )
  }

  private onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    this.layout = nativeEvent.layout
  }

  private handlePanResponderGrant = (_: GestureResponderEvent, gesture: PanResponderGestureState) => {
    const key = util.getKeyFromGrantEvent(gesture, this.layout)
    if (key !== null) {
      if (key !== this.props.selected) this.props.actions.selectSquare(key)
      else this.props.actions.selectSquare(null)
    }
    if (key !== null && this.props.pieces[key] !== undefined) {
      const p = this.refs[key]
      if (p) {
        this.draggingPiece = p as PieceEl
        this.draggingPiece.setNativeProps({
          style: {
            zIndex: 3
          }
        })
      }
    }
  }

  private handlePanResponderMove = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    const sqSize = this.props.size / 8
    if (this.draggingPiece) {
      (this.draggingPiece as PieceEl).setNativeProps({
        style: {
          transform: [{ translate: [
            gestureState.moveX - this.layout.x - (sqSize / 2),
            gestureState.moveY - this.layout.y - sqSize
          ]}, {scale: 1.5}]
        }
      })

      const prevKey = this.shadowKey
      this.shadowKey = util.getKeyFromMoveEvent(gestureState, this.layout)
      if (this.shadow && prevKey !== this.shadowKey) {
        this.shadow.setNativeProps({
          style: {
            transform: this.getCurrentShadowTransform()
          }
        })
      }
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
    if (this.draggingPiece) {
      const pos = util.key2Pos(this.draggingPiece.props.boardKey, this.props.size / 8)
      this.draggingPiece.setNativeProps({
        style: {
          zIndex: 2,
          transform: [{ translate: [ pos.x, pos.y ]}]
        }
      })
      this.draggingPiece = null
    }
  }

  private getCurrentShadowTransform() {
    const sqSize = this.props.size / 8
    const pos = this.shadowKey !== null ? util.key2Pos(this.shadowKey, sqSize) : hiddenShadowPos
    return [{ translate: [pos.x - sqSize / 2, pos.y - sqSize / 2] }]
  }
}

interface Style {
  container: ViewStyle
  innerContainer: ViewStyle
  shadow: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    width: 200,
    height: 200,
  },
  innerContainer: {
    position: 'absolute',
  },
  shadow: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50
  }
})
