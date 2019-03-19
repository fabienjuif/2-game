import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Stage } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import Camera from './camera'
import Tiles from './tiles'
import Bunnies from './bunnies'
import TilesContext from '../contexts/tiles'
import Light from './light'
import './game.css'

const Game = () => {
  const [[width, height], setSize] = useState([])
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

  if (!width || !height) return false
  return (
    <TilesContext.Consumer>
      {value => (
        <Stage
          width={width}
          height={height}
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
            <Bunnies />

            <Camera
              windowWidth={width}
              windowHeight={height}
              width={800}
              height={600}
            >
              <Tiles  />
            </Camera>

            <Light
              width={width}
              height={height}
              blendMode={PIXI.BLEND_MODES.MULTIPLY}
            />
          </TilesContext.Provider>
        </Stage >
      )}
    </TilesContext.Consumer>
  )
}

export default Game
