import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Globe with connection lines */
function HoloGlobe({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.3
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Wireframe globe */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 12]} />
        <meshStandardMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.48, 16, 12]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
        />
      </mesh>
      {/* Connection points */}
      {[
        [0.3, 0.3, 0.2],
        [-0.2, 0.4, 0.1],
        [0.1, -0.3, 0.35],
        [-0.35, -0.1, 0.25],
        [0.4, 0, -0.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  )
}

/* AI Brain/Chip */
function AIChip({ position = [0, 0, 0], scale = 1 }) {
  const ref = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.rotation.y = time.current * 0.5
    }
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Chip body */}
      <mesh>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Central brain pattern */}
      <mesh position={[0, 0, 0.03]}>
        <circleGeometry args={[0.12, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Pins */}
      {[-1, -0.5, 0, 0.5, 1].map((offset, i) => (
        <group key={i}>
          {/* Top pins */}
          <mesh position={[offset * 0.15, 0.24, 0]}>
            <boxGeometry args={[0.02, 0.08, 0.02]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} />
          </mesh>
          {/* Bottom pins */}
          <mesh position={[offset * 0.15, -0.24, 0]}>
            <boxGeometry args={[0.02, 0.08, 0.02]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} />
          </mesh>
          {/* Left pins */}
          <mesh position={[-0.24, offset * 0.15, 0]}>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} />
          </mesh>
          {/* Right pins */}
          <mesh position={[0.24, offset * 0.15, 0]}>
            <boxGeometry args={[0.08, 0.02, 0.02]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function CEOZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#7c3aed" size={4} active={active}>
      {/* CEO Character — suited up */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#1a1a2e"
        skinColor="#fcd9b6"
        hairColor="#1a1a2e"
        accessoryColor="#a855f7"
        scale={1.2}
      >
        {/* Suit lapels */}
        <mesh position={[-0.12, 0.6, 0.22]} rotation={[0, 0, 0.2]}>
          <planeGeometry args={[0.12, 0.2]} />
          <meshStandardMaterial color="#2d2d5e" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.12, 0.6, 0.22]} rotation={[0, 0, -0.2]}>
          <planeGeometry args={[0.12, 0.2]} />
          <meshStandardMaterial color="#2d2d5e" side={THREE.DoubleSide} />
        </mesh>
        {/* Tie */}
        <mesh position={[0, 0.5, 0.25]}>
          <coneGeometry args={[0.03, 0.2, 4]} />
          <meshStandardMaterial color="#a855f7" roughness={0.3} metalness={0.5} />
        </mesh>
      </StylizedCharacter>

      {/* QuarkX 3D Text */}
      <Float speed={1.5} floatIntensity={0.5}>
        <FloatingText
          text="QuarkX"
          position={[0, 3.5, 0]}
          fontSize={0.6}
          color="#a855f7"
        />
        <FloatingText
          text="AI Transformation"
          position={[0, 2.9, 0]}
          fontSize={0.2}
          color="#fbbf24"
        />
      </Float>

      {/* Holographic Globe */}
      <Float speed={1} floatIntensity={0.3}>
        <HoloGlobe position={[2, 1.5, 0]} scale={1.5} />
      </Float>

      {/* AI Chip */}
      <Float speed={2} floatIntensity={0.4}>
        <AIChip position={[-2, 1.5, 0.5]} scale={1.5} />
      </Float>

      {/* Orbiting keywords */}
      <OrbitingItem radius={3} speed={0.2} offset={0} yOffset={1}>
        <FloatingText text="Strategy" position={[0, 0, 0]} fontSize={0.15} color="#fbbf24" />
      </OrbitingItem>
      <OrbitingItem radius={3.2} speed={0.15} offset={2.5} yOffset={1.5}>
        <FloatingText text="Engineering" position={[0, 0, 0]} fontSize={0.15} color="#60a5fa" />
      </OrbitingItem>
      <OrbitingItem radius={2.8} speed={0.25} offset={5} yOffset={0.5}>
        <FloatingText text="Consulting" position={[0, 0, 0]} fontSize={0.15} color="#34d399" />
      </OrbitingItem>

      <pointLight position={[0, 3, 0]} intensity={1.5} color="#a855f7" distance={10} />
      <pointLight position={[2, 1, 2]} intensity={0.5} color="#fbbf24" distance={6} />
    </FloatingIsland>
  )
}
