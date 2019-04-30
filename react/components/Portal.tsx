import { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'

export interface Props {
  target?: HTMLElement
}

const Portal: FunctionComponent<Props> = ({ children, target }) => {
  if (!target) {
    target = window && window.document && window.document.body
  }

  if (!target) {
    return null
  }

  return ReactDOM.createPortal(children, target)
}

export default Portal
