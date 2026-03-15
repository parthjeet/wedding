import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import weddingData from '../../data/weddingData'
import type { PhotoItem } from '../../data/weddingData'

// ── Camera icon placeholder SVG ──
function CameraIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold/30"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

// ── Aspect ratio map ──
const ASPECT_RATIOS: Record<PhotoItem['aspectRatio'], string> = {
  portrait: '2/3',
  landscape: '16/9',
  square: '1/1',
}

// ── Rotation pattern for editorial feel ──
function getRotation(index: number): number {
  const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5]
  return rotations[index % rotations.length]
}

import { useHasHover } from '../../hooks/useMediaQuery'

// ── Single photo card with parallax ──
function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: PhotoItem
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const hasHover = useHasHover()
  const rotation = getRotation(index)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (index % 3 - 1) * 30]
  )

  return (
    <motion.div
      ref={ref}
      layoutId={photo.id}
      className="relative cursor-pointer overflow-hidden rounded-lg"
      style={{
        aspectRatio: ASPECT_RATIOS[photo.aspectRatio],
        border: '1px solid rgba(201,168,76,0.3)',
        rotate: rotation,
        y: parallaxY,
        gridArea: photo.gridArea ?? undefined,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={
        hasHover
          ? {
              y: -8,
              rotate: 0,
              borderColor: 'rgba(201,168,76,0.7)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              transition: { duration: 0.3 },
            }
          : undefined
      }
      onClick={onClick}
    >
      {/* Dark gradient placeholder */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background:
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
      >
        <CameraIcon />
      </div>

      {/* Show actual photo if src exists */}
      {photo.src && (
        <img
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </motion.div>
  )
}

// ── Lightbox component ──
function Lightbox({
  photos,
  selectedId,
  onClose,
  onPrev,
  onNext,
}: {
  photos: readonly PhotoItem[]
  selectedId: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const selectedPhoto = photos.find((p) => p.id === selectedId)

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  if (!selectedPhoto) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
        }}
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold/60 hover:text-gold hover:border-gold/60 transition-colors"
        aria-label="Close lightbox"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Previous arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold/60 hover:text-gold hover:border-gold/60 transition-colors"
        aria-label="Previous photo"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold/60 hover:text-gold hover:border-gold/60 transition-colors"
        aria-label="Next photo"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Lightbox photo */}
      <motion.div
        layoutId={selectedPhoto.id}
        className="relative z-10 max-w-[90vw] max-h-[80vh] rounded-lg overflow-hidden"
        style={{
          aspectRatio: ASPECT_RATIOS[selectedPhoto.aspectRatio],
          border: '2px solid rgba(201,168,76,0.4)',
          minWidth: '300px',
          maxWidth: '800px',
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {selectedPhoto.src ? (
          <img
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-4"
            style={{
              background:
                'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            }}
          >
            <CameraIcon />
            <span className="font-body text-gold/30 text-sm">
              {selectedPhoto.alt}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ── Main Gallery component ──
const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const { photos } = weddingData

  const selectedIndex = selectedPhoto
    ? photos.findIndex((p) => p.id === selectedPhoto)
    : -1

  const handlePrev = useCallback(() => {
    if (selectedIndex <= 0) {
      setSelectedPhoto(photos[photos.length - 1].id)
    } else {
      setSelectedPhoto(photos[selectedIndex - 1].id)
    }
  }, [selectedIndex, photos])

  const handleNext = useCallback(() => {
    if (selectedIndex >= photos.length - 1) {
      setSelectedPhoto(photos[0].id)
    } else {
      setSelectedPhoto(photos[selectedIndex + 1].id)
    }
  }, [selectedIndex, photos])

  const handleClose = useCallback(() => {
    setSelectedPhoto(null)
  }, [])

  return (
    <section
      id="gallery"
      className="relative py-20 md:py-28 px-4 md:px-8 overflow-hidden"
      style={{ backgroundColor: '#0F1123' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Responsive grid styles — mostly portrait images with one landscape */}
        <style>{`
          .gallery-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .gallery-grid .photo-landscape {
            grid-column: span 2;
          }
          @media (min-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .gallery-grid .photo-hero {
              grid-row: span 2;
            }
            .gallery-grid .photo-landscape {
              grid-column: span 2;
            }
          }
        `}</style>

        {/* Photo grid */}
        <div className="gallery-grid">
          {photos.map((photo, index) => {
            const isHero = photo.gridArea === 'hero'
            const isLandscape = photo.aspectRatio === 'landscape'
            const className = isHero ? 'photo-hero' : isLandscape ? 'photo-landscape' : ''
            return (
              <div key={photo.id} className={className}>
                <PhotoCard
                  photo={photo}
                  index={index}
                  onClick={() => setSelectedPhoto(photo.id)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <Lightbox
            photos={photos}
            selectedId={selectedPhoto}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
