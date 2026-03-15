import { useState, useEffect } from 'react'
import { useWebViewDetection } from './useWebViewDetection'

export type DeviceTier = 'high' | 'medium' | 'low'

export function useDeviceCapability(): DeviceTier {
  const isWebView = useWebViewDetection()
  const [tier, setTier] = useState<DeviceTier>('high')

  useEffect(() => {
    if (isWebView) {
      setTier('low')
      return
    }

    const cores = navigator.hardwareConcurrency || 2
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const memoryGB = (navigator as { deviceMemory?: number }).deviceMemory || 8

    if (cores < 4 || memoryGB < 4) {
      setTier('low')
    } else if (isMobile && cores < 8) {
      setTier('medium')
    } else if (isMobile) {
      setTier('medium')
    } else {
      setTier('high')
    }
  }, [isWebView])

  return tier
}
