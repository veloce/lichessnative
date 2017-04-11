import React from 'react'
import { StyleSheet, View } from 'react-native'

import Background from './Background'

interface Props {
  size: number
}

export default class Board extends React.Component<Props, void> {
  render() {
    const { size } = this.props
    const dims = {
      width: size,
      height: size
    }
    return (
      <View style={[styles.container, dims]}>
        <Background size={size} darkColor="#83ACBD" lightColor="#F3FAFF" />
      </View>
    )
  }
}

interface Style {
  container: React.ViewStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    width: 200,
    height: 200,
  }
})

