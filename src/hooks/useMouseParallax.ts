import { useMotionValue, useSpring, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { useHasHover } from './useMediaQuery'

interface ParallaxValues {
  x: ReturnType<typeof useSpring>
  y: ReturnType<typeof useSpring>
}

export function useMouseParallax(intensity: number = 20): ParallaxValues {
  const hasHover = useHasHover()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 50, damping: 30, mass: 1 }

  const transformedX = useTransform(mouseX, (v) => v * intensity)
  const transformedY = useTransform(mouseY, (v) => v * intensity)

  const x = useSpring(transformedX, springConfig)
  const y = useSpring(transformedY, springConfig)

  useEffect(() => {
    if (!hasHover) return

    const handleMouse = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set((e.clientX - centerX) / centerX)
      mouseY.set((e.clientY - centerY) / centerY)
    }

    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [hasHover, mouseX, mouseY])

  return { x, y }
}
