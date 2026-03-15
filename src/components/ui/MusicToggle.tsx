import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAudioPlayer } from '../../hooks/useAudioPlayer'

export default function MusicToggle() {
  const { isPlaying, toggle } = useAudioPlayer()
  const [showTooltip, setShowTooltip] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        right: 'calc(24px + env(safe-area-inset-right, 0px))',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            style={{
              fontSize: 12,
              color: '#C9A84C',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            Tap for music
          </motion.span>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        style={{
          width: 48,
          height: 48,
          minWidth: 44,
          minHeight: 44,
          borderRadius: '50%',
          border: '1.5px solid #C9A84C',
          backgroundColor: 'rgba(10, 10, 10, 0.85)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
        data-cursor="hover"
      >
        {isPlaying ? <EqualizerBars /> : <MusicNoteIcon />}
      </button>
    </div>
  )
}

function EqualizerBars() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 3,
        height: 16,
      }}
    >
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ height: [4, 16, 8, 14, 4] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
          style={{
            width: 3,
            backgroundColor: '#C9A84C',
            borderRadius: 1,
          }}
        />
      ))}
    </div>
  )
}

function MusicNoteIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" fill="#C9A84C" stroke="none" />
      <circle cx="18" cy="16" r="3" fill="#C9A84C" stroke="none" />
    </svg>
  )
}
