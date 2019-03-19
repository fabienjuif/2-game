import React, { useState, useEffect } from 'react'
import { Sprite, useApp } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

const Light = ({ windowWidth, windowHeight, ...props }) => {
  const [texture, setTexture] = useState()
  const app = useApp()

  useEffect(
    () => {
      let renderTexture = PIXI.RenderTexture.create(windowWidth, windowHeight);
      const g = new PIXI.Graphics()
      g.clear()

      g.beginFill(0x000000, 0.5)
      g.drawRect(0, 0, windowWidth, windowHeight)
      g.endFill()

      g.beginFill(0xFFFFFF, 1)
      g.drawCircle(windowWidth / 2, windowHeight / 2, Math.min(windowWidth / 3, windowHeight / 3))

      g.endFill()

      app.renderer.render(g, renderTexture);

      setTexture(renderTexture)
    },
    [windowWidth, windowHeight],
  )

  if (!texture) return null

  return (
      <Sprite
        {...props}
        texture={texture}
        width={windowWidth}
        height={windowHeight}
        x={0}
        y={0}
      />
  )
}

export default Light
