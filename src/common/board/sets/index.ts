import { Color, Role, PiecesSet } from '../types'

import Bishop from './cburnett/Bishop'
import King from './cburnett/King'
import Queen from './cburnett/Queen'
import Knight from './cburnett/Knight'
import Rook from './cburnett/Rook'
import Pawn from './cburnett/Pawn'

export interface ThemedPieceProps {
  size: number
  color: Color
}

type PiecesSetComps = Record<PiecesSet, Record<Role, (props: ThemedPieceProps) => JSX.Element>>

export const piecesSet: PiecesSetComps = {
  cburnett: {
    king: King,
    queen: Queen,
    bishop: Bishop,
    knight: Knight,
    rook: Rook,
    pawn: Pawn
  }
}
