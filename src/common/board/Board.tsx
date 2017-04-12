import React from 'react'
import { StyleSheet, View } from 'react-native'

import Background from './Background'
import Piece from './Piece'

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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Piece size={50} set="cburnett" role="bishop" color="black" />
          <Piece size={50} set="cburnett" role="king" color="black" />
          <Piece size={50} set="cburnett" role="queen" color="black" />
          <Piece size={50} set="cburnett" role="knight" color="black" />
          <Piece size={50} set="cburnett" role="rook" color="black" />
          <Piece size={50} set="cburnett" role="pawn" color="black" />
        </View>
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

