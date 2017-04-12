import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState
} from 'react-native'

import { Role, Color, PiecesSet } from './types'
import { piecesSet } from './sets'

interface Props {
  size: number
  set: PiecesSet
  role: Role
  color: Color
  pos: { x: number, y: number }
}

interface State {
  pan: Animated.ValueXY
}

export default class Piece extends React.PureComponent<Props, State> {
  private panResponder: PanResponderInstance
  private moveAnim: Animated.CompositeAnimation

  constructor(props: Props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY()
    }
    this.state.pan.setOffset(props.pos)

    this.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: () => true,
       onPanResponderMove: this.handlePanResponderMove,
       onPanResponderRelease: () => {
         Animated.spring(
           this.state.pan,         // Auto-multiplexed
           {toValue: {x: 0, y: 0}} // Back to zero
         ).start()
       },
     })
  }

  render() {
    const ThemePiece = piecesSet[this.props.set][this.props.role]
    const { size } = this.props
    const style = {
      width: size,
      height: size,
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <Animated.View
        style={[styles.container, style]}
        {...this.panResponder.panHandlers}
      >
        <ThemePiece size={this.props.size} color={this.props.color} />
      </Animated.View>
    )
  }

  componentWillReceiveProps(newProps: Props) {
    if (
      this.props.pos.x !== newProps.pos.x ||
      this.props.pos.y !== newProps.pos.y
    ) {
      this.state.pan.setOffset(newProps.pos)
      this.state.pan.setValue({ x: this.props.pos.x - newProps.pos.x, y: this.props.pos.y - newProps.pos.y })
      this.moveAnim = Animated.timing(
        this.state.pan,
        { toValue: { x: 0, y: 0 }, duration: 200 }
      )
      this.moveAnim.start()
    }
  }

  private handlePanResponderMove = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    this.state.pan.setValue({ x: gestureState.dx, y: gestureState.dy })
  }

}

interface Style {
  container: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    position: 'absolute'
  }
})

