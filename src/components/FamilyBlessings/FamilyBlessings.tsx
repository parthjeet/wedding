import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'
import PaisleyCorner from '../svg/PaisleyCorner'
import Diya from '../svg/Diya'
import DecorativeDivider from '../svg/DecorativeDivider'
import weddingData from '../../data/weddingData'

gsap.registerPlugin(ScrollTrigger)

const LINE_DELAY_STEP = 0.12

const textRevealInitial = {
  opacity: 0,
  y: 30,
  filter: 'blur(8px)',
} as const

const textRevealAnimate = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
} as const

const textRevealViewport = { once: true, amount: 0.3 } as const

function makeTextTransition(index: number) {
  return {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1] as const,
    delay: index * LINE_DELAY_STEP,
  }
}

const FamilyBlessings: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const leftDiyaRef = useRef<HTMLDivElement>(null)
  const rightDiyaRef = useRef<HTMLDivElement>(null)

  const { familyBlessings } = weddingData

  // GSAP: Animate corner paisley SVGs stroke-draw on scroll
  useGSAP(
    () => {
      const frameEl = frameRef.current
      if (!frameEl) return

      const paths = frameEl.querySelectorAll<SVGGeometryElement>('path, circle')

      paths.forEach((el) => {
        if (typeof el.getTotalLength === 'function') {
          const length = el.getTotalLength()
          gsap.set(el, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
        }
      })

      gsap.to(paths, {
        strokeDashoffset: 0,
        ease: 'none',
        stagger: 0.03,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
      })
    },
    { scope: sectionRef }
  )

  // GSAP: Diya fade-in
  useGSAP(
    () => {
      const diyas = [leftDiyaRef.current, rightDiyaRef.current].filter(Boolean)
      if (diyas.length === 0) return

      gsap.set(diyas, { opacity: 0 })
      gsap.to(diyas, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-dvh flex items-center justify-center overflow-hidden py-16 md:py-24 px-4"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content card with integrated frame */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* The decorative frame wraps the content — uses border + corner ornaments */}
        <div
          ref={frameRef}
          className="relative rounded-sm"
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            padding: 'clamp(1.5rem, 5vw, 3.5rem)',
          }}
        >
          {/* Inner border for double-frame effect */}
          <div
            className="absolute pointer-events-none rounded-sm"
            style={{
              inset: 6,
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          />

          {/* Corner ornaments — these sit at the corners of the frame, scaling with it */}
          <div className="absolute -top-1 -left-1 w-16 h-16 md:w-24 md:h-24 text-gold/40">
            <PaisleyCorner className="w-full h-full" />
          </div>
          <div className="absolute -top-1 -right-1 w-16 h-16 md:w-24 md:h-24 text-gold/40" style={{ transform: 'scaleX(-1)' }}>
            <PaisleyCorner className="w-full h-full" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-16 h-16 md:w-24 md:h-24 text-gold/40" style={{ transform: 'scaleY(-1)' }}>
            <PaisleyCorner className="w-full h-full" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-16 h-16 md:w-24 md:h-24 text-gold/40" style={{ transform: 'scale(-1)' }}>
            <PaisleyCorner className="w-full h-full" />
          </div>

          {/* Diyas — positioned relative to the frame corners */}
          <div
            ref={leftDiyaRef}
            className="absolute -top-10 left-4 md:-top-12 md:left-8 w-8 md:w-12 text-gold opacity-0"
          >
            <Diya className="w-full h-auto" />
          </div>
          <div
            ref={rightDiyaRef}
            className="absolute -top-10 right-4 md:-top-12 md:right-8 w-8 md:w-12 text-gold opacity-0"
          >
            <Diya className="w-full h-auto" />
          </div>

          {/* Text content — ALL inside the frame */}
          <div className="relative text-center flex flex-col items-center gap-1 md:gap-2">
            {/* Top Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={textRevealViewport}
              className="w-40 md:w-56 text-gold/60 origin-center mb-4 md:mb-6"
            >
              <DecorativeDivider className="w-full h-auto" />
            </motion.div>

            {/* Opening line */}
            <motion.p
              initial={textRevealInitial}
              whileInView={textRevealAnimate}
              transition={makeTextTransition(0)}
              viewport={textRevealViewport}
              className="font-heading italic text-lg md:text-xl lg:text-2xl text-gold-light leading-relaxed"
            >
              {familyBlessings.opening}
            </motion.p>

            <div className="h-3 md:h-5" />

            {/* Groom parents */}
            <motion.p
              initial={textRevealInitial}
              whileInView={textRevealAnimate}
              transition={makeTextTransition(1)}
              viewport={textRevealViewport}
              className="font-body tracking-widest text-champagne text-base md:text-lg lg:text-xl"
            >
              {familyBlessings.groomParents}
            </motion.p>

            {/* Cordially invite */}
            <motion.p
              initial={textRevealInitial}
              whileInView={textRevealAnimate}
              transition={makeTextTransition(2)}
              viewport={textRevealViewport}
              className="font-heading italic text-cream text-base md:text-lg lg:text-xl leading-relaxed"
            >
              {familyBlessings.groomIntro}
            </motion.p>

            {/* Parth */}
            <motion.h2
              initial={{ ...textRevealInitial, scale: 0.9 }}
              whileInView={{
                ...textRevealAnimate,
                scale: 1,
                textShadow: [
                  '0 0 20px rgba(201, 168, 76, 0)',
                  '0 0 20px rgba(201, 168, 76, 0.4), 0 0 40px rgba(201, 168, 76, 0.2)',
                ],
              }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 3 * LINE_DELAY_STEP,
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
              }}
              viewport={textRevealViewport}
              className="font-display text-gold gold-glow my-2 md:my-3"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {familyBlessings.groom}
            </motion.h2>

            {/* with */}
            <motion.p
              initial={textRevealInitial}
              whileInView={textRevealAnimate}
              transition={makeTextTransition(4)}
              viewport={textRevealViewport}
              className="font-script text-3xl md:text-4xl lg:text-5xl text-gold-light"
            >
              {familyBlessings.connector}
            </motion.p>

            {/* Anu */}
            <motion.h2
              initial={{ ...textRevealInitial, scale: 0.95 }}
              whileInView={{ ...textRevealAnimate, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: 5 * LINE_DELAY_STEP,
              }}
              viewport={textRevealViewport}
              className="font-display text-gold gold-glow my-1 md:my-2"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {familyBlessings.bride}
            </motion.h2>

            <div className="h-1 md:h-2" />

            {/* Daughter of */}
            <motion.p
              initial={textRevealInitial}
              whileInView={textRevealAnimate}
              transition={makeTextTransition(6)}
              viewport={textRevealViewport}
              className="font-heading italic text-cream text-base md:text-lg mt-1"
            >
              {familyBlessings.brideIntro}
            </motion.p>

            {/* Bride parents */}
            <motion.p
              initial={textRevealInitial}
              whileInView={textRevealAnimate}
              transition={makeTextTransition(7)}
              viewport={textRevealViewport}
              className="font-body tracking-widest text-champagne text-base md:text-lg lg:text-xl"
            >
              {familyBlessings.brideParents}
            </motion.p>

            <div className="h-3 md:h-5" />

            {/* Bottom Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 8 * LINE_DELAY_STEP }}
              viewport={textRevealViewport}
              className="w-40 md:w-56 text-gold/60 origin-center"
            >
              <DecorativeDivider className="w-full h-auto" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FamilyBlessings
