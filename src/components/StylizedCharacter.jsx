import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/*
  Stylized chibi character — procedurally built from Three.js primitives.
  Cute proportions (large head, small body) but clearly human features.
  Configurable: bodyColor, headColor, accessories.
*/
export default function StylizedCharacter({
  position = [0, 0, 0],
  bodyColor = '#4f46e5',
  skinColor = '#fcd9b6',
  hairColor = '#2c1810',
  accessoryColor = '#ffffff',
  scale = 1,
  rotation = [0, 0, 0],
  children // accessories, held items
}) {
  const groupRef = useRef()
  const time = useRef(Math.random() * 100)

  useFrame((_, delta) => {
    time.current += delta
    if (groupRef.current) {
      // Idle breathing animation
      groupRef.current.position.y =
        position[1] + Math.sin(time.current * 1.5) * 0.08
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* HEAD — large round head (chibi style) */}
      <group position={[0, 1.2, 0]}>
        {/* Main head sphere */}
        <mesh>
          <sphereGeometry args={[0.55, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.7} />
        </mesh>

        {/* Hair — cap-like hemisphere on top */}
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.57, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>

        {/* Left eye */}
        <mesh position={[-0.17, 0.05, 0.48]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Left eye highlight */}
        <mesh position={[-0.14, 0.08, 0.53]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>

        {/* Right eye */}
        <mesh position={[0.17, 0.05, 0.48]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>
        {/* Right eye highlight */}
        <mesh position={[0.2, 0.08, 0.53]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </mesh>

        {/* Smile — a small torus arc */}
        <mesh position={[0, -0.1, 0.5]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.08, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#d4756b" />
        </mesh>

        {/* Cheek blush left */}
        <mesh position={[-0.3, -0.05, 0.4]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#f5a0a0" transparent opacity={0.5} />
        </mesh>
        {/* Cheek blush right */}
        <mesh position={[0.3, -0.05, 0.4]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial color="#f5a0a0" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* BODY — rounded torso */}
      <mesh position={[0, 0.35, 0]}>
        <capsuleGeometry args={[0.3, 0.4, 16, 16]} />
        <meshStandardMaterial color={bodyColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* LEFT ARM */}
      <mesh position={[-0.42, 0.4, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.09, 0.35, 8, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </mesh>
      {/* Left hand */}
      <mesh position={[-0.58, 0.1, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* RIGHT ARM */}
      <mesh position={[0.42, 0.4, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.09, 0.35, 8, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </mesh>
      {/* Right hand */}
      <mesh position={[0.58, 0.1, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color={skinColor} roughness={0.7} />
      </mesh>

      {/* LEFT LEG */}
      <mesh position={[-0.15, -0.25, 0]}>
        <capsuleGeometry args={[0.1, 0.3, 8, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </mesh>
      {/* Left shoe */}
      <mesh position={[-0.15, -0.55, 0.05]}>
        <boxGeometry args={[0.16, 0.1, 0.25]} />
        <meshStandardMaterial color={accessoryColor} roughness={0.5} />
      </mesh>

      {/* RIGHT LEG */}
      <mesh position={[0.15, -0.25, 0]}>
        <capsuleGeometry args={[0.1, 0.3, 8, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.6} />
      </mesh>
      {/* Right shoe */}
      <mesh position={[0.15, -0.55, 0.05]}>
        <boxGeometry args={[0.16, 0.1, 0.25]} />
        <meshStandardMaterial color={accessoryColor} roughness={0.5} />
      </mesh>

      {/* Accessories/held items rendered as children */}
      {children}
    </group>
  )
}
