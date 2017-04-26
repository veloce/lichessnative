import { BoardPieces, Key, Color, Dests } from './types'

export interface BoardState {
  pieces: BoardPieces
  orientation: Color // board orientation. white | black
  turnColor: Color // turn to play. white | black
  check: Key | null // square currently in check "a2"
  selected: Key | null
  lastMove?: [Key, Key] // squares part of the last move ["c3"; "c4"]
  moveDests: Dests | null // valid moves {"a2" ["a3" "a4"] "b1" ["a3" "c3"]}
  premoveDests?: Key[] // premove destinations for the current selection
  animate?: boolean // animate or not the next board mutation
}
