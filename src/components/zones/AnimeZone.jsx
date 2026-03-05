import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Straw Hat (One Piece reference) */
function StrawHat({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Crown */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.9} />
      </mesh>
      {/* Brim */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.02, 16]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.9} />
      </mesh>
      {/* Red band */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.205, 0.205, 0.04, 16]} />
        <meshStandardMaterial color="#dc2626" roughness={0.7} />
      </mesh>
    </group>
  )
}

/* Doraemon's Anywhere Door */
function AnywhereDoor({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.material.emissiveIntensity = 0.3 + Math.sin(time.current * 2) * 0.2
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Door frame */}
      <mesh>
        <boxGeometry args={[0.4, 0.6, 0.03]} />
        <meshStandardMaterial color="#ec4899" roughness={0.5} />
      </mesh>
      {/* Door surface */}
      <mesh ref={ref} position={[0, 0, 0.02]}>
        <planeGeometry args={[0.35, 0.55]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.12, 0, 0.04]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} />
      </mesh>
    </group>
  )
}

/* Doraemon inspired orb with bell */
function DoraemonOrb({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Blue head */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1e90ff" roughness={0.5} />
      </mesh>
      {/* White face area */}
      <mesh position={[0, -0.03, 0.15]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.6} />
      </mesh>
      {/* Red nose */}
      <mesh position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.3} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.04, 0.05, 0.17]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.04, 0.05, 0.17]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Eye pupils */}
      <mesh position={[-0.03, 0.05, 0.2]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.03, 0.05, 0.2]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Bell */}
      <mesh position={[0, -0.15, 0.12]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Bell ribbon */}
      <mesh position={[0, -0.1, 0.1]}>
        <torusGeometry args={[0.12, 0.015, 8, 16]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
    </group>
  )
}

/* Netflix N */
function NetflixN({ position = [0, 0, 0] }) {
  return (
    <FloatingText
      text="N"
      position={position}
      fontSize={0.35}
      color="#e50914"
    />
  )
}

/* TV / Screen */
function TVScreen({ position = [0, 0, 0] }) {
  const ref = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.material.emissiveIntensity = 0.2 + Math.sin(time.current * 1.5) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* TV frame */}
      <mesh>
        <boxGeometry args={[0.8, 0.5, 0.04]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Screen */}
      <mesh ref={ref} position={[0, 0, 0.025]}>
        <planeGeometry args={[0.72, 0.42]} />
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#6366f1"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.3, 0.08, 0.04]} />
        <meshStandardMaterial color="#333333" metalness={0.7} />
      </mesh>
    </group>
  )
}

export default function AnimeZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#6366f1" size={3.5} active={active}>
      {/* Anime Fan Character — casual outfit */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#1e293b"
        skinColor="#fcd9b6"
        hairColor="#1a1a2e"
        accessoryColor="#ec4899"
        scale={1.1}
      >
        {/* Hoodie hood */}
        <mesh position={[0, 1.1, -0.15]}>
          <sphereGeometry args={[0.4, 16, 16, 0, Math.PI * 2, Math.PI * 0.3, Math.PI * 0.4]} />
          <meshStandardMaterial color="#1e293b" roughness={0.8} />
        </mesh>
      </StylizedCharacter>

      {/* One Piece Straw Hat — prominent */}
      <Float speed={2} floatIntensity={0.5}>
        <StrawHat position={[2, 2, 0]} scale={1.5} />
      </Float>

      {/* Doraemon's Anywhere Door */}
      <Float speed={1.2} floatIntensity={0.4}>
        <AnywhereDoor position={[-2, 1, -0.5]} scale={1.3} />
      </Float>

      {/* Doraemon orb */}
      <Float speed={1.8} floatIntensity={0.4}>
        <DoraemonOrb position={[-1.5, 2.5, 0.5]} />
      </Float>

      {/* TV Screen */}
      <TVScreen position={[1.5, 0.5, -0.5]} />

      {/* Netflix N */}
      <OrbitingItem radius={2.5} speed={0.2} offset={0} yOffset={2}>
        <NetflixN />
      </OrbitingItem>

      {/* Orbiting manga/scroll items */}
      <OrbitingItem radius={2.8} speed={0.15} offset={3} yOffset={1}>
        <mesh>
          <boxGeometry args={[0.15, 0.2, 0.02]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.7} />
        </mesh>
      </OrbitingItem>

      {/* Zone label */}
      <FloatingText
        text="Anime & Netflix"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#818cf8"
      />
      <FloatingText
        text="Doraemon · One Piece"
        position={[0, 3, 0]}
        fontSize={0.15}
        color="#c084fc"
      />

      <pointLight position={[0, 2, 0]} intensity={1} color="#818cf8" distance={8} />
      <pointLight position={[-1, 1, 1]} intensity={0.5} color="#ec4899" distance={5} />
    </FloatingIsland>
  )
}
