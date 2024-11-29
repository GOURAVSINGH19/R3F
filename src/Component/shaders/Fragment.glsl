uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec2 uMouse;
uniform float uHover;
void main() {
 float blocks = 8.0;
 vec2 blockUv= floor(vUv * blocks)/blocks;
 float distance = length(blockUv - uMouse);
 float effect = smoothstep(.9,0.0,distance);
 vec2 distortion = vec2(.05)*effect;
 vec4 texColor = texture2D(uTexture, vUv + (distortion * uHover) );
 gl_FragColor = texColor; 
}

   