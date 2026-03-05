import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Table Tennis Paddle */
function Paddle({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Handle */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        <meshStandardMaterial color="#8B6914" roughness={0.7} />
      </mesh>
      {/* Blade */}
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
        <meshStandardMaterial color="#dc2626" roughness={0.6} />
      </mesh>
    </group>
  )
}

/* Ping Pong Ball */
function PingPongBall({ startPosition = [0, 0, 0] }) {
  const ref = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.position.x = startPosition[0] + Math.sin(time.current * 3) * 1.5
      ref.current.position.y = startPosition[1] + Math.abs(Math.sin(time.current * 4)) * 0.8
      ref.current.position.z = startPosition[2] + Math.cos(time.current * 2) * 0.5
    }
  })

  return (
    <mesh ref={ref} position={startPosition}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshStandardMaterial
        color="#ff8c00"
        emissive="#ff8c00"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

/* Small sports equipment items */
function TennisRacket({ position = [0, 0, 0] }) {
  return (
    <group position={position} scale={0.6}>
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[0.12, 0.015, 8, 16]} />
        <meshStandardMaterial color="#34d399" />
      </mesh>
    </group>
  )
}

function Dumbbell({ position = [0, 0, 0] }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]} scale={0.5}>
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
        <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
        <meshStandardMaterial color="#444444" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Shuttlecock({ position = [0, 0, 0] }) {
  return (
    <group position={position} scale={0.5}>
      {/* Cork base */}
      <mesh>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#f5f0e6" />
      </mesh>
      {/* Feathers */}
      <mesh position={[0, 0.12, 0]}>
        <coneGeometry args={[0.12, 0.2, 8, 1, true]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/* Mountain silhouette */
function Mountain({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <coneGeometry args={[0.4, 0.8, 4]} />
        <meshStandardMaterial color="#4ade80" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0.3, -0.1, 0]}>
        <coneGeometry args={[0.3, 0.6, 4]} />
        <meshStandardMaterial color="#34d399" transparent opacity={0.35} />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 0.35, 0]}>
        <coneGeometry args={[0.1, 0.15, 4]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

export default function AthleteZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#dc2626" size={3.5} active={active}>
      {/* Athlete Character — sporty outfit */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#dc2626"
        skinColor="#fcd9b6"
        hairColor="#1a1a2e"
        accessoryColor="#ffffff"
        scale={1.1}
      >
        {/* Headband */}
        <mesh position={[0, 1.45, 0]}>
          <torusGeometry args={[0.5, 0.03, 8, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Jersey number */}
        <FloatingText
          text="1"
          position={[0, 0.4, 0.32]}
          fontSize={0.15}
          color="#ffffff"
        />
      </StylizedCharacter>

      {/* Table tennis paddle in hand */}
      <Paddle position={[0.7, 0.3, 0.2]} rotation={[0.3, 0, -0.5]} />

      {/* Bouncing ping pong ball */}
      <PingPongBall startPosition={[0, 1.5, 1]} />

      {/* Orbiting sports equipment */}
      <OrbitingItem radius={2.5} speed={0.3} offset={0} yOffset={1}>
        <TennisRacket />
      </OrbitingItem>
      <OrbitingItem radius={2.8} speed={0.25} offset={2} yOffset={1.5}>
        <Shuttlecock />
      </OrbitingItem>
      <OrbitingItem radius={2.2} speed={0.35} offset={4} yOffset={0.8}>
        <Dumbbell />
      </OrbitingItem>

      {/* Mountain scenery */}
      <Mountain position={[-2, -0.5, -1]} scale={1.2} />

      {/* State Player badge */}
      <Float speed={2} floatIntensity={0.3}>
        <group position={[2, 2, 0]}>
          <mesh>
            <circleGeometry args={[0.3, 16]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#fbbf24"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <FloatingText
            text="★"
            position={[0, 0.02, 0.01]}
            fontSize={0.25}
            color="#1a1a2e"
          />
        </group>
      </Float>

      {/* Zone label */}
      <FloatingText
        text="State Player"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#f87171"
      />

      <pointLight position={[0, 2, 0]} intensity={1} color="#f87171" distance={8} />
    </FloatingIsland>
  )
}
