import React from 'react'
import { StyleSheet, View } from 'react-native'

export default class Board extends React.Component<void, void> {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

interface Style {
  container: React.ViewStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  }
})
