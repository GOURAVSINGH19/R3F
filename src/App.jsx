import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Experience from "./Experience";
import { OrbitControls } from "@react-three/drei";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [-20,15,40], fov: 80 }}
        gl={{ alpha: true }}
      > 
        <OrbitControls />
        <color attach="background" args={["#000000"]} />
        <Suspense>
          <Experience />
        </Suspense>
        {/* <Rig from={0} to={2.66} /> */}
      </Canvas>
    </div>
  );
};

export default App;

function Rig() {
  useFrame((state) => {
    state.camera.position.lerp(
      { x: 0, y: -state.pointer.y / 10, z: state.pointer.x / 20 },
      0.1
    );
    state.camera.lookAt(1, 0, 0);
  });
}
