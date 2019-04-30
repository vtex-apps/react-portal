import React, { useRef, useEffect, useState, FunctionComponent } from 'react'
import Portal, { Props as PortalProps } from './components/Portal'

enum Positioning {
  window = 'window',
  parent = 'parent',
}

interface Props extends PortalProps {
  positioning: Positioning
}

const Overlay: FunctionComponent<Props> = ({
  children,
  positioning = Positioning.window,
  target,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState()

  const isParentPositioning = positioning === Positioning.parent

  useEffect(() => {
    if (isParentPositioning && container.current) {
      setBounds(container.current.getBoundingClientRect())
    }
  }, [isParentPositioning])

  if (isParentPositioning) {
    return (
      <div ref={container}>
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

  return <Portal target={target}>{children}</Portal>
}

export default Overlay
