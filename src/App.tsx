import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

import Board from './common/board/Board'

export default class App extends React.Component<void, void> {

  render() {
    const screenWidth = Dimensions.get('window').width
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Board size={screenWidth} />
      </View>
    )
  }
}

interface Style {
  container: React.ViewStyle
  welcome: React.TextStyle
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
})
