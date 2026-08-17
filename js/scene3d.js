import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

(function () {
  var canvas = document.getElementById("bg3d");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(max-width: 700px)").matches) return;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 80);
  camera.position.z = 8;

  scene.add(new THREE.AmbientLight(0x7C4DFF, 0.55));
  var key = new THREE.PointLight(0x00E5FF, 1.5, 40);
  key.position.set(4, 3, 6);
  scene.add(key);
  var rim = new THREE.PointLight(0xFF2E9F, 0.85, 30);
  rim.position.set(-5, -2, 4);
  scene.add(rim);

  var group = new THREE.Group();
  scene.add(group);

  var wire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.15, 1),
    new THREE.MeshBasicMaterial({ color: 0x7C4DFF, wireframe: true, transparent: true, opacity: 0.4 })
  );
  group.add(wire);

  var core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 0),
    new THREE.MeshStandardMaterial({ color: 0x4A21C4, metalness: 0.55, roughness: 0.25, emissive: 0x00E5FF, emissiveIntensity: 0.35 })
  );
  group.add(core);

  var ring = new THREE.Mesh(
    new THREE.TorusGeometry(3.1, 0.035, 12, 90),
    new THREE.MeshBasicMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.55 })
  );
  ring.rotation.x = Math.PI / 2.6;
  group.add(ring);

  var count = 420;
  var positions = new Float32Array(count * 3);
  for (var i = 0; i < count; i++) {
    var r = 4.2 + Math.random() * 6;
    var t = Math.random() * Math.PI * 2;
    var p = (Math.random() - 0.5) * Math.PI;
    positions[i * 3] = r * Math.cos(t) * Math.cos(p);
    positions[i * 3 + 1] = r * Math.sin(p);
    positions[i * 3 + 2] = r * Math.sin(t) * Math.cos(p);
  }
  var pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  var points = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ color: 0x00E5FF, size: 0.035, transparent: true, opacity: 0.72 })
  );
  group.add(points);

  var mouse = { x: 0, y: 0 };
  window.addEventListener("pointermove", function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  });

  var t = 0;
  var running = true;
  document.addEventListener("visibilitychange", function () {
    running = document.visibilityState === "visible";
  });

  function tick() {
    requestAnimationFrame(tick);
    if (!running) return;
    t += 0.008;
    group.rotation.y = t * 0.35 + mouse.x * 0.35;
    group.rotation.x = 0.18 + mouse.y * 0.2;
    ring.rotation.z = t * 0.4;
    core.rotation.y = -t * 0.5;
    renderer.render(scene, camera);
  }
  tick();
})();
