import React, { useState, useEffect } from 'react'
import { Stage } from '@inlet/react-pixi'
import Camera from './camera'
import Tiles from './tiles'
import Bunnies from './bunnies'

const App = () => {
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
      <Bunnies />

      <Camera
        windowWidth={width}
        windowHeight={height}
        width={800}
        height={600}
      >
        <Tiles />
      </Camera>
    </Stage >
  )
}

export default App
