import React, { useState, useEffect } from 'react'
import { Sprite, useApp } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'

const Light = ({ width, height, ...props }) => {
  const [texture, setTexture] = useState()
  const app = useApp()

  useEffect(
    () => {
      let renderTexture = PIXI.RenderTexture.create(width, height);
      const g = new PIXI.Graphics()
      g.clear()

      g.beginFill(0x000000, 0.5)
      g.drawRect(0, 0, width, height)
      g.endFill()

      g.beginFill(0xFFFFFF, 1)
      g.drawCircle(width / 2 , height / 2, 100)

      g.endFill()

      app.renderer.render(g, renderTexture);

      setTexture(renderTexture)
    },
    [width, height],
  )

  if (!texture) return null

  return (
      <Sprite
        {...props}
        texture={texture}
        width={width}
        height={height}
        x={0}
        y={0}
      />
  )
}

export default Light
