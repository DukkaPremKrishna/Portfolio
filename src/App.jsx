import Nav from './components/Nav'
import Hero from './components/Hero'
import { FloatingCode, ScrollBar, Marquee } from './components/Graphics'
import { About, Projects, Skills, Experience, Contact } from './components/Sections'
export default function App() {
  return (
    <>
      <ScrollBar />
      <FloatingCode />
      <Nav />
      <main>
        <Hero /><Marquee /><About /><Projects /><Skills /><Experience /><Contact />
      </main>
    </>
  )
}
