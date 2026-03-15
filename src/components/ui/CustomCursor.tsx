import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useHasHover } from '../../hooks/useMediaQuery'

export default function CustomCursor() {
  const hasHover = useHasHover()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasHover) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' })
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' })
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power2.out' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power2.out' })

    const handleMouseMove = (e: MouseEvent) => {
      moveDotX(e.clientX - 4)
      moveDotY(e.clientY - 4)
      moveRingX(e.clientX - 18)
      moveRingY(e.clientY - 18)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="hover"]')) {
        gsap.to(ring, { scale: 1.6, duration: 0.3, ease: 'power2.out' })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="hover"]')) {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [hasHover])

  if (!hasHover) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#C9A84C',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid #C9A84C',
          pointerEvents: 'none',
          zIndex: 99998,
        }}
      />
    </>
  )
}
