import { Text } from '@react-three/drei'

export default function FloatingText({
  text,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  fontSize = 0.5,
  color = '#a855f7',
  anchorX = 'center',
  anchorY = 'middle',
  maxWidth = 20,
  outlineWidth = 0,
  outlineColor = '#000000'
}) {
  return (
    <Text
      position={position}
      rotation={rotation}
      fontSize={fontSize}
      color={color}
      anchorX={anchorX}
      anchorY={anchorY}
      maxWidth={maxWidth}
      outlineWidth={outlineWidth}
      outlineColor={outlineColor}
      font={undefined}
    >
      {text}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.9}
      />
    </Text>
  )
}
