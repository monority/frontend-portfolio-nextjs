'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.config({ ignoreMobileResize: true })

type LenisType = InstanceType<typeof import('lenis').default>

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: LenisType | null = null
    let disposed = false

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null

      if (!anchor) {
        return
      }

      const href = anchor.getAttribute('href')
      const hash = href?.startsWith('#') ? href.slice(1) : null

      if (!hash) {
        return
      }

      const element = document.getElementById(hash)
      if (!element) {
        return
      }

      // Let native jump happen until Lenis is ready — never swallow the click blindly.
      if (!lenis) {
        return
      }

      event.preventDefault()
      lenis.scrollTo(`#${hash}`)
      window.history.pushState(null, '', `#${hash}`)
    }

    async function initLenis() {
      const { default: Lenis } = await import('lenis')

      // StrictMode double-mount guard: if this effect already cleaned up,
      // or another instance won already — discard the new one.
      if (disposed || lenis) {
        return
      }

      lenis = new Lenis({
        duration: 0.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.15,
        wheelMultiplier: 1,
        orientation: 'vertical',
        smoothWheel: true,
        respectReducedMotion: false,
      })

      lenis.on('scroll', () => ScrollTrigger.update())

      const raf = (time: number) => {
        lenis?.raf(time * 1000)
      }

      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)

      return () => {
        gsap.ticker.remove(raf)
      }
    }

    document.addEventListener('click', handleAnchorClick)

    let removeRaf: (() => void) | null = null

    initLenis().then(cleanup => {
      if (disposed) {
        cleanup?.()
        return
      }
      removeRaf = cleanup ?? null
    })

    return () => {
      disposed = true
      document.removeEventListener('click', handleAnchorClick)
      removeRaf?.()
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}