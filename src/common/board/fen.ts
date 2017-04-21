import mapValues from 'lodash/mapValues'

import { coord2Key, ranks, invRanks, emptyPiecesRecord, boardPiece } from './util'
import { FEN, Role, Piece, Pieces, Color, BoardPieces } from './types'

export const initial: FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

export function initialBoard(fen: FEN, uidGen: () => number): BoardPieces {
  const pieces = read(fen)
  const boardPieces = mapValues(pieces, p => boardPiece(p, uidGen))
  return Object.assign({}, emptyPiecesRecord, boardPieces)
}

export function read(fen: FEN): Pieces {
  const pieces: { [k: string]: Piece } = {}
  let row: number = 8
  let col: number = 0
  for (let i = 0; i < fen.length; i++) {
    const c = fen[i]
    switch (c) {
      case ' ': return pieces
      case '/':
        --row
        if (row === 0) return pieces
        col = 0
        break
      case '~':
        pieces[coord2Key([col, row])].promoted = true
        break
      default:
        const nb = ~~c
        if (nb) col += nb
        else {
          ++col
          const role = c.toLowerCase()
          pieces[coord2Key([col, row])] = {
            role: roles[role],
            color: (c === role ? 'black' : 'white') as Color
          }
        }
    }
  }
  return pieces
}

export function write(pieces: Pieces): FEN {
  let piece: Piece, letter: string
  return invRanks.map(y => ranks.map(x => {
      piece = pieces[coord2Key([x, y])]
      if (piece) {
        letter = letters[piece.role]
        return piece.color === 'white' ? letter.toUpperCase() : letter
      } else return '1'
    }).join('')
  ).join('/').replace(/1{2,}/g, s => s.length.toString())
}

const roles: { [letter: string]: Role } = { p: 'pawn', r: 'rook', n: 'knight', b: 'bishop', q: 'queen', k: 'king' }

const letters = { pawn: 'p', rook: 'r', knight: 'n', bishop: 'b', queen: 'q', king: 'k' }
