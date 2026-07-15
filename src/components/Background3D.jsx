import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function ParticleCluster(props) {
  const ref = useRef();
  
  // Generate random positions inside a sphere using pure math
  const [sphere] = useState(() => {
    const points = new Float32Array(3000);
    const radius = 1.6;
    for (let i = 0; i < 3000; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;
      
      points[i] = r * Math.sin(phi) * Math.cos(theta);
      points[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      points[i + 2] = r * Math.cos(phi);
    }
    return points;
  });

  // Rotate slowly and slightly drift on mouse move
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 22;
      
      // Sways slightly with mouse coordinates
      const targetX = state.pointer.x * 0.08;
      const targetY = state.pointer.y * 0.08;
      ref.current.position.x += (targetX - ref.current.position.x) * 0.05;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.05;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#eab308"
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.65}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const meshRef1 = useRef();
  const meshRef2 = useRef();
  const meshRef3 = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Wave movement and rotation
    if (meshRef1.current) {
      meshRef1.current.rotation.x = time * 0.1;
      meshRef1.current.rotation.y = time * 0.15;
      meshRef1.current.position.y = Math.sin(time * 0.5) * 0.3 + 0.5;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = time * -0.15;
      meshRef2.current.rotation.z = time * 0.1;
      meshRef2.current.position.y = Math.cos(time * 0.6) * 0.2 - 0.7;
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.y = time * 0.2;
      meshRef3.current.position.y = Math.sin(time * 0.4) * 0.15;
    }
  });

  return (
    <group>
      {/* Dynamic drifting wireframe geometry 1 (Torus) */}
      <mesh ref={meshRef1} position={[-2.5, 0.5, -2]}>
        <torusGeometry args={[0.5, 0.15, 8, 24]} />
        <meshBasicMaterial color="#d97706" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Dynamic drifting wireframe geometry 2 (Icosahedron) */}
      <mesh ref={meshRef2} position={[2.5, -0.7, -1]}>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshBasicMaterial color="#eab308" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Floating center geometry 3 (Dodecahedron) */}
      <mesh ref={meshRef3} position={[0, 0, -3]}>
        <dodecahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#71717a" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-[#000000]">
      {/* Background radial gradient mask to keep text highly legible */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_40%,#000000_95%)]" />
      
      <Canvas camera={{ position: [0, 0, 1] }} className="w-full h-full">
        <ambientLight intensity={0.4} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <ParticleCluster />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
