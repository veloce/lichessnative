export type Color = 'white' | 'black'
export type Role = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
export type Key = 'a0' | 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1' | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' | 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8'
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type FEN = string
export type Coord = [number, number]
export type NativePos = { x: number, y: number }
export type PieceTheme = 'cburnett' // | 'merida' etc...

export interface BoardItemProps {
  size: number
  boardKey: Key
}

export interface Piece {
  readonly role: Role
  readonly color: Color
  promoted?: boolean
}

export interface BoardPiece extends Piece {
  readonly id: number
}

export interface Pieces {
  [key: string]: Piece | undefined
}
export type BoardPieces = Record<Key, BoardPiece | undefined>

export interface Drop {
  readonly role: Role
  key: Key
}

export type Light = 'lastMove' | 'check' | 'selected' | 'moveDest' | 'moveDestOccupied'

export type KeyPair = [Key, Key]

export type Dests = Map<Key, Set<Key>>

export interface MaterialDiff {
  white: { [role: string]: number }
  black: { [role: string]: number }
}

export interface Exploding {
  stage: number
  keys: Key[]
}

export interface MoveMetadata {
  premove: boolean
  ctrlKey?: boolean
  holdTime?: number
  captured?: Piece
}
export interface SetPremoveMetadata {
  ctrlKey?: boolean
}
