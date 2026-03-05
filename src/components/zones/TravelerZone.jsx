import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Simplified Airplane */
function Airplane({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Fuselage */}
      <mesh>
        <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.02]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </mesh>
      {/* Tail */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.15, 0.15]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.4} />
      </mesh>
      {/* Cockpit window */}
      <mesh position={[0, -0.15, 0.06]}>
        <boxGeometry args={[0.06, 0.08, 0.04]} />
        <meshStandardMaterial color="#0284c7" roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  )
}

/* Suitcase / Luggage */
function Luggage({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main body */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.25, 0.4, 0.15]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} />
      </mesh>
      {/* Handle */}
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[0.06, 0.015, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
      </mesh>
      {/* Wheels */}
      {[-0.08, 0.08].map((x, i) => (
        <mesh key={i} position={[x, -0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
      {/* Stickers */}
      <mesh position={[0.05, 0.25, 0.08]}>
        <planeGeometry args={[0.06, 0.04]} />
        <meshStandardMaterial color="#ef4444" />
      </mesh>
      <mesh position={[-0.06, 0.15, 0.08]} rotation={[0, 0, 0.2]}>
        <planeGeometry args={[0.05, 0.05]} />
        <meshStandardMaterial color="#eab308" />
      </mesh>
    </group>
  )
}

/* Polaroids / Photos */
function Polaroid({ position = [0, 0, 0], rotation = [0, 0, 0], photoColor = "#94a3b8" }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.3, 0.35, 0.01]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, 0.01]}>
        <planeGeometry args={[0.26, 0.26]} />
        <meshStandardMaterial color={photoColor} roughness={0.5} />
      </mesh>
    </group>
  )
}

/* Camera */
function DSLRM({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <mesh>
        <boxGeometry args={[0.25, 0.15, 0.1]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>
      {/* Lens */}
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.6} />
      </mesh>
      {/* Lens Glass */}
      <mesh position={[0, 0, 0.135]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.01, 16]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Flash */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.08, 0.05, 0.08]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

/* Stylized Globe */
function StylizedGlobe({ position = [0, 0, 0], scale = 1 }) {
  const globeRef = useRef()
  useFrame(() => {
    if (globeRef.current) globeRef.current.rotation.y += 0.005
  })
  return (
    <group position={position} scale={scale}>
      <mesh ref={globeRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#0284c7" wireframe transparent opacity={0.3} />
      </mesh>
      {/* Core */}
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>
      {/* Some location pins */}
      {[
        [0.2, 0.2, 0.25], [-0.1, 0.2, 0.3], [0.35, 0, 0.1], [-0.2, -0.1, 0.35]
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" />
        </mesh>
      ))}
    </group>
  )
}

export default function TravelerZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#0ea5e9" size={3.5} active={active}>
      {/* Traveler Character */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#cbd5e1" // Light jacket
        skinColor="#fcd9b6"
        hairColor="#1a1a2e"
        accessoryColor="#475569" // Dark pants/acc
        scale={1.1}
      >
        {/* White Cap */}
        <group position={[0, 1.35, 0]}>
          <mesh>
            <sphereGeometry args={[0.26, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
            <meshStandardMaterial color="#ffffff" roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.05, 0.12]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[0.3, 0.02, 0.2]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </StylizedCharacter>

      {/* Floating Luggage */}
      <Float speed={1.5} floatIntensity={0.2} rotationIntensity={0.1}>
        <Luggage position={[-1.2, 0.2, 0.5]} rotation={[0, 0.4, 0]} />
      </Float>

      {/* Globe */}
      <Float speed={2} floatIntensity={0.3}>
        <StylizedGlobe position={[1.5, 0.8, -0.5]} scale={1.2} />
      </Float>

      {/* Camera */}
      <Float speed={2.5} floatIntensity={0.4} rotationIntensity={0.5}>
        <DSLRM position={[-1.5, 1.2, -0.5]} rotation={[0.2, 0.8, -0.1]} />
      </Float>

      {/* Orbiting Airplane */}
      <OrbitingItem radius={2.8} speed={0.8} offset={0} yOffset={1.5}>
        <Airplane rotation={[Math.PI / 2, Math.PI, Math.PI / 2]} />
      </OrbitingItem>

      {/* Polaroids */}
      <OrbitingItem radius={2.2} speed={0.2} offset={2} yOffset={1.2}>
        <Polaroid rotation={[0.2, 0.5, 0.1]} photoColor="#0284c7" />
      </OrbitingItem>
      <OrbitingItem radius={2.4} speed={0.2} offset={4} yOffset={0.8}>
        <Polaroid rotation={[-0.1, -0.3, -0.2]} photoColor="#10b981" />
      </OrbitingItem>

      {/* Zone label */}
      <FloatingText
        text="World Traveler"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#38bdf8"
      />
      <FloatingText
        text="Globetrotter"
        position={[0, 3, 0]}
        fontSize={0.15}
        color="#e2e8f0"
      />

      {/* Cool blue/cyan lighting */}
      <pointLight position={[0, 2, 1]} intensity={0.8} color="#38bdf8" distance={8} />
      <pointLight position={[-1, 1, -1]} intensity={0.5} color="#818cf8" distance={5} />
    </FloatingIsland>
  )
}
