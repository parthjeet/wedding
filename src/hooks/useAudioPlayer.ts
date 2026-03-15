import { useState, useRef, useCallback, useEffect } from 'react'

interface AudioPlayerReturn {
  isPlaying: boolean
  toggle: () => void
  play: () => void
  hasInteracted: boolean
}

export function useAudioPlayer(): AudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(`${import.meta.env.BASE_URL}audio.mp3`)
      audio.loop = true
      audio.volume = 0.5
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const play = useCallback(() => {
    setHasInteracted(true)
    const audio = getAudio()
    audio.play().then(() => setIsPlaying(true)).catch(() => {})
  }, [getAudio])

  const toggle = useCallback(() => {
    setHasInteracted(true)
    const audio = getAudio()

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }, [getAudio, isPlaying])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [])

  return { isPlaying, toggle, play, hasInteracted }
}
