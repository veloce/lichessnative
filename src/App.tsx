import React from 'react'
import { StyleSheet, Text, View, Dimensions, ViewStyle, TextStyle } from 'react-native'

import Board from './common/board/Board'
import { BoardPiece, BoardPieces, Role, Color } from './common/board/types'
import * as boardUtil from './common/board/util'

interface State {
  pieces: BoardPieces
}

export default class App extends React.Component<void, State> {
  constructor(props: void) {
    super(props)

    const pieces = boardUtil.emptyPiecesRecord()
    pieces['e2'] = makePiece('pawn', 'white')
    this.state = {
      pieces
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

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        pieces: {
          ...this.state.pieces,
          e2: undefined,
          e4: this.state.pieces.e2
        }
      })
    }, 2000)
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


const uid = (() => {
  let id = 0
  return () => id++
})()

function makePiece(role: Role, color: Color): BoardPiece {
  return {
    role, color, id: uid()
  }
}
