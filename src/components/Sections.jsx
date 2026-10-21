import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { profile, projects, skills, jobs } from '../data'
import { CodeWindow, ApiFlow, SchemaGraphic, GitGraph, Terminal } from './Graphics'

export function About() {
  return (
    <section className="section about">
      <h2>I've seen the other side of the product.</h2>
      <div className="about-body">
        <p>
          For years I was the person onboarding restaurants and delivery partners onto Swiggy, so I know what
          happens when forms are confusing, statuses are unclear and admins can't find a record.
        </p>
        <p>
          That's why my projects focus on the unglamorous parts that make software usable: validation that
          explains itself, dashboards people can actually filter, and roles that keep the right people in the
          right screens. I moved from operations into engineering at Swiggy and now ship complete products on
          my own.
        </p>
      </div>
      <CodeWindow />
    </section>
  )
}

function Card({ p }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-9, 9]), { stiffness: 180, damping: 18 })
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => { x.set(0); y.set(0) }
  return (
    <motion.article
      className="card"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, '--h': p.hue }}
      onMouseMove={move} onMouseLeave={reset}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
    >
      <svg className="card-art" viewBox="0 0 200 80" aria-hidden="true">
        <rect x="8" y="10" width="184" height="60" rx="8" />
        <path d="M24 30h60M24 44h110M24 58h40" />
        <circle cx="160" cy="30" r="10" />
      </svg>
      <h3>{p.title}</h3>
      <p className="kind">{p.kind}</p>
      <ul>{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
      <div className="tags">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
      {p.url && <a className="btn btn-sm" href={p.url} target="_blank" rel="noreferrer">Visit live site</a>}
    </motion.article>
  )
}

export function Projects() {
  return (
    <section className="section" id="work">
      <h2>Products people use</h2>
      <ApiFlow />
      <div className="grid">{projects.map((p) => <Card key={p.title} p={p} />)}</div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <h2>The toolkit</h2>
      <SchemaGraphic />
      <div className="skills">
        {Object.entries(skills).map(([g, items]) => (
          <div key={g}>
            <h3>{g}</h3>
            <div className="chips">
              {items.map((s, i) => (
                <motion.span key={s} whileHover={{ y: -6, rotateX: 18, scale: 1.06 }}
                  initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.04 }}>{s}</motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Experience() {
  const root = useRef(null), path = useRef(null)
  useEffect(() => {
    const len = path.current.getTotalLength()
    path.current.style.strokeDasharray = len
    path.current.style.strokeDashoffset = len
    const ctx = gsap.context(() => {
      gsap.to(path.current, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 65%', end: 'bottom 70%', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="section" id="path">
      <h2>From operations to engineering</h2>
      <div className="timeline" ref={root}>
        <GitGraph />
        <svg className="line-svg" viewBox="0 0 20 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M10 0V100" className="track" vectorEffect="non-scaling-stroke" />
          <path d="M10 0V100" className="draw" ref={path} vectorEffect="non-scaling-stroke" />
        </svg>
        {jobs.map((j) => (
          <motion.div key={j.role + j.when} className="job"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-80px' }}>
            <span className="dot" />
            <p className="when">{j.when}</p>
            <h3>{j.role}</h3>
            <p className="org">{j.org}</p>
            <p>{j.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <h2>Let's build something that ships.</h2>
      <p>Hiring for a React or MERN role, or need a product built? I reply within a day.</p>
      <div className="hero-cta">
        <a className="btn" href={`mailto:${profile.email}`}>Email {profile.email}</a>
        <a className="btn btn-ghost" href={`tel:${profile.phoneIntl}`}>Call {profile.phone}</a>
        <a className="btn btn-ghost" href="/Prem_Krishna_Resume.pdf" download>Download resume</a>
      </div>
      <Terminal />
      <footer>© {new Date().getFullYear()} {profile.fullName} · {profile.location}</footer>
    </section>
  )
}
