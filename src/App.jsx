import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import TrackScroll from './components/TrackScroll.jsx'
import About from './components/About.jsx'
import Team from './components/Team.jsx'
import Sponsors from './components/Sponsors.jsx'
import Media from './components/Media.jsx'
import DonateFAQ from './components/DonateFAQ.jsx'
import Footer from './components/Footer.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-ink">
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <TrackScroll />
        <About />
        <Team />
        <Sponsors />
        <Media />
        <DonateFAQ />
      </main>
      <Footer />
    </div>
  )
}
