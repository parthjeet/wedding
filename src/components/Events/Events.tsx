import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import weddingData, { type WeddingEvent } from '../../data/weddingData'
import FloralBorder from '../svg/FloralBorder'
import DecorativeDivider from '../svg/DecorativeDivider'

gsap.registerPlugin(ScrollTrigger)

/* ─── Mood Gradients ─── */

interface MoodConfig {
  readonly bg: string
  readonly glow: string
  readonly borderGradient: string
}

const MOOD: Record<string, MoodConfig> = {
  haldi: {
    bg: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(232,185,49,0.12) 0%, transparent 70%)',
    glow: '0 0 60px rgba(232,185,49,0.15), 0 0 120px rgba(232,185,49,0.05)',
    borderGradient: 'linear-gradient(135deg, rgba(232,185,49,0.6), rgba(232,185,49,0.1), rgba(232,185,49,0.4))',
  },
  mehendi: {
    bg: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(45,106,79,0.12) 0%, transparent 70%)',
    glow: '0 0 60px rgba(45,106,79,0.15), 0 0 120px rgba(45,106,79,0.05)',
    borderGradient: 'linear-gradient(135deg, rgba(45,106,79,0.6), rgba(45,106,79,0.1), rgba(45,106,79,0.4))',
  },
  sangeet: {
    bg: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(155,35,53,0.12) 0%, transparent 70%)',
    glow: '0 0 60px rgba(155,35,53,0.15), 0 0 120px rgba(155,35,53,0.05)',
    borderGradient: 'linear-gradient(135deg, rgba(155,35,53,0.6), rgba(155,35,53,0.1), rgba(155,35,53,0.4))',
  },
  pheras: {
    bg: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,118,10,0.15) 0%, transparent 70%)',
    glow: '0 0 80px rgba(212,118,10,0.2), 0 0 160px rgba(212,118,10,0.08)',
    borderGradient: 'linear-gradient(135deg, rgba(212,118,10,0.7), rgba(201,168,76,0.2), rgba(212,118,10,0.5))',
  },
  reception: {
    bg: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(192,178,131,0.1) 0%, transparent 70%)',
    glow: '0 0 60px rgba(192,178,131,0.12), 0 0 120px rgba(192,178,131,0.04)',
    borderGradient: 'linear-gradient(135deg, rgba(192,178,131,0.5), rgba(192,178,131,0.1), rgba(192,178,131,0.3))',
  },
}

/* ─── Staggered Content Variants ─── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const itemSlideUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
}

const itemScale = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 12 },
  },
}

const itemFade = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 16 },
  },
}

/* ─── Chapter Number ─── */

function ChapterNumber({ index, color }: { index: number; color: string }) {
  return (
    <motion.div
      className="absolute -top-6 -left-3 md:-top-8 md:-left-4 font-display select-none pointer-events-none"
      style={{
        fontSize: 'clamp(4rem, 10vw, 7rem)',
        color,
        opacity: 0.07,
        lineHeight: 1,
      }}
      variants={{
        hidden: { opacity: 0, scale: 2.5 },
        visible: {
          opacity: 0.07,
          scale: 1,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {String(index + 1).padStart(2, '0')}
    </motion.div>
  )
}

/* ─── Animated Border SVG ─── */

function AnimatedBorder({ color, cardRef }: { color: string; cardRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 90%', 'start 30%'],
  })
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1200, 0])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      style={{ zIndex: 2 }}
    >
      <motion.rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx="16"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="1200"
        style={{ strokeDashoffset: dashOffset }}
        opacity="0.5"
      />
    </svg>
  )
}

/* ─── Sticky Event Card ─── */

interface EventCardProps {
  readonly event: WeddingEvent
  readonly index: number
  readonly total: number
  readonly reducedMotion: boolean
}

function EventCard({ event, index, total, reducedMotion }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mood = MOOD[event.id] ?? MOOD.reception
  const isPheras = event.id === 'pheras'

  // Sticky offset increases per card for stacking effect
  const stickyTop = 60 + index * 24

  // Scale down as user scrolls past (parallax stacking depth)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.92])
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.7])

  // GSAP: animate the golden vine node when card enters
  const nodeRef = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    if (reducedMotion || !nodeRef.current) return
    gsap.fromTo(
      nodeRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: cardRef })

  return (
    <div
      ref={cardRef}
      className="relative"
      style={{
        position: 'sticky',
        top: stickyTop,
        zIndex: index + 1,
        marginBottom: index < total - 1 ? '30vh' : '10vh',
      }}
    >
      {/* Golden vine node (circle on the left timeline) */}
      <div
        ref={nodeRef}
        className="absolute hidden md:flex items-center justify-center opacity-0"
        style={{
          left: -44,
          top: 40,
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: `2px solid ${event.moodColor}`,
          backgroundColor: '#0A0A0F',
          boxShadow: `0 0 12px ${event.moodColor}40`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: event.moodColor,
          }}
        />
      </div>

      {/* The card itself */}
      <motion.article
        style={{
          scale: reducedMotion ? 1 : scale,
          filter: reducedMotion ? undefined : `brightness(${brightness.get()})`,
        }}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Glassmorphism background */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'rgba(15, 17, 35, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />

        {/* Mood gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: mood.bg }}
        />

        {/* Sacred fire extra glow for Pheras */}
        {isPheras && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: 'radial-gradient(circle at 50% 80%, rgba(212,118,10,0.12) 0%, transparent 50%)',
            }}
          />
        )}

        {/* Animated border that draws on scroll */}
        {!reducedMotion && <AnimatedBorder color={event.moodColor} cardRef={cardRef} />}

        {/* Animated shimmer gradient border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: 1,
            background: mood.borderGradient,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            opacity: 0.4,
          }}
        />

        {/* Card glow shadow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: mood.glow }}
        />

        {/* Content with staggered cascade */}
        <motion.div
          className="relative z-10 p-8 md:p-12 lg:p-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Chapter number watermark */}
          <ChapterNumber index={index} color={event.moodColor} />

          {/* Row: Emoji + Name */}
          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <motion.span
              className="text-4xl md:text-5xl lg:text-6xl block"
              role="img"
              aria-label={event.name}
              variants={itemScale}
            >
              {event.emoji}
            </motion.span>

            <motion.h3
              className="font-display tracking-wide"
              style={{
                color: event.moodColor,
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                textShadow: `0 0 30px ${event.moodColor}30`,
              }}
              variants={itemSlideUp}
            >
              {event.name}
            </motion.h3>
          </div>

          {/* Description */}
          <motion.p
            className="font-heading italic text-cream/90 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 md:mb-8 max-w-2xl"
            variants={itemSlideUp}
          >
            {event.description}
          </motion.p>

          {/* Divider */}
          <motion.div className="w-40 md:w-56 text-gold/30 mb-6 md:mb-8" variants={itemSlideUp}>
            <DecorativeDivider className="w-full h-auto" />
          </motion.div>

          {/* Details row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            {/* Date */}
            <motion.div className="flex items-center gap-2" variants={itemFade}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={event.moodColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="font-body text-base md:text-lg text-gold-light tracking-wider">
                {event.date}
              </span>
            </motion.div>

            {/* Venue */}
            <motion.div className="flex items-center gap-2" variants={itemFade}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={event.moodColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-body text-base md:text-lg font-semibold text-champagne">
                {event.venue}
              </span>
            </motion.div>
          </div>

          {/* Address */}
          <motion.p
            className="font-body text-sm md:text-base text-muted mt-2 ml-0 sm:ml-[26px]"
            variants={itemFade}
          >
            {event.address}
          </motion.p>
        </motion.div>
      </motion.article>
    </div>
  )
}

/* ─── Golden Vine (Vertical Timeline Line) ─── */

function GoldenVine({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 80%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      className="absolute left-8 md:left-12 lg:left-[calc(50%-340px)] top-0 bottom-0 hidden md:block"
      style={{ width: 2, zIndex: 0 }}
    >
      {/* Background track */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(201,168,76,0.08)',
          width: 2,
        }}
      />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full"
        style={{
          background: 'linear-gradient(to bottom, #C9A84C, #E8D5A3, #C9A84C)',
          height: '100%',
          scaleY,
          transformOrigin: 'top',
          boxShadow: '0 0 8px rgba(201,168,76,0.4)',
        }}
      />
    </div>
  )
}

/* ─── Main Events Component ─── */

const Events: React.FC = () => {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const events = weddingData.events

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Section Title */}
      <div className="relative z-10 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="w-48 md:w-64 mx-auto text-gold/40 origin-center mb-6"
        >
          <FloralBorder className="w-full h-auto" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl lg:text-5xl text-gold tracking-wide gold-glow"
        >
          Celebrations
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="w-48 md:w-64 mx-auto text-gold/40 origin-center mt-6"
        >
          <FloralBorder className="w-full h-auto" />
        </motion.div>
      </div>

      {/* Golden Vine Timeline */}
      {!reducedMotion && <GoldenVine sectionRef={sectionRef} />}

      {/* Sticky Stacking Cards */}
      <div className="relative px-4 md:px-8 lg:px-0 max-w-3xl mx-auto md:ml-auto md:mr-auto md:pl-16 lg:pl-8">
        {events.map((event, i) => (
          <EventCard
            key={event.id}
            event={event}
            index={i}
            total={events.length}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* Bottom spacer for last sticky card to unstick */}
      <div style={{ height: '20vh' }} />
    </section>
  )
}

export default Events
