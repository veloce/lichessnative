import 'react-native';
import React from 'react';

import Board from '../build/common/board/Board';
import * as boardUtil from '../build/common/board/util';
import * as fenUtil from '../build/common/board/fen';
import { defaults as boardDefaultConf } from '../build/common/board/config'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-svg', () => {
  const React = require('react')
  // eslint-disable-next-line no-undef
  const ReactNativeSvg = jest.genMockFromModule('react-native-svg')

  const svgElementMockGenerator = (name, propTypes) => {
    function SvgMock() {
      return (
        React.createElement(name, null, null)
      )
    }

    SvgMock.displayName = name
    SvgMock.propTypes = propTypes

    return SvgMock
  }

  const Svg = svgElementMockGenerator('Svg', ReactNativeSvg.Svg.propTypes)

  Svg.Rect = svgElementMockGenerator('Rect', ReactNativeSvg.Rect.propTypes)
  Svg.G = svgElementMockGenerator('G', ReactNativeSvg.G.propTypes)
  Svg.LinearGradient = svgElementMockGenerator(
    'LinearGradient',
    ReactNativeSvg.LinearGradient.propTypes
  )
  Svg.Path = svgElementMockGenerator('Path', ReactNativeSvg.Path.propTypes)
  Svg.Circle = svgElementMockGenerator('Circle', ReactNativeSvg.Circle.propTypes)
  Svg.Symbol = svgElementMockGenerator('Symbol', ReactNativeSvg.Symbol.propTypes)
  Svg.Use = svgElementMockGenerator('Use', ReactNativeSvg.Use.propTypes)
  Svg.Stop = svgElementMockGenerator('Stop', ReactNativeSvg.Stop.propTypes)
  Svg.Defs = svgElementMockGenerator('Defs', ReactNativeSvg.Defs.propTypes)

  return Svg
})

it('renders correctly', () => {

  const uidGen = boardUtil.uidGenFactory()
  const state = {
    orientation: 'white',
    turnColor: 'white',
    pieces: fenUtil.initialBoard(fenUtil.initial, uidGen),
    selected: null,
    moveDests: null,
    check: null,
  }
  const boardHandlers = {
    onSelectSquare: () => {},
    onMove: () => {}
  }

  const tree = renderer.create(
    <Board
      state={state}
      handlers={boardHandlers}
      config={boardDefaultConf}
      size={400}
    />
  );
});
