import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'
import PaisleyCorner from '../svg/PaisleyCorner'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import weddingData from '../../data/weddingData'

// Split a string into individually wrapped spans for letter-by-letter animation
function LetterSpans({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <>
      {text.split('').map((letter, i) => (
        <span
          key={`${letter}-${i}`}
          className={`inline-block letter-span ${className ?? ''}`}
          style={{ opacity: 0 }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </>
  )
}

// Animate all SVG stroke paths within a container for a draw-in effect
function animateDrawSVG(
  tl: gsap.core.Timeline,
  container: Element,
  position: string | number,
  duration: number = 1.5
): void {
  const paths = container.querySelectorAll('path')
  const circles = container.querySelectorAll('circle')
  const targets = [...Array.from(paths), ...Array.from(circles)]

  targets.forEach((el) => {
    const svgEl = el as SVGGeometryElement
    if (typeof svgEl.getTotalLength === 'function') {
      const length = svgEl.getTotalLength()
      gsap.set(svgEl, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    }
  })

  // Filled dots get opacity animation
  const dots = container.querySelectorAll('circle[fill]')
  gsap.set(dots, { opacity: 0 })

  tl.to(
    targets.filter(
      (el) => !el.getAttribute('fill') || el.getAttribute('fill') === 'none'
    ),
    {
      strokeDashoffset: 0,
      duration,
      ease: 'power2.inOut',
      stagger: 0.05,
    },
    position
  )

  tl.to(
    dots,
    {
      opacity: 1,
      duration: 0.4,
      stagger: 0.03,
    },
    `${position}+=0.5`
  )
}

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const groomRef = useRef<HTMLHeadingElement>(null)
  const brideRef = useRef<HTMLHeadingElement>(null) // h2
  const ampersandRef = useRef<HTMLSpanElement>(null)
  const marriedRef = useRef<HTMLParagraphElement>(null)
  const dateRef = useRef<HTMLParagraphElement>(null)
  const cityRef = useRef<HTMLParagraphElement>(null)
  const cornerTLRef = useRef<HTMLDivElement>(null)
  const cornerTRRef = useRef<HTMLDivElement>(null)
  const cornerBLRef = useRef<HTMLDivElement>(null)
  const cornerBRRef = useRef<HTMLDivElement>(null)

  const { couple, invocation } = weddingData

  // Mouse parallax — different intensities for corners vs subtle overlay
  const cornersParallax = useMouseParallax(15)
  const overlayParallax = useMouseParallax(5)

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.2,
        })

        // 1. Groom name letters stagger in
        const groomLetters = groomRef.current?.querySelectorAll('.letter-span')
        if (groomLetters?.length) {
          tl.fromTo(
            groomLetters,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power3.out',
            },
            0.3
          )
        }

        // 2. Ampersand scales in with elastic ease
        tl.fromTo(
          ampersandRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.5)',
          },
          0.7
        )

        // 3. Bride name letters stagger in
        const brideLetters = brideRef.current?.querySelectorAll('.letter-span')
        if (brideLetters?.length) {
          tl.fromTo(
            brideLetters,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power3.out',
            },
            0.9
          )
        }

        // 4. "Are Getting Married" fades up
        tl.fromTo(
          marriedRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          1.4
        )

        // 5. Date and city stagger in
        tl.fromTo(
          dateRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.7
        )

        tl.fromTo(
          cityRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.9
        )

        // 6. Paisley corners draw in
        const corners = [
          cornerTLRef.current,
          cornerTRRef.current,
          cornerBLRef.current,
          cornerBRRef.current,
        ].filter(Boolean) as HTMLDivElement[]

        corners.forEach((corner, i) => {
          animateDrawSVG(tl, corner, 0.4 + i * 0.15)
        })
      }, section)

      return () => ctx.revert()
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh overflow-hidden flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Radial gradient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Subtle parallax overlay for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          x: overlayParallax.x,
          y: overlayParallax.y,
          background:
            'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(201, 168, 76, 0.03) 0%, transparent 60%)',
        }}
      />

      {/* Paisley Corners with parallax */}
      <motion.div
        ref={cornerTLRef}
        className="absolute top-4 left-4 w-20 h-20 md:top-8 md:left-8 md:w-28 md:h-28 lg:w-36 lg:h-36 text-gold/40"
        style={{ x: cornersParallax.x, y: cornersParallax.y }}
      >
        <PaisleyCorner className="w-full h-full" />
      </motion.div>

      <motion.div
        ref={cornerTRRef}
        className="absolute top-4 right-4 w-20 h-20 md:top-8 md:right-8 md:w-28 md:h-28 lg:w-36 lg:h-36 text-gold/40"
        style={{
          x: cornersParallax.x,
          y: cornersParallax.y,
          transform: 'scaleX(-1)',
        }}
      >
        <PaisleyCorner className="w-full h-full" />
      </motion.div>

      <motion.div
        ref={cornerBLRef}
        className="absolute bottom-4 left-4 w-20 h-20 md:bottom-8 md:left-8 md:w-28 md:h-28 lg:w-36 lg:h-36 text-gold/40"
        style={{
          x: cornersParallax.x,
          y: cornersParallax.y,
          transform: 'scaleY(-1)',
        }}
      >
        <PaisleyCorner className="w-full h-full" />
      </motion.div>

      <motion.div
        ref={cornerBRRef}
        className="absolute bottom-4 right-4 w-20 h-20 md:bottom-8 md:right-8 md:w-28 md:h-28 lg:w-36 lg:h-36 text-gold/40"
        style={{
          x: cornersParallax.x,
          y: cornersParallax.y,
          transform: 'scale(-1)',
        }}
      >
        <PaisleyCorner className="w-full h-full" />
      </motion.div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center gap-2 px-6 text-center">
        {/* Sanskrit invocation — blur-in via Motion */}
        <motion.p
          className="font-heading italic text-gold text-base md:text-lg lg:text-xl tracking-[0.2em] gold-glow mb-4"
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          {invocation}
        </motion.p>

        {/* Groom name */}
        <h1
          ref={groomRef}
          className="font-display text-gold tracking-[0.25em] md:tracking-[0.35em] leading-none gold-glow overflow-hidden"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          <LetterSpans text={couple.groom} />
        </h1>

        {/* Ampersand */}
        <span
          ref={ampersandRef}
          className="font-script text-gold block leading-none gold-glow opacity-0"
          style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}
        >
          &amp;
        </span>

        {/* Bride name */}
        <h2
          ref={brideRef}
          className="font-display text-gold tracking-[0.25em] md:tracking-[0.35em] leading-none gold-glow overflow-hidden"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
        >
          <LetterSpans text={couple.bride} />
        </h2>

        {/* "Are Getting Married" */}
        <p
          ref={marriedRef}
          className="font-heading italic text-gold-light text-xl md:text-2xl lg:text-3xl tracking-[0.2em] mt-4 opacity-0"
        >
          Are Getting Married
        </p>

        {/* Date */}
        <p
          ref={dateRef}
          className="font-body text-gold text-base md:text-lg lg:text-xl tracking-[0.3em] mt-6 opacity-0"
        >
          {couple.dateFormatted}
        </p>

        {/* City */}
        <p
          ref={cityRef}
          className="font-body text-gold/60 text-sm md:text-base lg:text-lg tracking-[0.4em] uppercase mt-1 opacity-0"
        >
          {couple.city}
        </p>
      </div>

      {/* Scroll-down indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          className="text-gold/40"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <path
            d="M10 2 L10 22 M4 16 L10 22 L16 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  )
}

export default Hero
