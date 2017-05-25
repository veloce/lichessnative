import React from 'react'
import { StyleSheet, Text, View, Dimensions, ViewStyle, TextStyle } from 'react-native'

import Board, { BoardHandlers } from './common/board/Board'
import { Key } from './common/board/types'
import { BoardState } from './common/board/state'
import { defaults as boardDefaultConf, BoardConfig } from './common/board/config'
import * as fenUtil from './common/board/fen'

export default class App extends React.Component<void, BoardState> {
  private boardConfig: BoardConfig

  private boardHandlers: BoardHandlers

  constructor(props: void) {
    super(props)

    this.boardConfig = boardDefaultConf()

    this.state = {
      orientation: 'white',
      turnColor: 'white',
      pieces: fenUtil.initialBoard(fenUtil.initial, this.boardConfig.uidGen),
      selected: null,
      moveDests: null,
      check: null,
    }

    this.boardHandlers = {
      onSelectSquare: (k: Key) => this.setState({ selected: k }),
      onMove: this.move
    }
  }

  render() {
    const screenWidth = Dimensions.get('window').width
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Board
          state={this.state}
          handlers={this.boardHandlers}
          config={this.boardConfig}
          size={screenWidth}
        />
      </View>
    )
  }

  private move = (orig: Key, dest: Key, animate = true) => {
    this.setState({
      animatePieces: animate ? new Set([dest]) : undefined,
      selected: null,
      pieces: {
        ...this.state.pieces,
        [orig]: undefined,
        [dest]: this.state.pieces[orig]
      }
    })
  }

  componentDidMount() {
    setTimeout(() => {
      const dests = new Map([
        ["e2", new Set(["e3", "e4"])],
        ["b1", new Set(["a3", "c3"])]
      ]) as Map<Key, Set<Key>>
      this.setState({
        moveDests: dests
      })
    }, 100)
    // setTimeout(() => {
    //   this.move('e2', 'e4')
    // }, 500)
    // setTimeout(() => {
    //   this.move('e7', 'e5')
    // }, 1000)
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
