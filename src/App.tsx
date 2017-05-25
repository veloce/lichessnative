import React from 'react'
import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native'

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
        ["a2", new Set(["a3", "a4"])],
        ["b2", new Set(["b3", "b4"])],
        ["c2", new Set(["c3", "c4"])],
        ["d2", new Set(["d3", "d4"])],
        ["e2", new Set(["e3", "e4"])],
        ["f2", new Set(["f3", "f4"])],
        ["g2", new Set(["g3", "g4"])],
        ["h2", new Set(["h3", "h4"])],
        ["b1", new Set(["a3", "c3"])],
        ["g1", new Set(["f3", "h3"])]
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
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  }
})
