import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'
import { useDeviceCapability } from './useDeviceCapability'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReduced = useReducedMotion()
  const tier = useDeviceCapability()

  useEffect(() => {
    if (prefersReduced || tier === 'low') {
      ScrollTrigger.defaults({ scroller: undefined })
      return
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const rafHandler = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafHandler)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove(rafHandler)
    }
  }, [prefersReduced, tier])

  return lenisRef
}
