import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Stage } from '@inlet/react-pixi'
import Camera from './camera'
import Tiles from './tiles'
import Stars from './stars'
import TilesContext from '../contexts/tiles'
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
            <Stars
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
            </Camera>
          </TilesContext.Provider>
        </Stage >
      )}
    </TilesContext.Consumer>
  )
}

export default Game
