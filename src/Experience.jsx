import React, { useEffect, useRef } from "react";
import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import vertexShader from "./Component/shaders/Vertex.js";
import fragmentShader from "./Component/shaders/Fragment.js";
import gsap from "gsap";
import color from "/photo-1.avif";
import color2 from "/photo-2.avif";
import color3 from "/photo-3.avif";
import color4 from "/photo-4.avif";

// Experience component
const Experience = () => {
  const groupRef = useRef();
  const orbitRadius = 8.5;
  const numberOfPlanes = 4;
  const scrollCount = useRef(0);
  const lastWheel = useRef(0);
  const throttleDelay = 2000;

  const textures = useTexture([color, color2, color3, color4]);
  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  });

  useEffect(() => {
    let timeoutId;
    const handleWheel = (event) => {
      const currentTime = Date.now();
      if (currentTime - lastWheel.current >= throttleDelay) {
        lastWheel.current = currentTime;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          scrollCount.current = (scrollCount.current + 1) % 4;

          // const heading = document.querySelectorAll(".heading");
          // gsap.to(heading, {
          //   y: `-=${100}%`,
          //   duration: 1,
          //   ease: "power2.inOut",
          // });

          gsap.to(groupRef.current.rotation, {
            y: `+=${Math.PI / 2}`,
            duration: 1,
            ease: "expo.easeInOut",
          });

          // if (scrollCount.current === 0) {
          //   gsap.to(heading, {
          //     duration: 1,
          //     y: `0`,
          //     ease: "power2.inOut",
          //   });
          // }
        }, 2000);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <group ref={groupRef}>
        {[...Array(numberOfPlanes)].map((_, i) => {
          const angle = (i / numberOfPlanes) * (Math.PI * 2);
          return (
            <mesh
              key={i}
              position={[
                orbitRadius * Math.sin(angle),
                1,
                orbitRadius * Math.cos(angle),
              ]}
              rotation={[0, -angle, 0]}
              castShadow
              receiveShadow
              scale={.9}
            >
              <planeGeometry args={[6, 4]} />
              <meshStandardMaterial
                map={textures[i]}
                roughness={0.5}
                metalness={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
      <mesh position-y={-0.88} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={5}
          opacity={0.6}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Experience;
