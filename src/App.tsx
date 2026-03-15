import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useDeviceCapability } from './hooks/useDeviceCapability'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useHasHover } from './hooks/useMediaQuery'
import { useAudioPlayer } from './hooks/useAudioPlayer'

import Loading from './components/Loading/Loading'
import Hero from './components/Hero/Hero'
import FamilyBlessings from './components/FamilyBlessings/FamilyBlessings'
import Events from './components/Events/Events'
import Gallery from './components/Gallery/Gallery'
import Venues from './components/Venues/Venues'
import Closing from './components/Closing/Closing'

import ScrollProgress from './components/ui/ScrollProgress'
import CustomCursor from './components/ui/CustomCursor'
import MusicToggle from './components/ui/MusicToggle'
import WebViewPrompt from './components/ui/WebViewPrompt'
import FilmGrain from './components/ui/FilmGrain'
import ParticleBackground from './components/ui/ParticleBackground'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const tier = useDeviceCapability()
  const reducedMotion = useReducedMotion()
  const hasHover = useHasHover()
  const { play, toggle, isPlaying } = useAudioPlayer()

  useSmoothScroll()

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
    play()
  }, [play])

  // Refresh ScrollTrigger after loading completes so measurements are correct
  useEffect(() => {
    if (!isLoading) {
      ScrollTrigger.refresh()
    }
  }, [isLoading])

  const particleCount = tier === 'high' ? 35 : tier === 'medium' ? 15 : 0

  return (
    <div className={hasHover ? 'custom-cursor-active' : ''}>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <Loading onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Custom cursor — always available */}
      {hasHover && <CustomCursor />}

      {/* Global UI */}
      {!isLoading && (
        <>
          <ScrollProgress />
          <MusicToggle isPlaying={isPlaying} onToggle={toggle} />
          <WebViewPrompt />
          {!reducedMotion && <FilmGrain />}
          {particleCount > 0 && !reducedMotion && (
            <ParticleBackground count={particleCount} />
          )}
        </>
      )}

      {/* Main Content — rendered after loading to avoid stale ScrollTrigger measurements */}
      {!isLoading && (
        <main>
          <Hero />
          <FamilyBlessings />
          <Events />
          <Gallery />
          <Venues />
          <Closing />
        </main>
      )}
    </div>
  )
}

export default App
