import { useEffect, useState } from 'react'

type Props = {
  show: boolean
  children: React.ReactNode
}

export default function Fade({ show, children }: Props) {
  const [shouldRender, setShouldRender] = useState(show)

  useEffect(() => {
    if (show) setShouldRender(true)
  }, [show])

  function onAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget && !show) setShouldRender(false)
  }

  if (!shouldRender) return null

  return (
    <div
      style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 200ms` }}
      onAnimationEnd={onAnimationEnd}
      data-testid="Fade"
    >
      {children}
    </div>
  )
}
