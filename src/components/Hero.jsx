import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import Lottie from 'lottie-react'
import pulse from '../pulse.json'
import Scene3D from './Scene3D'
const Spline = lazy(() => import('@splinetool/react-spline'))
const SPLINE = import.meta.env.VITE_SPLINE_SCENE

const Word = ({ text }) => (
  <span className="word">
    {text.split('').map((c, i) => <span className="line" key={i}><span className="char">{c}</span></span>)}
  </span>
)

export default function Hero() {
  const root = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.char', { yPercent: 120, rotate: 8, duration: 1.1, stagger: 0.035 })
        .from('.hero-badge', { x: -20, opacity: 0, duration: 0.6 }, '-=0.7')
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-cta > *', { y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.5')
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero-3d" aria-hidden="true">
        {SPLINE ? <Suspense fallback={null}><Spline scene={SPLINE} /></Suspense> : <Scene3D />}
      </div>
      <div className="hero-copy">
        <div className="hero-badge">
          <Lottie animationData={pulse} loop className="pulse" />
          Open to full-time roles and freelance projects
        </div>
        <h1 aria-label="Prem Krishna">
          <Word text="Prem" /> <Word text="Krishna" />
        </h1>
        <p className="hero-sub">
          Full-stack developer (React, Node, Postgres). Six years inside Swiggy's partner operations taught me
          where real products break. Now I build the ones that don't.
        </p>
        <div className="hero-cta">
          <a className="btn" href="#work">See what I've shipped</a>
          <a className="btn btn-ghost" href="#contact">Hire me</a>
        </div>
      </div>
    </section>
  )
}
