import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 200 }) {
  const meshRef = useRef()
  const time = useRef(0)

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)

    const palette = [
      new THREE.Color('#a855f7'),
      new THREE.Color('#60a5fa'),
      new THREE.Color('#ec4899'),
      new THREE.Color('#fbbf24'),
      new THREE.Color('#34d399'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40
      positions[i * 3 + 2] = -Math.random() * 130

      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      speeds[i] = 0.1 + Math.random() * 0.3
    }

    return { positions, colors, speeds }
  }, [count])

  useFrame((_, delta) => {
    time.current += delta
    const pos = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      // Gentle floating motion
      pos[i * 3 + 1] += Math.sin(time.current * speeds[i] + i) * 0.002
      pos[i * 3] += Math.cos(time.current * speeds[i] * 0.5 + i) * 0.001
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
