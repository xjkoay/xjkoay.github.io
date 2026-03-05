import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Nasi Lemak Bowl */
function NasiLemak({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Bowl */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.15, 0.12, 16]} />
        <meshStandardMaterial color="#f5f0e6" roughness={0.8} />
      </mesh>
      {/* Rice */}
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.17, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#fffef0" roughness={0.9} />
      </mesh>
      {/* Sambal */}
      <mesh position={[0.08, 0.1, 0.05]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.8} />
      </mesh>
      {/* Egg */}
      <mesh position={[-0.08, 0.1, 0.05]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#fef08a" roughness={0.7} />
      </mesh>
      {/* Steam particles */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.06, 0.2 + i * 0.05, 0]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* Wok */
function Wok({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh rotation={[0.3, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.7}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Handle */}
      <mesh position={[0.25, 0, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
    </group>
  )
}

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

/* Netflix N */
function NetflixN({ position = [0, 0, 0], scale = 1 }) {
  return (
    <FloatingText
      text="N"
      position={position}
      fontSize={0.4 * scale}
      color="#e50914"
    />
  )
}

export default function LifestyleZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#ea580c" size={3.5} active={active}>
      {/* Chef/Lifestyle Character */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#ffffff"
        skinColor="#fcd9b6"
        hairColor="#2c1810"
        accessoryColor="#ea580c"
        scale={1.1}
      >
        {/* Chef hat */}
        <mesh position={[0, 1.65, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.15, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.9} />
        </mesh>
      </StylizedCharacter>

      {/* Nasi Lemak */}
      <Float speed={1.5} floatIntensity={0.3}>
        <NasiLemak position={[1.5, 0, 0.5]} scale={1.5} />
      </Float>

      {/* Wok */}
      <Wok position={[-1, -0.5, 0.5]} />

      {/* One Piece Straw Hat */}
      <Float speed={2} floatIntensity={0.5}>
        <StrawHat position={[-2, 1.5, 0]} scale={1.2} />
      </Float>

      {/* Doraemon's Anywhere Door */}
      <Float speed={1.2} floatIntensity={0.4}>
        <AnywhereDoor position={[2, 1.5, -0.5]} scale={1} />
      </Float>

      {/* Netflix N */}
      <OrbitingItem radius={2.5} speed={0.2} offset={0} yOffset={2}>
        <NetflixN scale={0.8} />
      </OrbitingItem>

      {/* Doraemon reference — blue sphere with bell */}
      <Float speed={1.8} floatIntensity={0.4}>
        <group position={[-1.5, 2.5, 0.5]}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#1e90ff" roughness={0.5} />
          </mesh>
          {/* Bell */}
          <mesh position={[0, -0.15, 0.1]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </Float>

      {/* Zone label */}
      <FloatingText
        text="Chef & Otaku"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#ea580c"
      />

      <pointLight position={[0, 2, 0]} intensity={1} color="#ea580c" distance={8} />
    </FloatingIsland>
  )
}
