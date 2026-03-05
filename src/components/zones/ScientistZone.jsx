import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Atom model — orbiting electrons around a nucleus */
function AtomModel({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.5
      groupRef.current.rotation.x = Math.sin(time.current * 0.3) * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Nucleus */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Electron orbits */}
      {[0, Math.PI / 3, -Math.PI / 3].map((tilt, i) => (
        <group key={i} rotation={[tilt, i * 1.2, 0]}>
          <mesh>
            <torusGeometry args={[0.5, 0.008, 8, 64]} />
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
          </mesh>
          {/* Electron */}
          <mesh position={[0.5 * Math.cos(i * 2), 0, 0.5 * Math.sin(i * 2)]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#60a5fa"
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* DNA Double Helix */
function DNAHelix({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.3
    }
  })

  const points = []
  const points2 = []
  for (let i = 0; i < 40; i++) {
    const t = i * 0.15
    points.push(new THREE.Vector3(
      Math.cos(t) * 0.3,
      t * 0.15 - 1.5,
      Math.sin(t) * 0.3
    ))
    points2.push(new THREE.Vector3(
      Math.cos(t + Math.PI) * 0.3,
      t * 0.15 - 1.5,
      Math.sin(t + Math.PI) * 0.3
    ))
  }

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(points), 60, 0.02, 8, false
        ]} />
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.3} />
      </mesh>
      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[
          new THREE.CatmullRomCurve3(points2), 60, 0.02, 8, false
        ]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} />
      </mesh>
      {/* Rungs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const t = i * 0.7 + 0.5
        const x1 = Math.cos(t) * 0.3
        const z1 = Math.sin(t) * 0.3
        const x2 = Math.cos(t + Math.PI) * 0.3
        const z2 = Math.sin(t + Math.PI) * 0.3
        const y = t * 0.15 - 1.5
        const len = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2)
        const angle = Math.atan2(z2 - z1, x2 - x1)
        return (
          <mesh
            key={i}
            position={[(x1 + x2) / 2, y, (z1 + z2) / 2]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[len, 0.015, 0.015]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#34d399' : '#fbbf24'}
              emissive={i % 2 === 0 ? '#34d399' : '#fbbf24'}
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

/* Flask / Beaker */
function Beaker({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Flask body */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.2, 0.4, 16]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.3} roughness={0.1} metalness={0.3} />
      </mesh>
      {/* Liquid */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.11, 0.18, 0.2, 16]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#34d399"
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.3} roughness={0.1} />
      </mesh>
    </group>
  )
}

export default function ScientistZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#3b82f6" size={3.5} active={active}>
      {/* Cambridge Scientist Character */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#ffffff"
        skinColor="#fcd9b6"
        hairColor="#1a1a2e"
        accessoryColor="#3b82f6"
        scale={1.1}
      >
        {/* Lab coat collar */}
        <mesh position={[0, 0.65, 0.2]}>
          <boxGeometry args={[0.5, 0.15, 0.1]} />
          <meshStandardMaterial color="#e8e8e8" />
        </mesh>
        {/* Safety goggles on head */}
        <mesh position={[0, 1.55, 0.3]}>
          <torusGeometry args={[0.2, 0.03, 8, 16]} />
          <meshStandardMaterial color="#88ccff" transparent opacity={0.5} />
        </mesh>
      </StylizedCharacter>

      {/* Floating atom model */}
      <Float speed={2} floatIntensity={0.5}>
        <AtomModel position={[2, 1.5, 0]} scale={1.5} />
      </Float>

      {/* DNA Helix */}
      <DNAHelix position={[-2, 1, 1]} scale={0.8} />

      {/* Beakers on the platform */}
      <Beaker position={[1.5, -0.8, 1]} />
      <Beaker position={[-1.2, -0.8, 1.5]} />

      {/* Zone Label */}
      <FloatingText
        text="Cambridge"
        position={[0, 3, 0]}
        fontSize={0.4}
        color="#60a5fa"
      />
      <FloatingText
        text="Natural Sciences"
        position={[0, 2.5, 0]}
        fontSize={0.2}
        color="#93c5fd"
      />

      {/* Point light for this zone */}
      <pointLight position={[0, 2, 0]} intensity={1} color="#60a5fa" distance={8} />
    </FloatingIsland>
  )
}
