import {
  StyleSheet,
  View,
  ViewStyle
} from 'react-native'

import { BoardItem } from './types'

interface Props extends BoardItem {
  light: 'lastMove' | 'check' | 'selected'
}

export default function SquareLight({ size, pos, light }: Props) {
  const style = {
    width: size,
    height: size,
    transform: [{ translate: [pos.x, pos.y] }]
  }

  const lightStyle = styles[light]

  return (
    <View style={[styles.container, style, lightStyle]} />
  )
}

interface Style {
  container: ViewStyle
  selected: ViewStyle
  [k: string]: ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    position: 'absolute'
  },
  selected: {
    backgroundColor: 'rgba(20, 85, 30, 0.5)'
  },
  lastMove: {
    backgroundColor: 'rgba(155, 199, 0, 0.41)'
  },
  check: {
    backgroundColor: 'rgba(169, 0, 0, 0.5)'
  }
})
