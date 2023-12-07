import * as THREE from "./three.module.js";

export const createChromaMaterial = (texture, keyColor, tolerance = 0.2) => {
  const keyColorObject = new THREE.Color(keyColor);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      tex: {
        type: "t",
        value: texture
      },
      color: {
        type: "c",
        value: keyColorObject
      },
      tolerance: {
        type: "f",
        value: tolerance
      }
    },
    vertexShader:
      "varying mediump vec2 vUv;\n" +
      "void main(void)\n" +
      "{\n" +
      "vUv = uv;\n" +
      "mediump vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n" +
      "gl_Position = projectionMatrix * mvPosition;\n" +
      "}",
    fragmentShader:
      "uniform mediump sampler2D tex;\n" +
      "uniform mediump vec3 color;\n" +
      "uniform float tolerance;\n" +
      "varying mediump vec2 vUv;\n" +
      "void main(void)\n" +
      "{\n" +
      "  mediump vec3 tColor = texture2D( tex, vUv ).rgb;\n" +
      "  mediump float d = length(tColor - color);\n" +
      "  mediump float a = smoothstep(tolerance, tolerance + 0.1, d);\n" +
      "  gl_FragColor = vec4(tColor, a);\n" +
      "}",
    transparent: true
  });
  return material;
}
