import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import weddingData from '../../data/weddingData'
import DecorativeDivider from '../svg/DecorativeDivider'

// ── Map pin icon ──
function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ── Arrow right icon ──
function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

// ── Dotted connector line between cards ──
function DottedConnector() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scaleY = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <div ref={ref} className="flex justify-center py-2">
      <motion.div
        className="w-px h-12"
        style={{
          borderLeft: '2px dotted rgba(201,168,76,0.3)',
          scaleY,
          transformOrigin: 'top',
        }}
      />
    </div>
  )
}

// ── Single venue card ──
function VenueCard({
  venue,
  index,
  isProminent,
}: {
  venue: (typeof weddingData.venues)[number]
  index: number
  isProminent: boolean
}) {
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden ${
        isProminent ? 'md:scale-[1.02]' : ''
      }`}
      style={{
        backgroundColor: '#161830',
        border: isProminent
          ? '1px solid rgba(201,168,76,0.4)'
          : '1px solid rgba(201,168,76,0.15)',
        boxShadow: isProminent
          ? '0 0 40px rgba(201,168,76,0.08)'
          : undefined,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: 'easeOut',
      }}
    >
      {/* Prominent card glow */}
      {isProminent && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />
      )}

      <div className="relative z-10 p-6 md:p-8">
        {/* Venue name */}
        <h3
          className="font-display text-gold gold-glow mb-2"
          style={{
            fontSize: isProminent
              ? 'clamp(1.4rem, 3vw, 2rem)'
              : 'clamp(1.2rem, 2.5vw, 1.6rem)',
          }}
        >
          {venue.name}
        </h3>

        {/* Events at this venue */}
        <p className="font-body text-gold-light/70 text-base md:text-lg mb-4 tracking-wide">
          {venue.events}
        </p>

        {/* Address */}
        <div className="flex items-start gap-2 mb-6">
          <MapPinIcon className="text-gold/40 mt-0.5 shrink-0" />
          <p className="font-body text-cream/80 text-base md:text-lg leading-relaxed">
            {venue.address}
          </p>
        </div>

        {/* Get Directions button */}
        <a
          href={venue.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body text-base text-gold border border-gold/40 hover:border-gold hover:bg-gold/10 transition-all duration-300"
        >
          Get Directions
          <ArrowRightIcon />
        </a>

        {/* Google Maps embed */}
        <div className="mt-6 rounded-lg overflow-hidden">
          <div
            className="relative group"
            style={{
              filter: 'grayscale(0.8) brightness(0.7)',
              transition: 'filter 0.4s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLDivElement).style.filter =
                'grayscale(0.3) brightness(0.85)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLDivElement).style.filter =
                'grayscale(0.8) brightness(0.7)'
            }}
          >
            <iframe
              src={venue.mapEmbedUrl}
              width="100%"
              height="200"
              className="md:h-[250px] w-full border-0 rounded-lg"
              loading="lazy"
              referrerPolicy="strict-origin"
              title={`Map of ${venue.name}`}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Venues component ──
const Venues: React.FC = () => {
  const { venues } = weddingData

  return (
    <section
      id="venues"
      className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: '#0A0A0F' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2
            className="font-display text-gold gold-glow mb-6"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
          >
            Find Your Way
          </h2>
          <DecorativeDivider className="w-48 md:w-64 mx-auto text-gold/40" />
        </motion.div>

        {/* Venue cards with dotted connectors */}
        <div className="flex flex-col">
          {venues.map((venue, index) => {
            const isProminent = index === 1 // Ramada — wedding ceremony
            return (
              <div key={venue.id}>
                <VenueCard
                  venue={venue}
                  index={index}
                  isProminent={isProminent}
                />
                {index < venues.length - 1 && <DottedConnector />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Venues
