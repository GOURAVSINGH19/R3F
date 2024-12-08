import React, { useEffect, useRef, useState } from "react";
import {
  Environment,
  MeshReflectorMaterial,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import color from "/photo-1.avif";
import color2 from "/photo-2.avif";
import color3 from "/photo-3.avif";
import color4 from "/photo-4.avif";

// import Floor1 from "/floor-img/blue-noise.png";
import Floor1 from "/n-img/nx.webp"
import Floor2 from "/floor-img/floor-normal.webp";
import Floor3 from "/floor-img/perlin-1.webp";
import Floor4 from "/floor-img/perlin-2.webp";



import fragmentShader from "./Component/shaders/Fragment.glsl";
import vertexShader from "./Component/shaders/Vertex.glsl";
import Water from "./Component/Water";
gsap.registerPlugin(ScrollTrigger);
const Experience = () => {
  const camera = new THREE.PerspectiveCamera();
  const raycaster = new THREE.Raycaster();
  const groupRef = useRef();
  const orbitRadius = 8.5;
  const [numberOfPlanes] = useState(4);
  const scrollCount = useRef(0);
  const lastWheel = useRef(0);
  const throttleDelay = 2000;

  const textures = useTexture([color, color2, color3, color4]);
  textures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  });

  const floorTextures = useTexture([Floor1, Floor2, Floor3, Floor4]);
  floorTextures.forEach((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  });

  // useEffect(() => {
  //   let timeoutId;
  //   const handleWheel = () => {
  //     const currentTime = Date.now();
  //     if (currentTime - lastWheel.current >= throttleDelay) {
  //       lastWheel.current = currentTime;

  //       clearTimeout(timeoutId);
  //       timeoutId = setTimeout(() => {
  //         scrollCount.current = (scrollCount.current + 1) % 4;

  //         gsap.to(groupRef.current.rotation, {
  //           y: `+=${Math.PI / 2}`,
  //           duration: 1,
  //           ease: "expo.easeInOut",
  //         });

  //       }, 2000);
  //     }
  //   };

  //   // const isMobile =
  //   //   /Mobi|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Android/i.test(
  //   //     navigator.userAgent
  //   //   );

  //   // if (!isMobile) {
  //   //   const handleMouseMove = (e) => {
  //   //     const mouse = new THREE.Vector2(
  //   //       (e.clientX / window.innerWidth) * 2 - 1,
  //   //       -(e.clientY / window.innerHeight) * 2 + 1
  //   //     );

  //   //     raycaster.setFromCamera(mouse, camera);

  //   //     const intersects = raycaster.intersectObjects(
  //   //       groupRef.current.children
  //   //     );

  //   //     groupRef.current.children.forEach((plane) => {
  //   //       gsap.to(plane.material.uniforms.uHover, { value: 0, duration: 0.3 });
  //   //     });

  //   //     // if (intersects.length > 0) {
  //   //     //   const intersectedPlane = intersects[0];
  //   //     //   const uv = intersectedPlane.uv;

  //   //     //   // gsap.to(intersectedPlane.object.material.uniforms.uMouse.value, {
  //   //     //   //   x: uv.x,
  //   //     //   //   y: uv.y,
  //   //     //   //   duration: 0.5,
  //   //     //   // });

  //   //     //   // gsap.to(intersectedPlane.object.material.uniforms.uHover, {
  //   //     //   //   value: 1,
  //   //     //   //   duration: 0.5,
  //   //     //   // });
  //   //     // }
  //   //   };

  //   // }

  //   window.addEventListener("wheel", handleWheel, { passive: true });

  //   // if (isMobile) {
  //   //   ScrollTrigger.create({
  //   //     trigger: document.body,
  //   //     start: "top top",
  //   //     end: "bottom bottom",
  //   //     scrub: true,
  //   //     onUpdate: (self) => {
  //   //       const scrollY = self.progress() * Math.PI * 2;
  //   //       gsap.to(groupRef.current.rotation, {
  //   //         y: scrollY,
  //   //         duration: 0.5,
  //   //         ease: "power2.inOut",
  //   //       });
  //   //     },
  //   //   });
  //   // }

  //   const handleResize = () => {
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //   };
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //     window.removeEventListener("resize", handleResize);
  //     clearTimeout(timeoutId);
  //   };
  // }, []);

 
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={4} />
      {/* <group ref={groupRef}>
        {Array.from({ length: numberOfPlanes }).map((_, i) => {
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
              scale={0.9}
            >
              <planeGeometry args={[6, 4]} />
              <shaderMaterial
                roughness={0.5}
                metalness={0.2}
                side={THREE.DoubleSide}
                uniforms={{
                  uFrequency: { value: new THREE.Vector2(10, 5) },
                  uTime: { value:  new THREE.Clock().getDelta() },
                  uColor: { value: new THREE.Color("orange") },
                  uTexture: { value: textures[i] },
                }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
              />
            </mesh>
          );
        })}
      </group> */}
      {/* <mesh position-y={-0.88} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          map={floorTextures[3]}
          blur={[10, 10]}
          resolution={2048}
          mixBlur={.5}
          mixStrength={10}
          roughness={1}
          depthScale={2}
          opacity={0.6}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          metalness={0.5}
          side={THREE.DoubleSide}
          envMapIntensity={.3}
        />
      </mesh> */}
      <Water/>
    </>
  );
};

export default Experience;


