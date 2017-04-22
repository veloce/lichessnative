import React from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated
} from 'react-native'

import { Key, Role, Color, PieceTheme, BoardItem } from './types'
import { piecesSet } from './sets'

interface Props extends BoardItem {
  boardKey: Key
  theme: PieceTheme
  role: Role
  color: Color
  animate?: boolean
}

interface State {
  pan: Animated.ValueXY
}

export default class Piece extends React.PureComponent<Props, State> {
  private moveAnim: Animated.CompositeAnimation

  public view: View

  constructor(props: Props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY()
    }
    this.state.pan.setValue(props.pos)
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
        ref={(e: any) => { this.view = e }}
        style={[styles.container, style]}
      >
        <ThemePiece size={this.props.size} color={this.props.color} />
      </Animated.View>
    )
  }

  public setNativeProps(np: any) {
    this.view.setNativeProps(np)
  }

  componentWillReceiveProps(newProps: Props) {
    this.state.pan.setValue(newProps.pos)

    if (
      this.props.animate === true &&
      (this.props.pos.x !== newProps.pos.x ||
      this.props.pos.y !== newProps.pos.y)
    ) {
      this.state.pan.setValue({
        x: this.props.pos.x,
        y: this.props.pos.y
      })
      this.moveAnim = Animated.timing(this.state.pan,
        {
          toValue: { x: newProps.pos.x, y: newProps.pos.y },
          duration: 200,
          useNativeDriver: true
        }
      )
      this.moveAnim.start()
    }
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
