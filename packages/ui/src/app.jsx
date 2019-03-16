import React from 'react'
import { Stage } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import Tiles from './tiles'
import Bunnies from './bunnies'

// PIXI.settings.RESOLUTION = window.devicePixelRatio;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.CAN_UPLOAD_SAME_BUFFER = true

const App = () => (
  <Stage
    width={800}
    height={600}
    options={{
      backgroundColor: 0xFFFFFF,
      antialias: false,
      roundPixel: false,
      clearBeforeRender: true,
      preserveDrawingBuffer: true,
    }}
  >
    <Tiles
      x={10}
      y={10}
    />

    <Bunnies
      interactive={false}
      interactiveChildren={false}
    />
  </Stage >
)

export default App
