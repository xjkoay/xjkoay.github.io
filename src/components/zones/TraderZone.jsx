import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import FloatingIsland from '../FloatingIsland'
import StylizedCharacter from '../StylizedCharacter'
import FloatingText from '../shared/FloatingText'
import OrbitingItem from '../shared/OrbitingItem'

/* 3D Candlestick Chart */
function CandlestickChart({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time.current * 0.5) * 0.2
    }
  })

  const candles = [
    { h: 0.3, color: '#34d399', y: 0 },
    { h: 0.5, color: '#f87171', y: 0.05 },
    { h: 0.2, color: '#34d399', y: -0.05 },
    { h: 0.6, color: '#34d399', y: 0.1 },
    { h: 0.35, color: '#f87171', y: 0.15 },
    { h: 0.45, color: '#34d399', y: 0.2 },
    { h: 0.25, color: '#f87171', y: 0.1 },
    { h: 0.55, color: '#34d399', y: 0.25 },
  ]

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {candles.map((c, i) => (
        <group key={i} position={[(i - 3.5) * 0.15, c.y, 0]}>
          {/* Candle body */}
          <mesh position={[0, c.h / 2, 0]}>
            <boxGeometry args={[0.08, c.h, 0.08]} />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.4}
            />
          </mesh>
          {/* Wick */}
          <mesh position={[0, c.h + 0.05, 0]}>
            <boxGeometry args={[0.01, 0.1, 0.01]} />
            <meshStandardMaterial color={c.color} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}
      {/* Base line */}
      <mesh position={[0, -0.02, 0]}>
        <boxGeometry args={[1.5, 0.005, 0.005]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

/* Currency Symbol */
function CurrencySymbol({ text, position, color = '#fbbf24' }) {
  return (
    <FloatingText
      text={text}
      position={position}
      fontSize={0.25}
      color={color}
    />
  )
}

/* News ticker ribbon */
function NewsTicker({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const ref = useRef()
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    if (ref.current) {
      ref.current.material.opacity = 0.1 + Math.sin(time.current * 2) * 0.05
    }
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[3, 0.12]} />
      <meshBasicMaterial
        color="#fbbf24"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function TraderZone({ position, active }) {
  return (
    <FloatingIsland position={position} color="#854d0e" size={3.5} active={active}>
      {/* Trader Character */}
      <StylizedCharacter
        position={[0, 0, 0]}
        bodyColor="#1e3a5f"
        skinColor="#fcd9b6"
        hairColor="#1a1a2e"
        accessoryColor="#fbbf24"
        scale={1.1}
      >
        {/* Tie */}
        <mesh position={[0, 0.5, 0.25]}>
          <coneGeometry args={[0.04, 0.25, 4]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.4} />
        </mesh>
      </StylizedCharacter>

      {/* Floating candlestick chart */}
      <Float speed={1} floatIntensity={0.3}>
        <CandlestickChart position={[1.5, 1.5, 0]} scale={1.5} />
      </Float>

      {/* News ticker */}
      <NewsTicker position={[0, 2.8, 0]} />
      <FloatingText
        text="▸ FINDING ALPHA ▸ QUANT STRATEGY ▸ NEWS ANALYSIS"
        position={[0, 2.8, 0.01]}
        fontSize={0.08}
        color="#fbbf24"
      />

      {/* Orbiting currency symbols */}
      <OrbitingItem radius={2.5} speed={0.3} offset={0} yOffset={1}>
        <CurrencySymbol text="$" position={[0, 0, 0]} />
      </OrbitingItem>
      <OrbitingItem radius={2.8} speed={0.25} offset={2} yOffset={1.5}>
        <CurrencySymbol text="¥" position={[0, 0, 0]} color="#f87171" />
      </OrbitingItem>
      <OrbitingItem radius={2.2} speed={0.35} offset={4} yOffset={0.8}>
        <CurrencySymbol text="€" position={[0, 0, 0]} color="#60a5fa" />
      </OrbitingItem>

      {/* Zone label */}
      <FloatingText
        text="Quantitative Trader"
        position={[0, 3.5, 0]}
        fontSize={0.3}
        color="#fbbf24"
      />

      <pointLight position={[0, 2, 0]} intensity={1} color="#fbbf24" distance={8} />
    </FloatingIsland>
  )
}
