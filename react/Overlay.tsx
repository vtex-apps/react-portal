import React, { useRef, useEffect, useState, FunctionComponent } from 'react'
import Portal, { Props as PortalProps } from './components/Portal'

export enum Positioning {
  document = 'document',
  local = 'local',
}

interface Props extends PortalProps {
  positioning: Positioning
}

const Overlay: FunctionComponent<Props> = ({
  children,
  positioning,
  target,
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
                position: 'absolute',
                top: bounds.top,
                left: bounds.left,
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
