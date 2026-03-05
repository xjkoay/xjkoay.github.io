import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function OrbitingItem({
  radius = 2,
  speed = 0.5,
  offset = 0,
  yOffset = 0,
  bobAmount = 0.3,
  children
}) {
  const groupRef = useRef()
  const time = useRef(offset)

  useFrame((_, delta) => {
    time.current += delta * speed
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(time.current) * radius
      groupRef.current.position.z = Math.sin(time.current) * radius
      groupRef.current.position.y = yOffset + Math.sin(time.current * 2) * bobAmount
      groupRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      {children}
    </group>
  )
}
