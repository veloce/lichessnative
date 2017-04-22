import React from 'react'
import { StyleSheet, Text, View, Dimensions, ViewStyle, TextStyle } from 'react-native'

import Board from './common/board/Board'
import { BoardPieces } from './common/board/types'
import * as boardUtil from './common/board/util'
import * as fenUtil from './common/board/fen'

interface State {
  pieces: BoardPieces
}

export default class App extends React.Component<void, State> {
  private uidGen: () => number

  constructor(props: void) {
    super(props)

    this.uidGen = boardUtil.uidGenFactory()

    this.state = {
      pieces: fenUtil.initialBoard(fenUtil.initial, this.uidGen)
    }
  }

  render() {
    const screenWidth = Dimensions.get('window').width
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Board pieces={this.state.pieces} size={screenWidth} />
      </View>
    )
  }
}

interface Style {
  container: ViewStyle
  welcome: TextStyle
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
