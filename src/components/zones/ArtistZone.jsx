import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* Floating Canvas/Frame */
function PaintingFrame({ position, rotation = [0, 0, 0], color1, color2, size = [0.6, 0.5] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[size[0] + 0.06, size[1] + 0.06, 0.03]} />
        <meshStandardMaterial color="#8B6914" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Canvas with abstract art */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color={color1} roughness={0.9} />
      </mesh>
      {/* Abstract shapes on canvas */}
      <mesh position={[-0.1, 0.05, 0.025]}>
        <circleGeometry args={[0.1, 16]} />
        <meshStandardMaterial color={color2} roughness={0.9} />
      </mesh>
      <mesh position={[0.1, -0.05, 0.025]}>
        <planeGeometry args={[0.15, 0.12]} />
        <meshStandardMaterial color={color1 === '#ec4899' ? '#fbbf24' : '#ec4899'} roughness={0.9} />
      </mesh>
    </group>
  )
}

/* Paint splatter particle */
function PaintSplatter({ position, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05 + Math.random() * 0.05, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        roughness={0.9}
      />
    </mesh>
  )
}

/* Easel */
function Easel({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Legs */}
      <mesh position={[-0.2, 0, 0]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      <mesh position={[0, 0, -0.15]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
      {/* Canvas on easel */}
      <mesh position={[0, 0.3, 0.03]}>
        <boxGeometry args={[0.5, 0.6, 0.02]} />
        <meshStandardMaterial color="#f5f0e6" roughness={0.95} />
      </mesh>
      {/* Paint strokes on canvas */}
      <mesh position={[-0.05, 0.35, 0.05]}>
        <planeGeometry args={[0.15, 0.08]} />
        <meshStandardMaterial color="#ec4899" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.08, 0.25, 0.05]}>
        <planeGeometry args={[0.2, 0.06]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export default function ArtistZone({ position, active }) {
  const splatColors = ['#ec4899', '#fbbf24', '#3b82f6', '#a855f7', '#34d399', '#f87171']

  return (
    <FloatingIsland position={position} color="#ec4899" size={3.5} active={active}>
      {/* Artist Character */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#6d28d9"
        skinColor="#fcd9b6"
        hairColor="#2c1810"
        accessoryColor="#ec4899"
        scale={1.1}
      >
        {/* Beret */}
        <mesh position={[0, 1.65, 0.1]} rotation={[0.3, 0, 0.15]}>
          <sphereGeometry args={[0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
          <meshStandardMaterial color="#c026d3" roughness={0.8} />
        </mesh>
        {/* Paintbrush in right hand */}
        <group position={[0.6, 0.2, 0.2]} rotation={[0, 0, -0.8]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
            <meshStandardMaterial color="#8B6914" />
          </mesh>
          {/* Brush tip */}
          <mesh position={[0, 0.3, 0]}>
            <coneGeometry args={[0.03, 0.1, 8]} />
            <meshStandardMaterial color="#ec4899" />
          </mesh>
        </group>
      </StylizedCharacter>

      {/* Floating painting frames */}
      <Float speed={1.5} floatIntensity={0.5}>
        <PaintingFrame
          position={[2, 1, -0.5]}
          rotation={[0, -0.3, 0.05]}
          color1="#ec4899"
          color2="#fbbf24"
        />
      </Float>
      <Float speed={2} floatIntensity={0.4}>
        <PaintingFrame
          position={[-2, 1.5, 0.5]}
          rotation={[0, 0.4, -0.05]}
          color1="#3b82f6"
          color2="#a855f7"
          size={[0.5, 0.7]}
        />
      </Float>
      <Float speed={1.2} floatIntensity={0.6}>
        <PaintingFrame
          position={[1, 2.5, 1]}
          rotation={[0.1, -0.2, 0.1]}
          color1="#34d399"
          color2="#fbbf24"
          size={[0.7, 0.5]}
        />
      </Float>

      {/* Easel */}
      <Easel position={[-1, -0.5, 0.5]} />

      {/* Paint splatters */}
      {splatColors.map((color, i) => (
        <PaintSplatter
          key={i}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random()) * 2,
            (Math.random() - 0.5) * 3
          ]}
          color={color}
        />
      ))}

      {/* Zone label */}
      <FloatingText
        text="Artist & Creator"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#ec4899"
      />

      <pointLight position={[0, 2, 0]} intensity={1} color="#ec4899" distance={8} />
    </FloatingIsland>
  )
}
