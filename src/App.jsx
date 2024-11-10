import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, .09, 5], fov: 30 }}
        resize={false}
        onScroll={() => {
          resize = false;
        }}
        gl={{ alpha: true }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 15, 15]} />
        <Suspense fallback="loding...">
          <Experience />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default App;
