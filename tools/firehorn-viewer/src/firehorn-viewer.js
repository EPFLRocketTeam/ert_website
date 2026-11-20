// firehorn-viewer.js — small three.js viewer for the Firehorn II model on the
// "Our projects" block. Built into one file (static/js/firehorn-viewer.min.js)
// with esbuild; see the README next to the source.
//
// The rocket is shown like the existing picture (diagonal, nose up-right) and
// slowly spins around its own long axis. Dragging spins it by hand. Rendering
// only runs while the block is on screen, the tab is visible and the model is
// the active project; with prefers-reduced-motion it doesn't spin on its own.

import {
  NeutralToneMapping,
  Box3,
  DirectionalLight,
  Group,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function mount(container, opts = {}) {
  const {
    src,
    dracoPath,
    tilt = -1.02, // radians around the view axis: nose up-right like the photo
    lean = 0.18, // radians: nose slightly away from the viewer
    spinSpeed = 0.35, // radians per second
    onReady = () => {},
    onError = () => {},
  } = opts;

  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  } catch (err) {
    onError(err);
    return null;
  }
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping; // keeps the ERT red red (ACES pushes it to orange)
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.touchAction = 'pan-y'; // vertical swipes still scroll the page
  renderer.domElement.style.cursor = 'grab';
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const key = new DirectionalLight(0xffffff, 1.4);
  key.position.set(3, 5, 6);
  scene.add(key);

  const camera = new PerspectiveCamera(28, 1, 0.1, 100);
  const tiltGroup = new Group(); // fixed pose (diagonal)
  const spinGroup = new Group(); // spins around the rocket's long axis (Y)
  tiltGroup.rotation.set(lean, 0, tilt);
  tiltGroup.add(spinGroup);
  scene.add(tiltGroup);

  let ready = false;
  let active = true;
  let onScreen = true;
  let raf = 0;
  let last = 0;
  let spin = 0.6; // start angle: livery facing the viewer
  let velocity = 0; // from dragging

  function fitCamera() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    camera.aspect = w / h;
    // fit the tilted model's screen-space box (with margin) into the view
    const box = new Box3().setFromObject(tiltGroup, true); // precise: from the vertices
    const size = box.getSize(new Vector3());
    const vFov = (camera.fov * Math.PI) / 180;
    const distH = (size.y * 1.06) / 2 / Math.tan(vFov / 2);
    const distW = (size.x * 1.06) / 2 / Math.tan(vFov / 2) / camera.aspect;
    const dist = Math.max(distH, distW);
    camera.position.set(0, 0, dist + size.z * 0.25);
    camera.near = dist / 20;
    camera.far = dist * 4;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    if (ready) fitCamera();
    renderOnce();
  }

  function renderOnce() {
    if (!ready) return;
    spinGroup.rotation.y = spin;
    renderer.render(scene, camera);
  }

  function shouldAnimate() {
    return ready && active && onScreen && !document.hidden;
  }

  function frame(t) {
    raf = 0;
    if (!shouldAnimate()) return;
    const dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
    last = t;
    if (!dragging) {
      if (!reducedMotion) spin += spinSpeed * dt;
      spin += velocity * dt;
      velocity *= Math.pow(0.04, dt); // inertia after a drag
    }
    renderOnce();
    if (!reducedMotion || dragging || Math.abs(velocity) > 0.01) raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (!raf && shouldAnimate()) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  }

  // drag to spin
  let dragging = false;
  let lastX = 0;
  let lastT = 0;
  const el = renderer.domElement;
  el.addEventListener('pointerdown', (e) => {
    dragging = true;
    lastX = e.clientX;
    lastT = performance.now();
    velocity = 0;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = 'grabbing';
    kick();
  });
  el.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    const delta = (dx / Math.max(container.clientWidth, 1)) * Math.PI * 2;
    spin += delta;
    velocity = delta / Math.max((now - lastT) / 1000, 0.016);
    lastX = e.clientX;
    lastT = now;
    renderOnce();
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    el.style.cursor = 'grab';
    velocity = Math.max(-8, Math.min(8, velocity));
    kick();
  };
  el.addEventListener('pointerup', endDrag);
  el.addEventListener('pointercancel', endDrag);

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  const io = new IntersectionObserver((entries) => {
    onScreen = entries[0].isIntersecting;
    kick();
  });
  io.observe(container);
  document.addEventListener('visibilitychange', kick);

  const draco = new DRACOLoader();
  draco.setDecoderPath(dracoPath);
  draco.setDecoderConfig({ type: 'wasm' });
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);
  loader.load(
    src,
    (gltf) => {
      const model = gltf.scene;
      // center the model on its own bounding box, long axis = Y
      const box = new Box3().setFromObject(model);
      model.position.sub(box.getCenter(new Vector3()));
      spinGroup.add(model);
      ready = true;
      draco.dispose();
      resize();
      fitCamera();
      renderOnce();
      kick();
      onReady();
    },
    undefined,
    (err) => {
      draco.dispose();
      onError(err);
    }
  );

  return {
    setActive(value) {
      active = !!value;
      kick();
    },
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', kick);
      renderer.dispose();
      el.remove();
    },
  };
}

window.ERTFirehornViewer = { mount };
