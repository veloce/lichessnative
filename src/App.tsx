import React from 'react'
import { StyleSheet, Text, View, Dimensions, ViewStyle, TextStyle } from 'react-native'

import Board from './common/board/Board'
import { BoardPieces, Key } from './common/board/types'
import * as boardUtil from './common/board/util'
import * as fenUtil from './common/board/fen'

interface State {
  pieces: BoardPieces
  selected: Key | null
}

export default class App extends React.Component<void, State> {
  private uidGen: () => number

  constructor(props: void) {
    super(props)

    this.uidGen = boardUtil.uidGenFactory()

    this.state = {
      pieces: fenUtil.initialBoard(fenUtil.initial, this.uidGen),
      selected: null
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
          actions={{
            selectSquare: (k: Key) => this.setState({ selected: k })
          }}
          size={screenWidth}
        />
      </View>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        pieces: {
          ...this.state.pieces,
          e2: undefined,
          e4: this.state.pieces.e2
        }
      })
    }, 500)
    setTimeout(() => {
      this.setState({
        pieces: {
          ...this.state.pieces,
          e7: undefined,
          e5: this.state.pieces.e7
        }
      })
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
