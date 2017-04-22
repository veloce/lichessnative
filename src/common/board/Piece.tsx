import React from 'react'
import {
  StyleSheet,
  ViewStyle,
  Animated,
  PanResponder,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native'

import { Role, Color, PieceTheme, BoardItem } from './types'
import { piecesSet } from './sets'

interface Props extends BoardItem {
  theme: PieceTheme
  role: Role
  color: Color
  animate?: boolean
}

interface State {
  dragging: boolean
  pan: Animated.ValueXY
}

export default class Piece extends React.PureComponent<Props, State> {
  private panResponder: PanResponderInstance
  private moveAnim: Animated.CompositeAnimation

  constructor(props: Props) {
    super(props)

    this.state = {
      dragging: false,
      pan: new Animated.ValueXY()
    }
    this.state.pan.setOffset(props.pos)

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderRelease
    })
  }

  render() {
    const ThemePiece = piecesSet[this.props.theme][this.props.role]
    const { size } = this.props
    const style = {
      width: size,
      height: size,
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <Animated.View
        style={[styles.container, style, this.state.dragging ? { zIndex: 3 } : {}]}
        {...this.panResponder.panHandlers}
      >
        <ThemePiece size={this.props.size} color={this.props.color} />
      </Animated.View>
    )
  }

  componentWillReceiveProps(newProps: Props) {
    this.state.pan.setOffset(newProps.pos)

    if (
      this.props.animate === true &&
      (this.props.pos.x !== newProps.pos.x ||
      this.props.pos.y !== newProps.pos.y)
    ) {
      this.state.pan.setValue({
        x: this.props.pos.x - newProps.pos.x,
        y: this.props.pos.y - newProps.pos.y
      })
      this.moveAnim = Animated.timing(
        this.state.pan,
        { toValue: { x: 0, y: 0 }, duration: 200 }
      )
      this.moveAnim.start()
    }
  }

  private handlePanResponderGrant = () => {
    this.setState({ dragging: true })
  }

  private handlePanResponderMove = (_: GestureResponderEvent, gestureState: PanResponderGestureState) => {
    this.state.pan.setValue({ x: gestureState.dx, y: gestureState.dy })
  }

  private handlePanResponderRelease = () => {
    this.setState({ dragging: false })
    Animated.spring(
      this.state.pan,
      {toValue: {x: 0, y: 0}}
    ).start()
  }
}

interface Style {
  container: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    position: 'absolute',
    zIndex: 2
  }
})
