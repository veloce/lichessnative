import { PanResponderGestureState, LayoutRectangle } from 'react-native'

import { EventPos, File, Rank, Key, Coord, BoardPiece, BoardPieces, Piece, Color } from './types'

export const files: File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const ranks: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8]
export const invRanks: Rank[] = [8, 7, 6, 5, 4, 3, 2, 1]
export const colors: Color[] = ['white', 'black']

export const key2Coord = (k: Key) => [k.charCodeAt(0) - 96, k.charCodeAt(1) - 48] as Coord
export const coord2Key = (c: Coord) => allKeys[8 * c[0] + c[1] - 9]

export function coord2Pos(coord: Coord, squareSize: number): EventPos {
  return {
    x: (coord[0] - 1) * squareSize,
    y: (8 - coord[1]) * squareSize
  }
}

export function key2Pos(key: Key, squareSize: number): EventPos {
  return coord2Pos(key2Coord(key), squareSize)
}

export function getCoordFromEvent(
  gs: PanResponderGestureState,
  boardLayout: LayoutRectangle
): Coord | null {
  const file = Math.ceil(8 * ((gs.moveX -  boardLayout.x) / boardLayout.width))
  const rank = Math.ceil(8 - (8 * ((gs.moveY - boardLayout.y) / boardLayout.height)))
  if (file > 0 && file < 9 && rank > 0 && rank < 9) {
    return [file, rank]
  }
  return null
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

export function boardPiece(piece: Piece, uidGen: () => number): BoardPiece {
  return Object.assign({}, piece, { id: uidGen() })
}
