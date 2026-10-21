import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sparkles } from '@react-three/drei'

function Orbit({ r, speed, color, count, tilt }) {
  const ref = useRef()
  useFrame((_, d) => { ref.current.rotation.y += d * speed })
  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={ref}>
        {Array.from({ length: count }).map((_, i) => {
          const a = (i / count) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]} rotation={[a, a, 0]}>
              <boxGeometry args={[0.34, 0.34, 0.34]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.3} />
            </mesh>
          )
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.01, 8, 160]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  )
}

function Core() {
  const g = useRef()
  useFrame((s, d) => {
    g.current.rotation.y += d * 0.15
    g.current.position.x += (s.pointer.x * 0.7 - g.current.position.x) * 0.05
    g.current.position.y += (s.pointer.y * 0.5 - g.current.position.y) * 0.05
  })
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[1.3, 12]} />
        <MeshDistortMaterial color="#8B6BFF" distort={0.45} speed={2} roughness={0.2} metalness={0.25} />
      </mesh>
      <Orbit r={2.4} speed={0.5} color="#4CF2C2" count={5} tilt={0.5} />
      <Orbit r={3.3} speed={-0.32} color="#FFB547" count={4} tilt={-0.9} />
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#ffffff" />
      <pointLight position={[-6, -3, 2]} intensity={40} color="#4CF2C2" />
      <Core />
      <Sparkles count={70} scale={[12, 8, 6]} size={2.2} speed={0.3} color="#cdbfff" />
    </Canvas>
  )
}
