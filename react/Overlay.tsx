import React, {
  useRef,
  useEffect,
  useState,
  FunctionComponent,
  useCallback,
} from 'react'
import Portal, { Props as PortalProps } from './components/Portal'

interface Props extends PortalProps {
  fullWindow: boolean
  alignment: HorizontalAlignment
}

interface Position {
  x: number
  y: number
}

enum HorizontalAlignment {
  right = 'right',
  left = 'left',
  center = 'center',
}

const getXPositionByHorizontalAlignment = (
  alignment: HorizontalAlignment,
  bounds: ClientRect | DOMRect
) => {
  switch (alignment) {
    case 'left':
      return bounds.left
    case 'right':
      return bounds.right
    case 'center':
      return (bounds.right + bounds.left) / 2
    default:
      return bounds.left
  }
}

const getJustifyTypeByHorizontalAlignment = (
  alignment: HorizontalAlignment
) => {
  switch (alignment) {
    case 'left':
      return 'justify-start'
    case 'right':
      return 'justify-end'
    case 'center':
      return 'justify-center'
    default:
      return 'justify-start'
  }
}

const Overlay: FunctionComponent<Props> = ({
  children,
  fullWindow,
  target,
  alignment = HorizontalAlignment.left,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>()

  const updatePosition = useCallback(() => {
    if (container.current) {
      const bounds = container.current.getBoundingClientRect()

      setPosition({
        x: !fullWindow
          ? getXPositionByHorizontalAlignment(alignment, bounds)
          : 0,
        y: bounds.top,
      })
    }
  }, [alignment, fullWindow])

  useEffect(() => {
    updatePosition()

    if (window) {
      window.addEventListener('scroll', updatePosition)
      window.addEventListener('load', updatePosition)
      window.addEventListener('resize', updatePosition)
      window.addEventListener('visibilitychange', updatePosition)
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', updatePosition)
        window.removeEventListener('load', updatePosition)
        window.removeEventListener('resize', updatePosition)
        window.removeEventListener('visibilitychange', updatePosition)
      }
    }
  }, [alignment, fullWindow, updatePosition, children])

  if (!fullWindow) {
    return (
      // Div used for anchoring the position of the overlay, for popovers etc
      <div
        ref={container}
        style={{
          width: 'auto',
          height: 1,
          marginTop: -1,
        }}
      >
        {position && (
          <Portal target={target}>
            <div
              className={`flex ${getJustifyTypeByHorizontalAlignment(
                alignment
              )}`}
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
              }}
            >
              <div className="absolute">{children}</div>
            </div>
          </Portal>
        )}
      </div>
    )
  }

  return (
    <div ref={container}>
      {position && (
        <Portal target={target} cover>
          <div
            style={{ position: 'absolute', top: position.y, width: '100vw' }}
          >
            {children}
          </div>
        </Portal>
      )}
    </div>
  )
}

export default Overlay
