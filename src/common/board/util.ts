import { File, Rank, Key, Coord, BoardPiece, BoardPieces, Piece, Color } from './types'

export const files: File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
export const ranks: Rank[] = [1, 2, 3, 4, 5, 6, 7, 8]
export const invRanks: Rank[] = [8, 7, 6, 5, 4, 3, 2, 1]
export const colors: Color[] = ['white', 'black']

export const key2Coord = (k: Key) => [k.charCodeAt(0) - 96, k.charCodeAt(1) - 48] as Coord
export const coord2Key = (c: Coord) => allKeys[8 * c[0] + c[1] - 9]

export function key2Pos(key: Key, size: number): { x: number, y: number } {
  const coord = key2Coord(key)
  return {
    x: (coord[0] - 1) * size,
    y: (8 - coord[1]) * size
  }
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
  return Object.assign(piece, { id: uidGen() })
}
