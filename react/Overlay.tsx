import React, { useRef, useEffect, useState, FunctionComponent } from 'react'
import Portal, { Props as PortalProps } from './components/Portal'

interface Props extends PortalProps {
  fullWindow: boolean
}

interface Position {
  left: number
  top: number
}

const Overlay: FunctionComponent<Props> = ({
  children,
  fullWindow,
  target,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>()

  useEffect(() => {
    const updatePosition = () => {
      if (!fullWindow && container.current) {
        const bounds = container.current.getBoundingClientRect()
        setPosition({
          left: bounds.left,
          top: bounds.top,
        })
      }
    }

    updatePosition()

    if (window) {
      window.addEventListener('scroll', updatePosition)
      window.addEventListener('load', updatePosition)
      window.addEventListener('resize', updatePosition)
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', updatePosition)
        window.removeEventListener('load', updatePosition)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [fullWindow])

  if (!fullWindow) {
    return (
      // Div used for anchoring the position of the overlay, for popovers etc
      <div
        ref={container}
        style={{
          width: 1,
          height: 1,
        }}
      >
        {position && (
          <Portal target={target}>
            <div
              style={{
                position: 'absolute',
                left: position.left,
                top: position.top,
              }}
            >
              {children}
            </div>
          </Portal>
        )}
      </div>
    )
  }

  return (
    <Portal target={target} cover>
      {children}
    </Portal>
  )
}

export default Overlay
