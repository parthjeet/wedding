const WEB_VIEW_PATTERNS = [
  'WhatsApp',
  'Instagram',
  'FBAN',
  'FBAV',
  'FB_IAB',
  'Twitter',
  'Line/',
  'wv)',
]

function detectWebView(): boolean {
  if (typeof window === 'undefined') return false
  const ua = navigator.userAgent || ''
  return WEB_VIEW_PATTERNS.some((p) => ua.includes(p))
}

export function useWebViewDetection(): boolean {
  return detectWebView()
}
