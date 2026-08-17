import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { RoundedBoxGeometry } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/RoundedBoxGeometry.js";

(function () {
  var canvas = document.getElementById("phone3d");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var wrap = canvas.parentElement;
  var fallback = document.getElementById("phoneFallback");
  var reducedQuality = window.matchMedia("(max-width: 900px)").matches;

  function measure() {
    var w = Math.max(wrap.clientWidth, 280);
    var h = Math.max(wrap.clientHeight, 420);
    return { w: w, h: h };
  }

  var size = measure();
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: !reducedQuality, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, reducedQuality ? 1.25 : 2));
  renderer.setSize(size.w, size.h, false);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = !reducedQuality;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, size.w / size.h, 0.1, 40);
  camera.position.set(0, 0.15, 7.2);

  scene.add(new THREE.HemisphereLight(0xb9aede, 0x120e1f, 0.85));
  var key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(3.2, 4.4, 5);
  key.castShadow = !reducedQuality;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  var cyan = new THREE.PointLight(0x00e5ff, 18, 12);
  cyan.position.set(-2.4, 1.2, 3.2);
  scene.add(cyan);
  var magenta = new THREE.PointLight(0xff2e9f, 10, 10);
  magenta.position.set(2.8, -1.4, 2.4);
  scene.add(magenta);
  var fill = new THREE.PointLight(0x7c4dff, 8, 10);
  fill.position.set(0, 2.6, -2);
  scene.add(fill);

  var stage = new THREE.Group();
  scene.add(stage);

  function loadTexture(path) {
    return new Promise(function (resolve, reject) {
      var loader = new THREE.TextureLoader();
      loader.load(path, function (tex) {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        resolve(tex);
      }, undefined, reject);
    });
  }

  var imgBase = new URL("../images/", import.meta.url).href;

  Promise.all([
    loadTexture(imgBase + "hero-app.png"),
    loadTexture(imgBase + "feat-bulk.png"),
    loadTexture(imgBase + "feat-widget.png")
  ]).then(function (textures) {
    if (fallback) fallback.style.opacity = "0";

    var phone = new THREE.Group();
    var bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0x161022,
      metalness: 0.85,
      roughness: 0.28,
      clearcoat: 0.9,
      clearcoatRoughness: 0.18
    });
    var body = new THREE.Mesh(new RoundedBoxGeometry(1.62, 3.34, 0.16, 8, 0.16), bodyMat);
    body.castShadow = true;
    phone.add(body);

    var bezel = new THREE.Mesh(
      new RoundedBoxGeometry(1.5, 3.22, 0.02, 6, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x050508, metalness: 0.4, roughness: 0.45 })
    );
    bezel.position.z = 0.09;
    phone.add(bezel);

    var screen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.38, 2.98),
      new THREE.MeshBasicMaterial({ map: textures[0] })
    );
    screen.position.z = 0.105;
    phone.add(screen);

    var island = new THREE.Mesh(
      new RoundedBoxGeometry(0.42, 0.12, 0.03, 4, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0a0a10, metalness: 0.7, roughness: 0.3 })
    );
    island.position.set(0, 1.38, 0.12);
    phone.add(island);

    var btn = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.38, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x2a2150, metalness: 0.8, roughness: 0.25 })
    );
    btn.position.set(-0.84, 0.55, 0);
    phone.add(btn);
    phone.position.y = 0.12;
    stage.add(phone);

    function satellite(map, x, y, z, rotY) {
      var g = new THREE.Group();
      var frame = new THREE.Mesh(
        new RoundedBoxGeometry(1.05, 2.15, 0.08, 4, 0.1),
        new THREE.MeshPhysicalMaterial({ color: 0x1a1430, metalness: 0.6, roughness: 0.35, transparent: true, opacity: 0.95 })
      );
      var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(0.92, 1.98),
        new THREE.MeshBasicMaterial({ map: map })
      );
      plane.position.z = 0.05;
      g.add(frame);
      g.add(plane);
      g.position.set(x, y, z);
      g.rotation.y = rotY;
      g.castShadow = true;
      stage.add(g);
      return g;
    }

    var leftCard = reducedQuality ? null : satellite(textures[1], -2.55, 0.35, -0.8, 0.55);
    var rightCard = reducedQuality ? null : satellite(textures[2], 2.55, -0.15, -0.7, -0.55);

    var mouse = { x: 0, y: 0 };
    wrap.addEventListener("pointermove", function (event) {
      var box = wrap.getBoundingClientRect();
      mouse.x = ((event.clientX - box.left) / box.width) * 2 - 1;
      mouse.y = ((event.clientY - box.top) / box.height) * 2 - 1;
    }, { passive: true });

    function onResize() {
      size = measure();
      camera.aspect = size.w / size.h;
      camera.updateProjectionMatrix();
      renderer.setSize(size.w, size.h, false);
    }
    window.addEventListener("resize", onResize);

    var t = 0;
    var running = true;
    document.addEventListener("visibilitychange", function () {
      running = document.visibilityState === "visible";
    });

    function tick() {
      requestAnimationFrame(tick);
      if (!running) return;
      t += 0.012;
      var floatY = Math.sin(t * 0.9) * 0.08;
      phone.position.y = 0.12 + floatY;
      phone.rotation.y += ((mouse.x * 0.45) - phone.rotation.y) * 0.06;
      phone.rotation.x += ((-mouse.y * 0.18) - phone.rotation.x) * 0.06;
      if (leftCard) {
        leftCard.position.y = 0.35 + Math.sin(t * 0.8 + 1) * 0.12;
        leftCard.rotation.z = Math.sin(t * 0.5) * 0.04;
      }
      if (rightCard) {
        rightCard.position.y = -0.15 + Math.cos(t * 0.7) * 0.12;
        rightCard.rotation.z = Math.cos(t * 0.45) * 0.04;
      }
      renderer.render(scene, camera);
    }
    tick();
  }).catch(function () {
    if (fallback) fallback.style.opacity = "1";
  });
})();
