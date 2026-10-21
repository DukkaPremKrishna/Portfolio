import { motion } from 'framer-motion'
import { profile } from '../data'
const links = [['Work', '#work'], ['Skills', '#skills'], ['Path', '#path'], ['Contact', '#contact']]
export default function Nav() {
  return (
    <motion.header className="nav" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
      <a href="#top" className="brand">{profile.name}</a>
      <nav aria-label="Primary">
        {links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        <a className="btn btn-sm" href="/Prem_Krishna_Resume.pdf" download>Resume</a>
      </nav>
    </motion.header>
  )
}
