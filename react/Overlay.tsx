import React, { useRef, useEffect, useState, FunctionComponent } from 'react'
import Portal, { Props as PortalProps } from './components/Portal'

export enum Positioning {
  document = 'document',
  local = 'local',
}

interface Props extends PortalProps {
  positioning: Positioning
  zIndex?: number
}

const Overlay: FunctionComponent<Props> = ({
  children,
  positioning,
  target,
  zIndex = 2147483647,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState()

  const isPositioningLocal = positioning === Positioning.local

  useEffect(() => {
    if (isPositioningLocal && container.current) {
      setBounds(container.current.getBoundingClientRect())
    }
  }, [isPositioningLocal])

  if (isPositioningLocal) {
    return (
      <div
        ref={container}
        style={{
          width: 1,
          height: 1,
        }}
      >
        {bounds && (
          <Portal target={target}>
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: bounds.top,
                  left: bounds.left,
                }}
              >
                {children}
              </div>
            </div>
          </Portal>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Portal target={target}>{children}</Portal>
    </div>
  )
}

export default Overlay
