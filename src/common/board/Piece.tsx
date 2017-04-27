import omit from 'lodash/omit'
import shallowEqual from 'fbjs/lib/shallowEqual'
import React from 'react'
import {
  View,
  StyleSheet,
  ViewStyle,
  Animated
} from 'react-native'

import { key2Pos } from './util'
import { Role, Color, PieceTheme, BoardItemProps } from './types'
import { piecesSet } from './sets'


interface Props extends BoardItemProps {
  theme: PieceTheme
  role: Role
  color: Color
  animate?: boolean
}

interface State {
  pan: Animated.ValueXY
}

export default class Piece extends React.Component<Props, State> {
  private moveAnim: Animated.CompositeAnimation

  public view?: View

  constructor(props: Props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY()
    }
    this.state.pan.setValue(key2Pos(props.boardKey, props.size))
  }

  render() {
    console.log('piece render key:', this.props.boardKey)
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

  public setNativeProps(np: Object) {
    if (this.view) this.view.setNativeProps(np)
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const eqProps = shallowEqual(omit(this.props, 'animate'), omit(nextProps, 'animate'))
    const eqState = shallowEqual(this.state, nextState)
    // if (!eqProps) {
    //   console.log(eqProps, nextProps, this.props)
    // }

    return (!eqProps || !eqState)
  }

  componentWillReceiveProps(newProps: Props) {
    this.state.pan.setValue(key2Pos(newProps.boardKey, newProps.size))

    if (newProps.animate && this.props.boardKey !== newProps.boardKey) {
      const curPos = key2Pos(this.props.boardKey, this.props.size)
      const newPos = key2Pos(newProps.boardKey, newProps.size)

      this.state.pan.setValue({
        x: curPos.x,
        y: curPos.y
      })
      this.moveAnim = Animated.timing(this.state.pan,
        {
          toValue: { x: newPos.x, y: newPos.y },
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
