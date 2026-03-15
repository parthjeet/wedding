import { useState, useRef, useCallback, useEffect } from 'react'

interface AudioPlayerReturn {
  isPlaying: boolean
  toggle: () => void
  hasInteracted: boolean
}

export function useAudioPlayer(): AudioPlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])
  const gainRef = useRef<GainNode | null>(null)

  const createAmbientSound = useCallback(() => {
    if (audioContextRef.current) return

    const ctx = new AudioContext()
    audioContextRef.current = ctx

    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.connect(ctx.destination)
    gainRef.current = gainNode

    // Base drone — C3
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(130.81, ctx.currentTime)
    const g1 = ctx.createGain()
    g1.gain.setValueAtTime(0.15, ctx.currentTime)
    osc1.connect(g1).connect(gainNode)
    osc1.start()

    // Fifth — G3
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(196.0, ctx.currentTime)
    const g2 = ctx.createGain()
    g2.gain.setValueAtTime(0.08, ctx.currentTime)
    osc2.connect(g2).connect(gainNode)
    osc2.start()

    // Shimmer — C5
    const osc3 = ctx.createOscillator()
    osc3.type = 'triangle'
    osc3.frequency.setValueAtTime(523.25, ctx.currentTime)
    const g3 = ctx.createGain()
    g3.gain.setValueAtTime(0.03, ctx.currentTime)
    osc3.connect(g3).connect(gainNode)
    osc3.start()

    // Slow LFO for shimmer wobble
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.setValueAtTime(0.3, ctx.currentTime)
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(3, ctx.currentTime)
    lfo.connect(lfoGain).connect(osc3.frequency)
    lfo.start()

    oscillatorsRef.current = [osc1, osc2, osc3, lfo]
  }, [])

  const toggle = useCallback(() => {
    setHasInteracted(true)

    if (!audioContextRef.current) {
      createAmbientSound()
    }

    const ctx = audioContextRef.current
    const gain = gainRef.current
    if (!ctx || !gain) return

    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    setIsPlaying((prev) => {
      if (prev) {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
        return false
      } else {
        gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.5)
        return true
      }
    })
  }, [createAmbientSound])

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try { osc.stop() } catch { /* already stopped */ }
      })
      audioContextRef.current?.close().catch(() => {})
      audioContextRef.current = null
      gainRef.current = null
    }
  }, [])

  return { isPlaying, toggle, hasInteracted }
}
