import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform } from 'framer-motion'

const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches

function useTyped(text, active, speed = 26) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    if (reduce()) { setN(text.length); return }
    const id = setInterval(() => setN((v) => (v >= text.length ? (clearInterval(id), v) : v + 1)), speed)
    return () => clearInterval(id)
  }, [active, text, speed])
  return text.slice(0, n)
}

/* Code symbols drifting behind the page, parallaxed by scroll */
const SYMS = [['</>', 8, 14, 0.3], ['{ }', 86, 20, 0.6], ['=>', 18, 44, 0.45], ['npm', 90, 52, 0.7], ['git', 6, 70, 0.5],
  ['API', 74, 76, 0.4], ['SQL', 30, 90, 0.65], ['( )', 55, 32, 0.35], ['[ ]', 44, 62, 0.55], ['async', 80, 94, 0.45], ['<div/>', 14, 94, 0.6]]
function Floater({ t, x, y, s, i, p }) {
  const ty = useTransform(p, [0, 1], [0, -300 * s])
  return (
    <motion.div className="floater" style={{ left: x + '%', top: y + '%', y: ty }}>
      <motion.span animate={{ y: [0, -18, 0], rotate: [-5, 5, -5] }} transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: 'easeInOut' }}>{t}</motion.span>
    </motion.div>
  )
}
export function FloatingCode() {
  const { scrollYProgress } = useScroll()
  return <div className="floaters" aria-hidden="true">{SYMS.map((a, i) => <Floater key={a[0]} t={a[0]} x={a[1]} y={a[2]} s={a[3]} i={i} p={scrollYProgress} />)}</div>
}
export function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div className="progress" style={{ scaleX }} />
}

/* Scrolling tech ticker */
const TECH = ['React', 'Node.js', 'Express', 'NestJS', 'PostgreSQL', 'Prisma', 'Supabase', 'Firebase', 'MongoDB', 'Vite', 'Vercel', 'REST APIs']
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{[...TECH, ...TECH].map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  )
}

/* Editor window that types out a developer profile */
const CODE = `const prem = {
  role: 'MERN full-stack developer',
  stack: ['React', 'Node', 'Postgres'],
  from: 'Swiggy operations',
  delivers: 'end to end',
  openToWork: true,
}`
function Highlight({ text }) {
  return text.split(/(\bconst\b|'[^']*'?|\btrue\b)/g).map((t, i) =>
    /^(const|true)$/.test(t) ? <b key={i} className="k">{t}</b> : t.startsWith("'") ? <b key={i} className="s">{t}</b> : t)
}
export function CodeWindow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const typed = useTyped(CODE, inView, 22)
  return (
    <div className="win" ref={ref}>
      <div className="win-bar"><i /><i /><i /><span>prem.js</span></div>
      <pre><Highlight text={typed} /><em className="caret" /></pre>
    </div>
  )
}

/* Client -> API -> Database, with packets moving along the wires */
export function ApiFlow() {
  const nodes = [[10, 'React UI'], [220, 'Express / NestJS API'], [430, 'PostgreSQL']]
  return (
    <svg className="flow" viewBox="0 0 600 110" role="img" aria-label="React client calling an API backed by a database">
      {[[150, 220], [360, 430]].map(([a, b]) => <path key={a} className="wire" d={`M${a} 55H${b}`} />)}
      {nodes.map(([x, l]) => (
        <g key={l}><rect x={x} y="25" width="140" height="60" rx="12" /><text x={x + 70} y="60" textAnchor="middle">{l}</text></g>
      ))}
      {['M150 48H220', 'M360 48H430'].map((d, i) => (
        <circle key={d} r="5" className="packet"><animateMotion dur="1.8s" begin={`${i * 0.4}s`} repeatCount="indefinite" path={d} /></circle>
      ))}
      {['M220 62H150', 'M430 62H360'].map((d, i) => (
        <circle key={d} r="4" className="packet back"><animateMotion dur="1.8s" begin={`${0.9 + i * 0.4}s`} repeatCount="indefinite" path={d} /></circle>
      ))}
    </svg>
  )
}

/* Database tables that connect themselves as they scroll in */
export function SchemaGraphic() {
  const tbl = (x, name, rows) => (
    <motion.g initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: x / 900 }}>
      <rect x={x} y="20" width="150" height="120" rx="10" />
      <text x={x + 14} y="44" className="t-name">{name}</text>
      {rows.map((r, i) => <text key={r} x={x + 14} y={70 + i * 22}>{r}</text>)}
    </motion.g>
  )
  const link = (d, delay) => <motion.path className="rel" d={d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay }} />
  return (
    <svg className="schema" viewBox="0 0 600 160" role="img" aria-label="Database schema with related tables">
      {link('M160 80H225', 0.5)}{link('M375 80H440', 0.8)}
      {tbl(10, 'users', ['id', 'email', 'role'])}
      {tbl(225, 'orders', ['id', 'user_id', 'status'])}
      {tbl(440, 'products', ['id', 'name', 'price'])}
    </svg>
  )
}

/* Commit graph beside the career timeline */
export function GitGraph() {
  const dots = [[30, 20], [30, 90], [80, 150], [80, 210], [30, 270], [30, 330]]
  return (
    <div className="git" aria-hidden="true">
      <svg viewBox="0 0 110 360">
        <motion.path className="g-main" d="M30 20V340" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />
        <motion.path className="g-branch" d="M30 90C30 130 80 110 80 150V210C80 250 30 230 30 270" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.6 }} />
        {dots.map(([x, y], i) => <motion.circle key={i} cx={x} cy={y} r="8" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.25, type: 'spring' }} />)}
      </svg>
    </div>
  )
}

/* Terminal that "deploys" in the contact section */
const TERM = `$ git push origin main
✓ build passed
✓ deployed to vercel
$ hire prem-krishna
✓ ready to start`
export function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const typed = useTyped(TERM, inView, 32)
  return (
    <div className="win term" ref={ref}>
      <div className="win-bar"><i /><i /><i /><span>terminal</span></div>
      <pre>{typed}<em className="caret" /></pre>
    </div>
  )
}
