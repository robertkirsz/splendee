import { createPortal } from 'react-dom'
import styled from 'styled-components'

import Div from 'components/Div'
import Fade from 'components/Fade'

let root = document.getElementById('modal-root')

if (root === null) {
  root = document.createElement('div')
  root.id = 'modal-root'
  document.body.appendChild(root)
}

type Props = {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ show, onClose, children, ...props }: Props) {
  function handleBackgroundClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.target === event.currentTarget && onClose()
  }

  return createPortal(
    <Fade show={show}>
      <Background onClick={handleBackgroundClick}>
        <Div
          columnTop
          maxHeight="100%"
          minWidth={280}
          maxWidth="100%"
          padding="24px 16px"
          background="var(--near-white)"
          radius={4}
          color="var(--near-black)"
          overflow="auto"
          shadow="box-shadow: rgba(46, 41, 51, 0.08) 0px 7px 19px 11px, rgba(71, 63, 79, 0.08) 0px 2px 4px;"
          {...props}
        >
          {children}
        </Div>
      </Background>
    </Fade>,
    root!
  )
}

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  background: rgba(72, 67, 79, 0.5);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
`
