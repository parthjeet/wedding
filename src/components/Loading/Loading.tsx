import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Mandala from '../svg/Mandala'

interface LoadingProps {
  onComplete: () => void
}

function animateRingPaths(
  tl: gsap.core.Timeline,
  ringEl: Element,
  position: string
): void {
  const paths = ringEl.querySelectorAll('path')
  const circles = ringEl.querySelectorAll('circle:not([fill])')

  const strokeTargets = [...Array.from(paths), ...Array.from(circles)]

  strokeTargets.forEach((el) => {
    const svgEl = el as SVGGeometryElement
    if (typeof svgEl.getTotalLength === 'function') {
      const length = svgEl.getTotalLength()
      gsap.set(svgEl, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    }
  })

  // Filled dots (circles with fill="currentColor") get opacity animation
  const dots = ringEl.querySelectorAll('circle[fill]')
  gsap.set(dots, { opacity: 0 })

  tl.to(
    strokeTargets,
    {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      stagger: 0.04,
    },
    position
  )

  tl.to(
    dots,
    {
      opacity: 1,
      duration: 0.4,
      stagger: 0.02,
    },
    `${position}+=0.3`
  )
}

const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mandalaRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const [animationDone, setAnimationDone] = useState(false)
  const exitTriggeredRef = useRef(false)

  const triggerExit = useCallback(() => {
    if (exitTriggeredRef.current || !containerRef.current) return
    exitTriggeredRef.current = true

    const container = containerRef.current
    const exitTl = gsap.timeline({ onComplete })

    exitTl.to(counterRef.current, { opacity: 0, duration: 0.2 })
    exitTl.to(nameRef.current, { opacity: 0, duration: 0.2 }, '<')
    exitTl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.2 }, '<')
    exitTl.to(container, { y: '-100%', duration: 0.8, ease: 'power3.inOut' })
  }, [onComplete])

  // Listen for user interaction after animation completes
  useEffect(() => {
    if (!animationDone) return

    const handler = () => triggerExit()

    window.addEventListener('click', handler, { once: true })
    window.addEventListener('touchstart', handler, { once: true })
    window.addEventListener('wheel', handler, { once: true })

    return () => {
      window.removeEventListener('click', handler)
      window.removeEventListener('touchstart', handler)
      window.removeEventListener('wheel', handler)
    }
  }, [animationDone, triggerExit])

  useGSAP(
    () => {
      const container = containerRef.current
      const mandalaWrapper = mandalaRef.current
      if (!container || !mandalaWrapper) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setAnimationDone(true),
        })

        // Counter object for animating percentage text
        const counter = { value: 0 }

        // Phase 1: Draw each ring with stagger
        const rings = [
          mandalaWrapper.querySelector('.mandala-ring-1'),
          mandalaWrapper.querySelector('.mandala-ring-2'),
          mandalaWrapper.querySelector('.mandala-ring-3'),
          mandalaWrapper.querySelector('.mandala-ring-4'),
          mandalaWrapper.querySelector('.mandala-ring-5'),
        ].filter(Boolean) as Element[]

        // Set initial state — mandala invisible
        gsap.set(mandalaWrapper, { opacity: 1 })

        rings.forEach((ring, i) => {
          const position = `ring${i}`
          tl.addLabel(position, i * 0.3)
          animateRingPaths(tl, ring, position)
        })

        // Phase 2: Gold shimmer — transition stroke color
        tl.to(
          mandalaWrapper.querySelectorAll('path, circle'),
          {
            color: '#F0D078',
            duration: 0.6,
            ease: 'power1.inOut',
            stagger: 0.01,
          },
          '-=0.5'
        )

        tl.to(
          mandalaWrapper.querySelectorAll('path, circle'),
          {
            color: '#C9A84C',
            duration: 0.4,
            ease: 'power1.inOut',
          },
          '-=0.1'
        )

        // Phase 3: Percentage counter (runs alongside drawing)
        tl.to(
          counter,
          {
            value: 100,
            duration: 2.5,
            ease: 'power1.inOut',
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = `${Math.round(counter.value)}%`
              }
            },
          },
          0
        )

        // Phase 3b: "Parth & Anu" text fades in midway
        tl.fromTo(
          nameRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          1.2
        )

        // Phase 4: Mandala pulse
        tl.to(mandalaWrapper, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        })

        tl.to(mandalaWrapper, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      }, container)

      return () => ctx.revert()
    },
    { scope: containerRef }
  )

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Mandala */}
      <div
        ref={mandalaRef}
        className="w-[300px] md:w-[400px] text-gold opacity-0"
      >
        <Mandala className="w-full h-full" />
      </div>

      {/* Percentage counter */}
      <span
        ref={counterRef}
        className="font-body text-gold/60 text-sm tracking-[0.3em] mt-6"
      >
        0%
      </span>

      {/* Couple names */}
      <p
        ref={nameRef}
        className="font-heading italic text-gold text-lg tracking-[0.15em] mt-4 opacity-0"
      >
        Parth &amp; Anu
      </p>

      {/* Scroll indicator — appears after animation completes */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 flex flex-col items-center gap-3 transition-opacity duration-700"
        style={{ opacity: animationDone ? 1 : 0 }}
      >
        <span
          className="font-body text-gold/50 text-xs tracking-[0.25em] uppercase"
        >
          Scroll to enter
        </span>
        <div className="flex flex-col items-center animate-bounce">
          <svg
            width="20"
            height="28"
            viewBox="0 0 20 28"
            fill="none"
            className="text-gold/40"
          >
            {/* Mouse outline */}
            <rect
              x="1"
              y="1"
              width="18"
              height="26"
              rx="9"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            {/* Scroll wheel dot */}
            <circle cx="10" cy="8" r="1.5" fill="currentColor">
              <animate
                attributeName="cy"
                values="8;14;8"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Loading
