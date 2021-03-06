import React, { cloneElement, useRef, useEffect, useState, Children } from 'react'
import { Container } from '@inlet/react-pixi'
import { Rectangle } from 'pixi.js'

const Camera = ({
  children,
  width,
  height,
  windowWidth,
  windowHeight,
  ...props,
}) => {
  const [scale, setScale] = useState(Math.min(windowWidth / ((width * 20) + 100), windowHeight / ((height * 15) + 100)))
  const [[x, y], setPosition] = useState([(windowWidth - (width * scale * 20)) / 2, (windowHeight - (height * 15 * scale)) / 2])
  const ref = useRef(null)

  useEffect(
    () => {
      ref.current.interactive = true
      // TODO: hit area should depend on width/height given by server (or local game)
      ref.current.hitArea = new Rectangle(0, 0, 100 * 20, 100 * 20)

      document.body.addEventListener('wheel', (e) => {
        e.preventDefault()
        setScale(curr => Math.max(0.1, Math.min(3, curr - (e.deltaY / 100))))
        // TODO: zoom where the pointer is
      })

      ref.current.on('pointerupoutside', () => {
        ref.current.clickStart = undefined
        ref.current.pinchStart = undefined
      })
      ref.current.on('pointerup', () => {
        ref.current.clickStart = undefined
        ref.current.pinchStart = undefined
      })

      ref.current.on('pointermove', (e) => {
        const { global, buttons } = e.data

        // pinch
        if (e.data.originalEvent.touches && e.data.originalEvent.touches.length > 1) {
          const [{ clientX: firstX, clientY: firstY }, { clientX: secondX, clientY: secondY }] = e.data.originalEvent.touches
          const distance = (secondX - firstX) ** 2 + (secondY - firstY) ** 2

          if (ref.current.pinchStart) {
            setScale(curr => Math.max(0.1, Math.min(3, curr + (distance - ref.current.pinchStart) / 100000)))
          }

          ref.current.pinchStart = distance

          return
        }

        // click
        if (buttons === 0) return

        const { x, y } = global

        if (ref.current.clickStart) {
          const [startX, startY] = ref.current.clickStart
          // TODO: size should be retrieven from the board (local or online)
          setPosition(([oldX, oldY]) => [
            Math.max(Math.min(oldX + x - startX, (100 * 5 * scale)), (-100 * 5 * scale)),
            Math.max(Math.min(oldY + y - startY, (100 * 5 * scale)), (-100 * 5 * scale)),
          ])
        }

        ref.current.clickStart = [x, y]
      })
    },
    [],
  )

  return (
    <Container
      {...props}
      ref={ref}
      x={x}
      y={y}
      scale={scale}
    >
      {Children.toArray(children).map(c => cloneElement(c, { camera: { x, y, scale } }))}
    </Container>
  )
}

export default Camera
