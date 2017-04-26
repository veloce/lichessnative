import React from 'react'
import { StyleSheet, Text, View, Dimensions, ViewStyle, TextStyle } from 'react-native'

import Board, { BoardHandlers } from './common/board/Board'
import { BoardPieces, Key } from './common/board/types'
import * as boardUtil from './common/board/util'
import * as fenUtil from './common/board/fen'

interface State {
  pieces: BoardPieces
  selected: Key | null
  animate: boolean
}

export default class App extends React.Component<void, State> {
  private uidGen: () => number

  private boardHandlers: BoardHandlers

  constructor(props: void) {
    super(props)

    this.uidGen = boardUtil.uidGenFactory()

    this.state = {
      pieces: fenUtil.initialBoard(fenUtil.initial, this.uidGen),
      selected: null,
      animate: true
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
          pieces={this.state.pieces}
          selected={this.state.selected}
          animate={this.state.animate}
          handlers={this.boardHandlers}
          size={screenWidth}
        />
      </View>
    )
  }

  private move = (orig: Key, dest: Key, animate = true) => {
    this.setState({
      animate,
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
      this.move('e2', 'e4')
    }, 500)
    setTimeout(() => {
      this.move('e7', 'e5')
    }, 1000)
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
