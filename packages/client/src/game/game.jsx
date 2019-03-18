import React, { useState, useEffect } from 'react'
import { Stage } from '@inlet/react-pixi'
import Camera from './camera'
import Tiles from './tiles'
import Bunnies from './bunnies'
import TilesContext from '../contexts/tiles'

const Game = () => {
  const [[width, height], setSize] = useState([])

  useEffect(
    () => {
      setSize([
        window.innerWidth - 20,
        window.innerHeight - 20,
      ])
    },
    []
  )

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
              <Tiles />
            </Camera>
          </TilesContext.Provider>
        </Stage >
      )}
    </TilesContext.Consumer>
  )
}

export default Game
