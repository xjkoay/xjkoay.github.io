import { useState, useEffect, useRef, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './components/Scene'
import HeroOverlay from './components/ui/HeroOverlay'
import Navigation from './components/ui/Navigation'
import SectionOverlay from './components/ui/SectionOverlay'
import ContactSection from './components/ui/ContactSection'

const SECTIONS = [
  {
    id: 'hero',
    label: 'Home',
    icon: '🏠'
  },
  {
    id: 'scientist',
    label: 'Scientist',
    icon: '🔬',
    title: 'Natural Scientist',
    subtitle: 'University of Cambridge · Christ\'s College',
    description: 'Cambridge-educated in Natural Sciences with specializations in Quantum Chemistry, Computational Chemistry, X-ray Diffraction, and NMR Spectroscopy. Published ML research in tropical forest analysis (Top Viewed Article Award, Wiley). Explored drug repositioning at AstraZeneca and COVID-19 gene correlations.',
    tags: [
      { text: 'Chemistry', variant: 'blue' },
      { text: 'Pharmacology', variant: '' },
      { text: 'Material Science', variant: 'cyan' },
      { text: 'Quantum', variant: 'pink' },
      { text: 'ML Research', variant: 'emerald' },
    ],
    align: 'left'
  },
  {
    id: 'engineer',
    label: 'Engineer',
    icon: '💻',
    title: 'Software Engineer',
    subtitle: 'Huawei → Ant International (Alibaba Group)',
    description: 'Built DPU hardware offloading systems at Huawei achieving 2x IOPS improvement. At Ant International, architected autonomous multi-agent QA frameworks using LLM + RAG, reducing manual QA by 80%. Created self-healing deployment agents saving 400 man-days.',
    tags: [
      { text: 'Python', variant: 'gold' },
      { text: 'Java', variant: 'red' },
      { text: 'C/C++', variant: 'blue' },
      { text: 'PyTorch', variant: '' },
      { text: 'Docker', variant: 'cyan' },
      { text: 'LangChain', variant: 'emerald' },
    ],
    align: 'right'
  },
  {
    id: 'artist',
    label: 'Artist',
    icon: '🎨',
    title: 'Artist & Creator',
    subtitle: 'Sketching · Oil Painting · Murals',
    description: 'A passionate artist who expresses creativity through multiple mediums — from detailed pencil sketches to vibrant oil paintings and large-scale murals. Art is the bridge between science and soul, a way to visualize the invisible.',
    tags: [
      { text: 'Sketching', variant: 'pink' },
      { text: 'Oil Painting', variant: 'gold' },
      { text: 'Murals', variant: '' },
      { text: 'Mixed Media', variant: 'cyan' },
    ],
    align: 'left'
  },
  {
    id: 'trader',
    label: 'Trader',
    icon: '📈',
    title: 'Quantitative Trader',
    subtitle: 'Alpha Seeker · Market Analyst',
    description: 'Passionate about dissecting market movements through news analysis and quantitative strategies. Always watching for signals, finding alpha where others see noise. Combines analytical rigor from science with the thrill of financial markets.',
    tags: [
      { text: 'Alpha Gen', variant: 'gold' },
      { text: 'News Analysis', variant: 'blue' },
      { text: 'Quant Strategy', variant: 'emerald' },
      { text: 'Risk Mgmt', variant: 'red' },
    ],
    align: 'right'
  },
  {
    id: 'athlete',
    label: 'Athlete',
    icon: '🏓',
    title: 'Athlete & Sportsman',
    subtitle: 'Table Tennis · Outdoor Sports',
    description: 'A table tennis player who thrives on competition. Beyond the table, an active outdoor enthusiast — from tennis, badminton, and squash to hiking, swimming, and hitting the gym. Movement is life.',
    tags: [
      { text: 'Table Tennis', variant: 'red' },
      { text: 'Tennis', variant: 'emerald' },
      { text: 'Badminton', variant: 'blue' },
      { text: 'Hiking', variant: 'gold' },
      { text: 'Swimming', variant: 'cyan' },
      { text: 'Gym', variant: 'pink' },
    ],
    align: 'left'
  },
  {
    id: 'chef',
    label: 'Chef',
    icon: '🍳',
    title: 'Home Chef',
    subtitle: 'Malaysian Cuisine Enthusiast',
    description: 'A home chef mastering the art of Malaysian cooking — from the perfect nasi lemak with sambal that hits just right, to a rich repertoire of local delicacies. The kitchen is where chemistry meets culture.',
    tags: [
      { text: 'Nasi Lemak', variant: 'gold' },
      { text: 'Malaysian Food', variant: 'red' },
      { text: 'Home Cooking', variant: 'emerald' },
      { text: 'Local Delicacies', variant: '' },
    ],
    align: 'right'
  },
  {
    id: 'anime',
    label: 'Anime',
    icon: '🎬',
    title: 'Anime & Netflix',
    subtitle: 'Doraemon · One Piece · Binge Watcher',
    description: 'A devoted anime fan with Doraemon and One Piece as all-time favorites. From Luffy\'s boundless spirit to Doraemon\'s magical gadgets — anime is the fuel for imagination. Netflix is the second home after the lab.',
    tags: [
      { text: 'Doraemon', variant: 'blue' },
      { text: 'One Piece', variant: '' },
      { text: 'Netflix', variant: 'pink' },
      { text: 'Anime', variant: 'cyan' },
    ],
    align: 'left'
  },
  {
    id: 'traveler',
    label: 'Travel',
    icon: '✈️',
    title: 'World Traveler',
    subtitle: 'Globetrotter · Cultural Explorer',
    description: 'An avid traveler having explored over 16 countries including the US, UK, Japan, Australia, and across Europe & Asia. From the magic of Disney to the history of Washington DC and the Brooklyn Bridge. Travel broadens the mind and inspires creativity.',
    tags: [
      { text: '16+ Countries', variant: 'blue' },
      { text: 'USA & UK', variant: 'emerald' },
      { text: 'Europe', variant: 'pink' },
      { text: 'Asia', variant: 'gold' },
    ],
    align: 'right'
  },
  {
    id: 'ceo',
    label: 'CEO',
    icon: '🚀',
    title: 'CEO & Founder',
    subtitle: 'QuarkX · AI Transformation',
    description: 'Founded QuarkX to democratize AI adoption. Building tailored consulting and engineering services for companies seeking to transform their operations with artificial intelligence. From strategy to deployment — turning AI ambitions into production reality.',
    tags: [
      { text: 'AI Consulting', variant: '' },
      { text: 'Engineering', variant: 'blue' },
      { text: 'Strategy', variant: 'gold' },
      { text: 'Transformation', variant: 'emerald' },
    ],
    align: 'left'
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: '✉️'
  }
]

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(scrollTop / docHeight, 1)
    setScrollProgress(progress)

    const sectionCount = SECTIONS.length
    const sectionIndex = Math.min(
      Math.floor(progress * sectionCount),
      sectionCount - 1
    )
    setActiveSection(sectionIndex)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((index) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const targetScroll = (index / SECTIONS.length) * docHeight
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }, [])

  return (
    <>
      {/* Loading Screen */}
      <div className={`loading-screen ${loaded ? 'loaded' : ''}`}>
        <div className="loading-spinner" />
        <div className="loading-text">Entering the universe...</div>
      </div>

      {/* 3D Canvas Background */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: false }}
        >
          <Scene scrollProgress={scrollProgress} activeSection={activeSection} />
        </Canvas>
      </div>

      {/* Navigation Dots */}
      <Navigation
        sections={SECTIONS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Scrollable Content */}
      <div className="scroll-container" ref={scrollRef}>
        {/* Hero */}
        <HeroOverlay />

        {/* Character Sections */}
        {SECTIONS.slice(1, -1).map((section, i) => (
          <SectionOverlay
            key={section.id}
            section={section}
            isActive={activeSection === i + 1}
          />
        ))}

        {/* Contact */}
        <ContactSection />
      </div>
    </>
  )
}

export default App
