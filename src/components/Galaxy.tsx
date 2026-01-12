import React, { useLayoutEffect, useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls, Sparkles, Html, Float } from '@react-three/drei';
import { useStore } from '../store';
import { RESUME_DATA } from '../data';

// --- ICONS ---
import TerminalIcon from '@mui/icons-material/Terminal';       
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'; 
import HubIcon from '@mui/icons-material/Hub';                 
import CodeIcon from '@mui/icons-material/Code';               
import SchoolIcon from '@mui/icons-material/School';           

const PARTICLE_COUNT = 10000;
const GALAXY_RADIUS = 30;

const COLORS = {
  core: new THREE.Color('#ffffff'), 
  inner: new THREE.Color('#00ffff'), 
  mid: new THREE.Color('#0055ff'),   
  outer: new THREE.Color('#001133'), 
};

const getGalaxyColor = (normalizedRadius: number) => {
  const color = new THREE.Color();
  if (normalizedRadius < 0.15) {
    color.copy(COLORS.core).lerp(COLORS.inner, normalizedRadius * 6);
  } 
  else if (normalizedRadius < 0.5) {
    color.copy(COLORS.inner).lerp(COLORS.mid, (normalizedRadius - 0.15) * 2.8);
  } 
  else {
    color.copy(COLORS.mid).lerp(COLORS.outer, (normalizedRadius - 0.5) * 2);
  }
  return color;
};

const Marker = ({ node, mode, setActiveSection }: { node: typeof RESUME_DATA[0], mode: string, setActiveSection: any }) => {
  
  const Icon = useMemo(() => {
    switch(node.iconType) {
      case 'profile': return TerminalIcon;
      case 'travel': return FlightTakeoffIcon;
      case 'network': return HubIcon;
      case 'code': return CodeIcon;
      case 'education': return SchoolIcon;
      default: return TerminalIcon;
    }
  }, [node.iconType]);

  const isVisible = mode === 'overview';

  if (!isVisible && mode === 'detail') return null;

  return (
    <group position={node.position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Html 
          transform 
          distanceFactor={4} 
          zIndexRange={[100, 0]} 
          sprite
          style={{ pointerEvents: 'none' }} 
        >
          <div 
            onClick={(e) => {
              e.stopPropagation();
              setActiveSection(node.id);
            }}
            style={{
              pointerEvents: isVisible ? 'auto' : 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: isVisible ? 1 : 0,
              transform: `scale(${isVisible ? 1 : 0.5})`,
              transition: 'all 0.5s ease',
              cursor: 'pointer',
              width: '500px',
            }}
          >
            <div style={{
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '3px',
              color: '#00ffff',
              marginBottom: '8px',
              textTransform: 'uppercase',
              textShadow: '0 2px 4px black'
            }}>
              {node.role}
            </div>

            {/* --- UPDATED FONT SIZE HERE (48px -> 32px) --- */}
            <div style={{
              fontSize: '32px', 
              fontWeight: 300,
              color: '#fff',
              marginBottom: '15px',
              textAlign: 'center',
              textTransform: 'uppercase',
              lineHeight: 1,
              textShadow: '0 0 20px rgba(0, 85, 255, 0.8)'
            }}>
              {node.title}
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              border: '2px solid rgba(0, 85, 255, 0.6)',
              background: 'rgba(0, 10, 30, 0.6)',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 85, 255, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 10, 30, 0.6)'}
            >
              <Icon style={{ color: '#fff', fontSize: '32px' }} />
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
};

export const Galaxy: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const controlsRef = useRef<CameraControls>(null);
  const { activeSection, setActiveSection, mode } = useStore();
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random();
      const radius = Math.random() * GALAXY_RADIUS * t; 
      const branchAngle = (i % 3) * ((2 * Math.PI) / 3); 
      const spinAngle = radius * 0.8;
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 1.5;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 3;

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const y = ((Math.random() - 0.5) * radius) / 5 + randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const normalizedRadius = radius / GALAXY_RADIUS;
      const color = getGalaxyColor(normalizedRadius);

      if (Math.random() < 0.1) color.set('#ffffff');
      temp.push({ position: new THREE.Vector3(x, y, z), color });
    }
    return temp;
  }, []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    particles.forEach((particle, i) => {
      dummy.position.copy(particle.position);
      const scale = Math.random() * 0.12 + 0.02;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, particle.color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [particles]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = mode === 'intro' ? 0.05 : (mode === 'overview' ? 0.02 : 0);
      groupRef.current.rotation.y += delta * speed;
    }
    if (mode === 'detail' && activeSection !== null) {
      const time = state.clock.getElapsedTime();
      camera.position.y += Math.sin(time) * 0.005; 
    }
  });

  useEffect(() => {
    if (!controlsRef.current) return;

    if (mode === 'intro') {
      controlsRef.current.setLookAt(16, 6, 16, 0, 0, 0, true);
    } 
    else if (mode === 'overview') {
      controlsRef.current.setLookAt(0, 18, 10, 0, 0, 0, true);
    } 
    else if (mode === 'detail' && activeSection !== null) {
      const target = RESUME_DATA[activeSection];
      controlsRef.current.setLookAt(
        target.position[0], 
        target.position[1], 
        target.position[2] + 4, 
        target.position[0],     
        target.position[1],     
        target.position[2],     
        true                    
      );
    }
  }, [mode, activeSection]);

  return (
    <>
      <CameraControls 
        ref={controlsRef} 
        enabled={mode === 'overview'} 
        maxDistance={90} 
        minDistance={2} 
        dollySpeed={0.5} 
      />
      
      <Sparkles count={500} scale={40} size={4} speed={0.4} opacity={0.5} color="#0055ff" />
      <Sparkles count={400} scale={30} size={6} speed={0.6} opacity={0.6} color="#00ffff" />

      <group ref={groupRef}>
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
          <dodecahedronGeometry args={[0.2, 0]} />
          <meshBasicMaterial toneMapped={false} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
        </instancedMesh>

        {RESUME_DATA.map((node) => (
          <Marker 
            key={node.id} 
            node={node} 
            mode={mode}
            setActiveSection={setActiveSection}
          />
        ))}
        
        <pointLight position={[0,0,0]} intensity={2.5} color="#00ffff" distance={12} decay={2} />
        <pointLight position={[0,2,0]} intensity={1.5} color="#0055ff" distance={15} decay={2} />
      </group>
    </>
  );
};