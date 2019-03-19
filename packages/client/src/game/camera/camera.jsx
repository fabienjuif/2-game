import React, { useRef, useEffect, useState } from 'react'
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
  const [scale, setScale] = useState(0.4)
  const [[x, y], setPosition] = useState([(windowWidth - (width * scale)) / 2, (windowHeight - (height * scale)) / 2])
  const ref = useRef(null)

  useEffect(
    () => {
      ref.current.interactive = true
      ref.current.hitArea = new Rectangle(0, 0, width, height)

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
          setPosition(([oldX, oldY]) => [oldX + x - startX, oldY + y - startY])
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
      {children}
    </Container>
  )
}

export default Camera
