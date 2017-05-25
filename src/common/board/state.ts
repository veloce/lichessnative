import { BoardPieces, Key, Color, Dests } from './types'
import { BoardConfig } from './config'
import premove from './premove'

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
  const origDests = state.moveDests && state.moveDests.get(orig)
  return orig !== dest && isMovable(state, config, orig) && (
    config.movable.free || (origDests && origDests.has(dest))
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
    premove(state.pieces, orig, config.premovable.castle).has(dest)
}

export function canPredrop(state: BoardState, config: BoardConfig, orig: Key, dest: Key) {
  const piece = state.pieces[orig]
  const pDest = state.pieces[dest]
  return piece && dest &&
    (pDest === undefined || (pDest.color !== config.movable.color)) &&
    config.predroppable.enabled &&
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

