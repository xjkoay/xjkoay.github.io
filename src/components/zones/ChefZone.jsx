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
      {/* Cucumber */}
      <mesh position={[0, 0.1, -0.08]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#4ade80" roughness={0.7} />
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

/* Wok with fire */
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
      {/* Fire underneath */}
      <mesh position={[0, -0.15, 0]}>
        <coneGeometry args={[0.08, 0.15, 8]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}

/* Spatula */
function Spatula({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.1, 0.12, 0.01]} />
        <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

/* Chili */
function Chili({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation}>
      <capsuleGeometry args={[0.015, 0.08, 8, 8]} />
      <meshStandardMaterial color="#dc2626" roughness={0.7} />
    </mesh>
  )
}

/* Plate with food */
function Plate({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
        <meshStandardMaterial color="#f5f0e6" roughness={0.6} />
      </mesh>
      {/* Food on plate */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.1, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
        <meshStandardMaterial color="#8B6914" roughness={0.9} />
      </mesh>
    </group>
  )
}

export default function ChefZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#ea580c" size={3.5} active={active}>
      {/* Chef Character */}
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
        {/* Apron strap */}
        <mesh position={[0, 0.45, 0.28]}>
          <boxGeometry args={[0.35, 0.05, 0.01]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>
      </StylizedCharacter>

      {/* Spatula in hand */}
      <Spatula position={[0.7, 0.3, 0.2]} rotation={[0.3, 0, -0.5]} />

      {/* Nasi Lemak — front and center */}
      <Float speed={1.5} floatIntensity={0.3}>
        <NasiLemak position={[1.8, 0.5, 0.5]} scale={2} />
      </Float>

      {/* Wok */}
      <Wok position={[-1.3, -0.5, 0.5]} />

      {/* Plate of food */}
      <Float speed={1.2} floatIntensity={0.2}>
        <Plate position={[-1.8, 0.3, -0.5]} />
      </Float>

      {/* Floating chilies */}
      <OrbitingItem radius={2.5} speed={0.3} offset={0} yOffset={1.5}>
        <Chili rotation={[0, 0, 0.5]} />
      </OrbitingItem>
      <OrbitingItem radius={2} speed={0.4} offset={3} yOffset={1}>
        <Chili rotation={[0.3, 0, -0.3]} />
      </OrbitingItem>

      {/* Zone label */}
      <FloatingText
        text="Home Chef"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#ea580c"
      />
      <FloatingText
        text="Malaysian Cuisine"
        position={[0, 3, 0]}
        fontSize={0.15}
        color="#fbbf24"
      />

      <pointLight position={[0, 2, 0]} intensity={1} color="#ea580c" distance={8} />
    </FloatingIsland>
  )
}
