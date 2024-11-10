const Vertex = /*glsl*/ ` 
varying vec3 vPosition;
void main() {
  vPosition = position; // Pass the vertex position to the fragment shader
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`;

export default Vertex;
