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

  const updatePosition = () => {
    if (!fullWindow && container.current) {
      const bounds = container.current.getBoundingClientRect()
      setPosition({
        left: bounds.left,
        top: bounds.top,
      })
    }
  }

  useEffect(updatePosition, [fullWindow])

  useEffect(() => {
    window && window.addEventListener('scroll', updatePosition)

    return () => {
      window && window.removeEventListener('scroll', updatePosition)
    }
  })

  if (!fullWindow) {
    return (
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
