import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import FloatingIsland from './FloatingIsland'
import StylizedCharacter from './StylizedCharacter'
import Particles from './shared/Particles'
import FloatingText from './shared/FloatingText'
import OrbitingItem from './shared/OrbitingItem'
import ScientistZone from './zones/ScientistZone'
import EngineerZone from './zones/EngineerZone'
import ArtistZone from './zones/ArtistZone'
import TraderZone from './zones/TraderZone'
import AthleteZone from './zones/AthleteZone'
import ChefZone from './zones/ChefZone'
import AnimeZone from './zones/AnimeZone'
import CEOZone from './zones/CEOZone'

/* 
  Each zone is placed along a path in 3D space.
  The camera interpolates its position as the user scrolls.
*/
const ZONE_POSITIONS = [
  [0, 0, 0],       // hero center
  [-6, -2, -15],    // scientist
  [6, -1, -30],     // engineer
  [-5, 0, -45],     // artist
  [5, -2, -60],     // trader
  [-6, 1, -75],     // athlete
  [6, 0, -90],      // chef
  [-5, -1, -105],   // anime
  [0, 0, -120],     // ceo
  [0, 0, -135],     // contact
]

export default function Scene({ scrollProgress, activeSection }) {
  const groupRef = useRef()
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 12))

  useFrame(({ camera }) => {
    // Interpolate camera position based on scroll
    const totalSections = ZONE_POSITIONS.length - 1
    const exactSection = scrollProgress * totalSections
    const currentIdx = Math.floor(exactSection)
    const nextIdx = Math.min(currentIdx + 1, totalSections)
    const t = exactSection - currentIdx

    const current = ZONE_POSITIONS[currentIdx]
    const next = ZONE_POSITIONS[nextIdx]

    // Camera follows a path offset from the zone positions
    const targetX = THREE.MathUtils.lerp(current[0], next[0], t) * 0.3
    const targetY = THREE.MathUtils.lerp(current[1], next[1], t) * 0.5 + 1
    const targetZ = THREE.MathUtils.lerp(current[2], next[2], t) + 10

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)

    // Camera looks slightly ahead
    const lookAtX = THREE.MathUtils.lerp(current[0], next[0], t) * 0.5
    const lookAtY = THREE.MathUtils.lerp(current[1], next[1], t) * 0.5
    const lookAtZ = THREE.MathUtils.lerp(current[2], next[2], t)

    cameraTarget.current.set(lookAtX, lookAtY, lookAtZ)
    cameraTarget.current.lerp(
      new THREE.Vector3(lookAtX, lookAtY, lookAtZ),
      0.05
    )
    camera.lookAt(cameraTarget.current)
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#e0d0ff" />
      <pointLight position={[-10, 5, -20]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[10, -5, -50]} intensity={0.5} color="#a855f7" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#030014', 15, 50]} />

      {/* Starfield background */}
      <Stars radius={100} depth={80} count={3000} factor={4} saturation={0.5} fade speed={1} />

      {/* Floating particles */}
      <Particles count={200} />

      {/* Character Zones */}
      <ScientistZone position={ZONE_POSITIONS[1]} active={activeSection === 1} />
      <EngineerZone position={ZONE_POSITIONS[2]} active={activeSection === 2} />
      <ArtistZone position={ZONE_POSITIONS[3]} active={activeSection === 3} />
      <TraderZone position={ZONE_POSITIONS[4]} active={activeSection === 4} />
      <AthleteZone position={ZONE_POSITIONS[5]} active={activeSection === 5} />
      <ChefZone position={ZONE_POSITIONS[6]} active={activeSection === 6} />
      <AnimeZone position={ZONE_POSITIONS[7]} active={activeSection === 7} />
      <CEOZone position={ZONE_POSITIONS[8]} active={activeSection === 8} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          intensity={0.8}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </>
  )
}
