import React, { useContext, useEffect, useState } from 'react'
import { Sprite, useApp } from '@inlet/react-pixi'
import TilesContext from '../../contexts/tiles'
import tile from '../tiles/tile.png'
import * as PIXI from 'pixi.js'

const SCALE_FACTOR = 10

const Hover = ({ windowWidth, windowHeight }) => {
  const [texture, setTexture] = useState()
  const { getAvailableTiles, player } = useContext(TilesContext) || {}
  const app = useApp()

  useEffect(() => {
    console.log('render new texture')

    const renderTexture = PIXI.RenderTexture.create(windowWidth * SCALE_FACTOR, windowHeight * SCALE_FACTOR);

    const container = new PIXI.Container()
    container.x = 0
    container.y = 0

    const g = new PIXI.Graphics()
    g.beginFill(0x000000, 0.7)
    g.drawRect(0, 0, windowWidth * SCALE_FACTOR, windowHeight * SCALE_FACTOR)
    g.endFill()
    container.addChild(g)

    let ready = false
    let generated = false
    const generate = () => {
      generated = true
      app.renderer.render(container, renderTexture)
      setTexture(renderTexture)
    }
    let onLoaded = () => {
      if (generated) return
      ready = true
      generate()
    }
    getAvailableTiles().forEach(({ x, y }) => {
      const sprite = new PIXI.Sprite.from(tile);
      sprite.x = (x * 200 + (y % 2 * 100))
      sprite.y = (y * 150)
      sprite.tint = 0xFFFFFF

      if (!sprite.texture.baseTexture.hasLoaded) {
        sprite.texture.baseTexture.on('loaded', onLoaded);
      } else {
        ready = true
      }

      container.addChild(sprite)
    })

    if (ready) generate()
  }, [player])

  if (!texture) return null

  return (
    <Sprite
      texture={texture}
      scale={1 / SCALE_FACTOR}
      blendMode={PIXI.BLEND_MODES.MULTIPLY}
      x={-10}
      y={-10}
    />
  )

    // <Container
    //   {...props}
    //   blendMode={PIXI.BLEND_MODES.MULTIPLY}
    // >
    //   {getAvailableTiles().map(({ key, x, y, object }) => (
    //     <Sprite
    //       key={key}
    //       image={tile}
    //       scale={0.1}
    //       x={x * 20 + (y % 2 * 10)}
    //       y={y * 15}
    //       tint={0xFFFFFF}
    //       alpha={1}
    //     />
    //   ))}
    // </Container>
  // )
}

export default Hover
