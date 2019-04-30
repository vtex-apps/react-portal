import React, { useRef, useEffect, useState, FunctionComponent } from 'react'
import Portal, { Props as PortalProps } from './components/Portal'

interface Props extends PortalProps {
  fullWindow: boolean
}

const Overlay: FunctionComponent<Props> = ({
  children,
  fullWindow,
  target,
}) => {
  const container = useRef<HTMLDivElement>(null)
  const [bounds, setBounds] = useState()

  const updatePosition = () => {
    if (!fullWindow && container.current) {
      setBounds(container.current.getBoundingClientRect())
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
