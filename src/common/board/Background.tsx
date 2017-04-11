import React from 'react'
import Svg, { G, Rect, Use } from 'react-native-svg'

interface Props {
  size: number
  lightColor: string
  darkColor: string
}

const Background = ({ size, lightColor, darkColor }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 800 800">
    <G>
      <G id="Light" fill={lightColor}>
        <Rect width="800" height="800"/>
      </G>
      <G id="Frame" fill="none">
        <Rect width="800" height="800"/>
      </G>
      <G id="Dark" fill={darkColor}>
        <G id="raz">
          <G id="dva">
            <G id="tri">
              <Rect x="100" width="100" height="100"/>
              <Rect x="300" width="100" height="100"/>
              <Rect x="500" width="100" height="100"/>
              <Rect x="700" width="100" height="100"/>
            </G>
            <Use x="-100" y="100" href="#tri"/>
          </G>
          <Use x="0" y="200" href="#dva"/>
        </G>
        <Use x="0" y="400" href="#raz"/>
      </G>
    </G>
  </Svg>
)

export default Background
