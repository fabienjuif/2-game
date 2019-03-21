import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Stage } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import Camera from './camera'
import Tiles from './tiles'
import Bunnies from './bunnies'
import TilesContext from '../contexts/tiles'
import Light from './light'
import Hover from './hover'
import './game.css'

const Game = ({ width, height }) => {
  const [[windowWidth, windowHeight], setSize] = useState([])
  const [mask, setMask] = useState(null)
  const maskRef = useRef(undefined)

  useEffect(
    () => {
      setSize([
        window.innerWidth - 20,
        window.innerHeight - 20,
      ])
    },
    []
  )

  useLayoutEffect(() => {
    if (mask !== maskRef.current) setMask(maskRef.current)
  })

  if (!windowWidth || !windowHeight) return false
  return (
    <TilesContext.Consumer>
      {value => (
        <Stage
          width={windowWidth}
          height={windowHeight}
          options={{
            autoResize: true,
            transparent: true,
            forceFXAA: true,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            roundPixel: false,
            resizeTo: window,
          }}
        >
          <TilesContext.Provider value={value}>
            <Bunnies
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />

            <Camera
              windowWidth={windowWidth}
              windowHeight={windowHeight}
              width={width}
              height={height}
            >
              <Tiles  />

              <Hover
                windowWidth={windowWidth}
                windowHeight={windowHeight}
              />
            </Camera>

            {/* <Light
              windowWidth={windowWidth}
              windowHeight={windowHeight}
              blendMode={PIXI.BLEND_MODES.MULTIPLY}
            /> */}
          </TilesContext.Provider>
        </Stage >
      )}
    </TilesContext.Consumer>
  )
}

export default Game
