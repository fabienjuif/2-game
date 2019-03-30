import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Stage } from '@inlet/react-pixi'
import ServerProvider from '../../../server'
import Camera from './camera'
import Mouse from './mouse'
import Stars from './stars'
import Tiles from './tiles'
import BoardContext from '../board'
import './scene.css'

const Scene = ({ width, height }) => {
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
    <ServerProvider.Consumer>
      {serverValue => (
        <BoardContext.Consumer>
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
              <ServerProvider.Provider value={serverValue}>
                <BoardContext.Provider value={value}>
                  {/* <Stars
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                  /> */}

                  <Camera
                    windowWidth={windowWidth}
                    windowHeight={windowHeight}
                    width={width}
                    height={height}
                  >
                    <Tiles  />
                    <Mouse />
                  </Camera>
                </BoardContext.Provider>
              </ServerProvider.Provider>
            </Stage >
          )}
        </BoardContext.Consumer>
      )}
    </ServerProvider.Consumer>
  )
}

export default Scene
