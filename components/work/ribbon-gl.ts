import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uHalf;
  uniform float uCurve;
  uniform float uWave;
  uniform float uVel;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;
  varying float vX;
  varying float vLift;
  void main() {
    vUv = uv;
    vec4 w = modelMatrix * vec4(position, 1.0);
    // The pointer presses a ripple into the strip.
    float d = distance(w.xy, uMouse);
    float lift = uHover * exp(-d * d / 52000.0);
    w.z += lift * (34.0 + 10.0 * sin(d * 0.035 - uTime * 4.0));
    vLift = lift;
    float nx = clamp(w.x / uHalf, -1.7, 1.7);
    // Edges curl toward the camera and the strip twists into a slow S; speed exaggerates both.
    w.z += (uCurve + abs(uVel) * 0.3) * nx * nx;
    w.y += (uWave + uVel * 0.15) * nx * nx * nx;
    vX = nx;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uSize;
  uniform float uRadius;
  uniform float uReady;
  uniform float uVel;
  varying vec2 vUv;
  varying float vX;
  varying float vLift;
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    vec2 q = abs(p) - (uSize * 0.5 - uRadius);
    float d = length(max(q, 0.0)) - uRadius;
    float alpha = 1.0 - smoothstep(-1.0, 0.5, d);
    // Speed pulls the colour channels apart.
    vec2 shift = vec2(uVel / uSize.x * 0.05, 0.0);
    vec3 tex = vec3(
      texture2D(uTex, vUv + shift).r,
      texture2D(uTex, vUv).g,
      texture2D(uTex, vUv - shift).b
    );
    float shade = 1.0 - 0.45 * smoothstep(0.35, 1.3, abs(vX));
    vec3 col = mix(vec3(0.1), tex, uReady) * shade * (1.0 + vLift * 0.12);
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

export interface RibbonOptions {
  canvas: HTMLCanvasElement;
  covers: string[];
  onActive: (index: number) => void;
}

export function createRibbon({ canvas, covers, onActive }: RibbonOptions) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 10, 10000);
  const group = new THREE.Group();
  scene.add(group);

  const loader = new THREE.TextureLoader();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const geometry = new THREE.PlaneGeometry(1, 1, 48, 1);

  const uniforms = {
    uHalf: { value: 1 },
    uCurve: { value: 0 },
    uWave: { value: 0 },
    uVel: { value: 0 },
    uMouse: { value: new THREE.Vector2(99999, 99999) },
    uHover: { value: 0 },
    uTime: { value: 0 },
  };
  let hoverTarget = 0;

  const meshes = covers.map((src) => {
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      uniforms: {
        ...uniforms,
        uTex: { value: null as THREE.Texture | null },
        uSize: { value: new THREE.Vector2(1, 1) },
        uRadius: { value: 14 },
        uReady: { value: 0 },
      },
    });
    loader.load(src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = maxAniso;
      mat.uniforms.uTex.value = tex;
      mat.uniforms.uReady.value = 1;
    });
    const mesh = new THREE.Mesh(geometry, mat);
    group.add(mesh);
    return mesh;
  });

  let cardW = 0;
  let step = 0;
  let target = 0;
  let current = 0;
  let active = -1;

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    // Re-read DPR on every resize: browser zoom changes it, and a stale ratio makes covers blurry.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = h / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    camera.updateProjectionMatrix();

    const mobile = w < 768;
    cardW = mobile ? w * 0.74 : Math.min(w * 0.42, h * 0.95, 820);
    const cardH = cardW * 0.625;
    step = cardW * 1.1;
    uniforms.uHalf.value = w / 2;
    uniforms.uCurve.value = w * (mobile ? 0.05 : 0.06);
    uniforms.uWave.value = h * 0.015;

    meshes.forEach((m, i) => {
      m.scale.set(cardW, cardH, 1);
      m.position.set(i * step, mobile ? h * 0.06 : h * 0.04, 0);
      (m.material as THREE.ShaderMaterial).uniforms.uSize.value.set(cardW, cardH);
    });
  }

  function setProgress(p: number) {
    target = p * (covers.length - 1) * step;
  }

  function pointer(clientX: number, clientY: number, inside: boolean) {
    const r = canvas.getBoundingClientRect();
    uniforms.uMouse.value.set(clientX - r.left - r.width / 2, r.height / 2 - (clientY - r.top));
    hoverTarget = inside ? 1 : 0;
  }

  function render() {
    uniforms.uTime.value = performance.now() / 1000;
    uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.08;
    const prev = current;
    current += (target - current) * 0.085;
    if (Math.abs(target - current) < 0.01) current = target;
    const vel = THREE.MathUtils.clamp((current - prev) / Math.max(step, 1), -0.25, 0.25);
    uniforms.uVel.value += (vel * step * 0.9 - uniforms.uVel.value) * 0.12;
    group.position.x = -current;

    const idx = Math.round(current / step);
    if (idx !== active) {
      active = idx;
      onActive(idx);
    }
    renderer.render(scene, camera);
  }

  function dispose() {
    meshes.forEach((m) => {
      const mat = m.material as THREE.ShaderMaterial;
      mat.uniforms.uTex.value?.dispose();
      mat.dispose();
    });
    geometry.dispose();
    renderer.dispose();
  }

  resize();
  return { resize, setProgress, render, dispose, pointer };
}
