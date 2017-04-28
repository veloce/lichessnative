import { PanResponderGestureState, LayoutRectangle } from 'react-native'

import { NativePos, File, Rank, Key, Coord, BoardPiece, BoardPieces, Piece, Color } from './types'

export const files: File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const ranks: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8]
export const invRanks: Rank[] = [8, 7, 6, 5, 4, 3, 2, 1]
export const colors: Color[] = ['white', 'black']

export const key2Coord = (k: Key) => [k.charCodeAt(0) - 96, k.charCodeAt(1) - 48] as Coord
export const coord2Key = (c: Coord) => allKeys[8 * c[0] + c[1] - 9]

export function coord2Pos(coord: Coord, squareSize: number): NativePos {
  return {
    x: (coord[0] - 1) * squareSize,
    y: (8 - coord[1]) * squareSize
  }
}

export function key2Pos(key: Key, squareSize: number): NativePos {
  return coord2Pos(key2Coord(key), squareSize)
}

function getCoordFromPos(
  x: number,
  y: number,
  boardSize: number,
  offsetX: number = 0,
  offsetY: number = 0
): Coord | null {
  const file = Math.ceil(8 * ((x -  offsetX) / boardSize))
  const rank = Math.ceil(8 - (8 * ((y - offsetY) / boardSize)))
  if (file > 0 && file < 9 && rank > 0 && rank < 9) {
    return [file, rank]
  }
  return null
}

// return key relative to board position (without screen offset)
export function getKeyFromBoardPos(pos: NativePos, boardSize: number): Key | null {
  const coord = getCoordFromPos(pos.x, pos.y, boardSize)
  return coord !== null ? coord2Key(coord) : null
}

// return key relative to screen position, taking into account board offset,
// from a move event
export function getKeyFromMoveEvent(
  gs: PanResponderGestureState,
  boardLayout: LayoutRectangle
): Key | null {
  const coord = getCoordFromPos(gs.moveX, gs.moveY, boardLayout.width, boardLayout.x, boardLayout.y)
  return coord !== null ? coord2Key(coord) : null
}

// return key relative to screen position, taking into account board offset,
// from a grant event
export function getKeyFromGrantEvent(
  gs: PanResponderGestureState,
  boardLayout: LayoutRectangle
): Key | null {
  const coord = getCoordFromPos(gs.x0, gs.y0, boardLayout.width, boardLayout.x, boardLayout.y)
  return coord !== null ? coord2Key(coord) : null
}

export const allKeys: Key[] =
  Array.prototype.concat(...files.map(c => ranks.map(r => c + r)))

export const emptyPiecesRecord: BoardPieces = (() => {
  const r = {}
  for (const i in allKeys) {
    (r as BoardPieces)[allKeys[i]] = undefined
  }
  return r as BoardPieces
})()

export function uidGenFactory() {
  let id = 0
  return () => id++
}

export function containsX<X>(xs: X[] | undefined, x: X): boolean {
  return xs ? xs.indexOf(x) !== -1 : false
}

export function boardPiece(piece: Piece, uidGen: () => number): BoardPiece {
  return Object.assign({}, piece, { id: uidGen() })
}
