import { Color } from './types'

interface Config {
  coordinates: boolean // include coords attributes
  autoCastle: boolean // immediately complete the castle by moving the rook after king move
  viewOnly: boolean // don't bind events: the user will never be able to move pieces around
  animation: Readonly<{
    enabled: boolean
    duration: number
  }>
  highlight: Readonly<{
    lastMove: boolean // add last-move class to squares
    check: boolean // add check class to squares
    dests: boolean // whether to add the move-dest class on squares
    premoveDests: boolean // whether to add the premove-dest class on squares
  }>
  movable: Readonly<{
    free: boolean // all moves are valid - board editor
    color: Color | 'both' // color that can move. white | black | both
  }>
  premovable: Readonly<{
    enabled: boolean // allow premoves for color that can not move
    castle: boolean // whether to allow king castle premoves
  }>
  draggable: Readonly<{
    enabled: boolean // allow moves & premoves to use drag'n drop
    deleteOnDropOff: boolean // delete a piece when it is dropped off the board
  }>
  selectable: Readonly<{
    // disable to enforce dragging over tap-tap move
    enabled: boolean
  }>
}

export type BoardConfig = Readonly<Config>

export const defaults: BoardConfig = {
  coordinates: true,
  autoCastle: true,
  viewOnly: false, // don't bind events: the user will never be able to move pieces around
  animation: {
    enabled: true,
    duration: 200
  },
  highlight: {
    lastMove: true,
    check: true,
    dests: true,
    premoveDests: true
  },
  movable: {
    free: false,
    color: 'both'
  },
  premovable: {
    enabled: true,
    castle: true
  },
  draggable: {
    enabled: true,
    deleteOnDropOff: false
  },
  selectable: {
    enabled: true
  }
}
