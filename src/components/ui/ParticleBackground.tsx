import { useEffect, useState, useMemo } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

interface ParticleBackgroundProps {
  readonly count?: number
}

let engineInitialised = false
let enginePromise: Promise<void> | null = null

export default function ParticleBackground({ count = 30 }: ParticleBackgroundProps) {
  const [ready, setReady] = useState(engineInitialised)

  useEffect(() => {
    if (engineInitialised) {
      setReady(true)
      return
    }
    if (!enginePromise) {
      enginePromise = initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })
    }
    enginePromise.then(() => {
      engineInitialised = true
      setReady(true)
    })
  }, [])

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      fpsLimit: 60,
      particles: {
        number: { value: count },
        color: { value: '#C9A84C' },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: { enable: true, speed: 0.4, startValue: 'random', sync: false },
        },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: { min: 0.3, max: 0.8 },
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
        links: { enable: false },
        life: {
          duration: { sync: false, value: { min: 3, max: 6 } },
          count: 0,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
        },
      },
      detectRetina: true,
    }),
    [count],
  )

  if (!ready) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Particles
        id="ambient-particles"
        options={options}
      />
    </div>
  )
}
