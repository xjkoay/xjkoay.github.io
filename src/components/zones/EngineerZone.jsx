import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Holographic Monitor */
function HoloMonitor({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const ref = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.material.opacity = 0.15 + Math.sin(time.current * 3) * 0.05
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Screen */}
      <mesh ref={ref}>
        <planeGeometry args={[0.8, 0.5]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Border */}
      <mesh>
        <planeGeometry args={[0.82, 0.52]} />
        <meshBasicMaterial
          color="#34d399"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>
      {/* Code lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[-0.25 + i * 0.02, 0.15 - i * 0.07, 0.01]}>
          <planeGeometry args={[0.15 + Math.random() * 0.3, 0.02]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* Neural Network Nodes */
function NeuralNet({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = time.current * 0.2
    }
  })

  const layers = [3, 4, 4, 2]
  const nodes = []
  const connections = []

  layers.forEach((count, layerIdx) => {
    const x = (layerIdx - 1.5) * 0.6
    for (let i = 0; i < count; i++) {
      const y = (i - (count - 1) / 2) * 0.4
      nodes.push({ x, y, layer: layerIdx })

      if (layerIdx > 0) {
        const prevCount = layers[layerIdx - 1]
        for (let j = 0; j < prevCount; j++) {
          const prevY = (j - (prevCount - 1) / 2) * 0.4
          const prevX = (layerIdx - 2.5) * 0.6
          connections.push({ x1: prevX, y1: prevY, x2: x, y2: y })
        }
      }
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Connections */}
      {connections.map((c, i) => {
        const points = [
          new THREE.Vector3(c.x1, c.y1, 0),
          new THREE.Vector3(c.x2, c.y2, 0)
        ]
        const geom = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={`c-${i}`} geometry={geom}>
            <lineBasicMaterial color="#34d399" transparent opacity={0.2} />
          </line>
        )
      })}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <mesh key={`n-${i}`} position={[n.x, n.y, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial
            color="#34d399"
            emissive="#34d399"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

/* Floating Code Symbol */
function CodeSymbol({ text, position, color = '#34d399' }) {
  return (
    <FloatingText
      text={text}
      position={position}
      fontSize={0.3}
      color={color}
    />
  )
}

export default function EngineerZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#059669" size={3.5} active={active}>
      {/* Engineer Character */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#1a1a2e"
        skinColor="#fcd9b6"
        hairColor="#2c1810"
        accessoryColor="#34d399"
        scale={1.1}
      >
        {/* Headset */}
        <mesh position={[0, 1.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.45, 0.025, 8, 32, Math.PI]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        {/* Headset ear */}
        <mesh position={[-0.45, 1.2, 0]}>
          <boxGeometry args={[0.08, 0.15, 0.1]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      </StylizedCharacter>

      {/* Holographic monitors */}
      <HoloMonitor position={[1.5, 0.8, -0.5]} rotation={[0, -0.5, 0]} />
      <HoloMonitor position={[-1.5, 1, 0.5]} rotation={[0, 0.5, 0]} />

      {/* Neural network */}
      <Float speed={1.5} floatIntensity={0.3}>
        <NeuralNet position={[0, 2.5, 0]} scale={1.2} />
      </Float>

      {/* Floating code symbols */}
      <OrbitingItem radius={2.5} speed={0.3} offset={0} yOffset={1}>
        <CodeSymbol text="{ }" position={[0, 0, 0]} />
      </OrbitingItem>
      <OrbitingItem radius={2} speed={0.4} offset={2} yOffset={1.5}>
        <CodeSymbol text="< />" position={[0, 0, 0]} color="#60a5fa" />
      </OrbitingItem>
      <OrbitingItem radius={3} speed={0.2} offset={4} yOffset={0.5}>
        <CodeSymbol text="AI" position={[0, 0, 0]} color="#a855f7" />
      </OrbitingItem>

      {/* Zone label */}
      <FloatingText
        text="Software Engineer"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#34d399"
      />

      <pointLight position={[0, 2, 0]} intensity={1} color="#34d399" distance={8} />
    </FloatingIsland>
  )
}
