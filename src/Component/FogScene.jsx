import React, { useRef, useState } from "react";
import FragmentFog from "./shaders/FragmentFog.glsl";
import VertexFog from "./shaders/VertexFog.glsl";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const FogScene = () => {
  const meshRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state) => {
    setTime(state.clock.getElapsedTime());
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = time;
    }
  });

  return (
    <>
      <mesh ref={meshRef} rotation={[-Math.PI / 2 ,0  , 0]}>
        <planeGeometry args={[100, 100]} />
        <shaderMaterial
          uniforms={{
            fogColor: { value: new THREE.Color("red") },
            fogNear: { value: 1.0 }, 
            fogFar: { value: 1.0 },
            time: { value: 0 },
          }}
          side={THREE.DoubleSide}
          vertexShader={VertexFog}
          fragmentShader={FragmentFog}
        />
      </mesh>
    </>
  );
};

export default FogScene;
