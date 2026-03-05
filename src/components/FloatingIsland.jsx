import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function FloatingIsland({
  position = [0, 0, 0],
  color = '#a855f7',
  size = 3,
  children,
  active = false
}) {
  const groupRef = useRef()
  const glowRef = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.position.y =
        position[1] + Math.sin(time.current * 0.5) * 0.3
      groupRef.current.rotation.y += delta * 0.05
    }
    if (glowRef.current) {
      glowRef.current.material.opacity =
        0.15 + Math.sin(time.current * 2) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Main island platform */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[size, size * 0.8, 0.6, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Top surface - slightly glossier */}
      <mesh position={[0, -1.19, 0]}>
        <cylinderGeometry args={[size * 0.95, size * 0.95, 0.05, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Glow ring underneath */}
      <mesh ref={glowRef} position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.6, size * 1.1, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Children (character + props) */}
      <group position={[0, 0, 0]}>
        {children}
      </group>
    </group>
  )
}
