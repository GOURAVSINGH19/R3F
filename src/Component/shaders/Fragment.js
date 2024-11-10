const Fragment = /*glsl*/ ` 
uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
varying vec3 vPosition;

void main() {
  // Calculate the distance from the camera
  float distance = length(vPosition);
  // Calculate fog factor based on distance
  float fogFactor = smoothstep(fogNear, fogFar, distance);
  // Set the final color with fog
  gl_FragColor = vec4(mix(fogColor, vec3(1.0), fogFactor), 1.0);
}
`;
export default Fragment;
