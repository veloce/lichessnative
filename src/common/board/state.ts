import { BoardPieces, Key, Color, Dests } from './types'
import { BoardConfig } from './config'
import premove from './premove'
import * as util from './util'

export interface BoardState {
  pieces: BoardPieces
  orientation: Color // board orientation. white | black
  turnColor: Color // turn to play. white | black
  check: Key | null // square currently in check "a2"
  selected: Key | null
  lastMove?: [Key, Key] // squares part of the last move ["c3"; "c4"]
  moveDests: Dests | null // valid moves {"a2" ["a3" "a4"] "b1" ["a3" "c3"]}
  premoveDests?: Key[] // premove destinations for the current selection
  animatePieces?: Set<Key> // pieces to animate during the next board render
}

export function isMovable(state: BoardState, config: BoardConfig, orig: Key) {
  const piece = state.pieces[orig]
  return piece !== undefined && (
    config.movable.color === 'both' || (
      config.movable.color === piece.color &&
      state.turnColor === piece.color
    ))
}

export function canMove(state: BoardState, config: BoardConfig, orig: Key, dest: Key) {
  return orig !== dest && isMovable(state, config, orig) && (
    config.movable.free ||
    (state.moveDests !== null && util.containsX(state.moveDests[orig], dest))
  )
}

export function canDrop(state: BoardState, config: BoardConfig, orig: Key, dest: Key) {
  const piece = state.pieces[orig]
  return piece && dest && (orig === dest || !state.pieces[dest]) && (
    config.movable.color === 'both' || (
      config.movable.color === piece.color &&
      state.turnColor === piece.color
    ))
}

export function isPremovable(state: BoardState, config: BoardConfig, orig: Key) {
  const piece = state.pieces[orig]
  return piece && config.premovable.enabled &&
    config.movable.color === piece.color &&
    state.turnColor !== piece.color
}

export function canPremove(state: BoardState, config: BoardConfig, orig: Key, dest: Key) {
  return orig !== dest &&
    isPremovable(state, config, orig) &&
    util.containsX(premove(state.pieces, orig, state.premovable.castle), dest)
}

export function canPredrop(state: BoardState, config: BoardConfig, orig: Key, dest: Key) {
  const piece = state.pieces[orig]
  return piece && dest &&
    (!state.pieces[dest] || state.pieces[dest].color !== config.movable.color) &&
    state.predroppable.enabled &&
    (piece.role !== 'pawn' || (dest[1] !== '1' && dest[1] !== '8')) &&
    config.movable.color === piece.color &&
    state.turnColor !== piece.color
}

export function isDraggable(state: BoardState, config: BoardConfig, orig: Key) {
  const piece = state.pieces[orig]
  return piece && config.draggable.enabled && (
    config.movable.color === 'both' || (
      config.movable.color === piece.color && (
        state.turnColor === piece.color || config.premovable.enabled
      )
    )
  )
}

