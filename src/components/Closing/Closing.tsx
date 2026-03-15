import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import confetti from 'canvas-confetti'
import weddingData from '../../data/weddingData'
import Mandala from '../svg/Mandala'
import DecorativeDivider from '../svg/DecorativeDivider'
import { useReducedMotion } from '../../hooks/useReducedMotion'

// ── Phone icon ──
function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold/40"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

// ── Email icon ──
function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold/40"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

// ── Fire confetti from both bottom corners ──
function fireConfetti(): void {
  const colors = ['#C9A84C', '#E8D5A3', '#F5E6C8', '#8B2252']
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 1 },
    colors,
  })
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 1 },
    colors,
  })
}

// ── Staggered date text — split into word spans ──
function StaggeredDate({ text }: { text: string }) {
  const words = text.split(' ')

  return (
    <span className="inline-flex flex-wrap justify-center gap-x-3 md:gap-x-4">
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3 + i * 0.15,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ── Main Closing component ──
const Closing: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasFired, setHasFired] = useState(false)
  const prefersReduced = useReducedMotion()

  const { couple, closing } = weddingData

  // Intersection Observer for confetti trigger
  useEffect(() => {
    if (prefersReduced || hasFired) return

    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasFired) {
          setHasFired(true)
          fireConfetti()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [prefersReduced, hasFired])

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="relative flex flex-col items-center justify-center px-6 md:px-8 overflow-hidden"
      style={{
        backgroundColor: '#0A0A0F',
        minHeight: '100dvh',
      }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto py-20 md:py-28">
        {/* "Save the Date" */}
        <motion.h2
          className="font-display text-gold gold-glow mb-4"
          style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Save the Date
        </motion.h2>

        {/* The date — large, staggered word animation */}
        <motion.p
          className="font-display text-gold gold-glow-strong mb-8"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StaggeredDate text={couple.dateFormatted} />
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
        >
          <DecorativeDivider className="w-48 md:w-64 mx-auto text-gold/40" />
        </motion.div>

        {/* Closing message */}
        <motion.p
          className="font-heading italic text-champagne/90 text-xl md:text-2xl leading-relaxed mb-10 max-w-xl"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {closing.message}
        </motion.p>

        {/* Contact info */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href={`tel:${closing.phone}`}
            className="inline-flex items-center gap-2 font-body text-muted text-base hover:text-gold transition-colors"
          >
            <PhoneIcon />
            {closing.phone}
          </a>
          <a
            href={`mailto:${closing.email}`}
            className="inline-flex items-center gap-2 font-body text-muted text-base hover:text-gold transition-colors"
          >
            <EmailIcon />
            {closing.email}
          </a>
        </motion.div>

        {/* Family sign-off */}
        <motion.p
          className="font-heading text-gold gold-glow text-2xl md:text-3xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {closing.family}
        </motion.p>

        {/* Mandala closing bookend */}
        <motion.div
          className="mb-8"
          animate={{
            opacity: prefersReduced ? 0.3 : [0.2, 0.4, 0.2],
          }}
          transition={
            prefersReduced
              ? undefined
              : {
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }
          }
        >
          <Mandala
            className="text-gold"
            style={{
              width: '150px',
              height: '150px',
              opacity: 0.3,
            }}
          />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="font-body text-muted/40 text-[10px] tracking-[0.2em] uppercase">
          Made with love
        </p>
      </div>
    </section>
  )
}

export default Closing
