import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type CeremonyMood =
  | 'haldi'
  | 'mehendi'
  | 'sangeet'
  | 'pheras'
  | 'vidaai'
  | 'reception'
  | 'blessing';

interface MandapThreeCanvasProps {
  mood: CeremonyMood;
  className?: string;
}

const MOOD_PALETTE: Record<
  CeremonyMood,
  { bg: number; keyColor: number; accent: number }
> = {
  haldi: { bg: 0xfffaf0, keyColor: 0xffe8a3, accent: 0xe8a317 },
  mehendi: { bg: 0xf7fbf5, keyColor: 0xfff2d6, accent: 0x3e7b3a },
  sangeet: { bg: 0xfcf6fa, keyColor: 0xffe1c8, accent: 0x7b2d5b },
  pheras: { bg: 0xfffdf9, keyColor: 0xffe8c2, accent: 0xd9482b },
  vidaai: { bg: 0xfff8f6, keyColor: 0xffe9cf, accent: 0xb5767c },
  reception: { bg: 0xfffcf7, keyColor: 0xffebc7, accent: 0xc9a35b },
  blessing: { bg: 0xffffff, keyColor: 0xffe7bd, accent: 0xc9a35b },
};

// Module-scope reusable scratch objects (zero GC in render loop)
const _dummy = new THREE.Object3D();
const _targetBg = new THREE.Color();
const _currentBg = new THREE.Color(0xfffdf9);
const _targetKey = new THREE.Color();

function createStoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ddd2c2';
    ctx.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 650; i++) {
      const x = (i * 53) % 128;
      const y = (i * 97) % 128;
      const v = 190 + ((i * 29) % 45);
      ctx.fillStyle = `rgb(${v},${v - 8},${v - 16})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
    grad.addColorStop(0, 'rgba(62, 18, 48, 0.36)');
    grad.addColorStop(0.6, 'rgba(62, 18, 48, 0.14)');
    grad.addColorStop(1, 'rgba(62, 18, 48, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

export const MandapThreeCanvas: React.FC<MandapThreeCanvasProps> = ({
  mood,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const moodRef = useRef<CeremonyMood>(mood);

  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const probe = document.createElement('canvas').getContext('webgl2');
        if (!probe) return true;
        const ext = probe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
        const gpu = String(probe.getParameter(param));
        probe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    _currentBg.setHex(MOOD_PALETTE[moodRef.current].bg);
    scene.background = _currentBg;
    scene.fog = new THREE.FogExp2(_currentBg.getHex(), 0.032);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 60);
    camera.position.set(0, 2.35, 7.6);
    camera.lookAt(0, 1.45, 0);

    // 3-point warm/cool studio lighting
    const hemiLight = new THREE.HemisphereLight(0xfff1e0, 0x6b2f4b, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffdfb3, 1.85);
    keyLight.position.set(4.5, 7.5, 5.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf6cbd4, 0.75);
    rimLight.position.set(-4, 4, -4);
    scene.add(rimLight);

    // Shared procedural textures & materials
    const stoneTex = createStoneTexture();
    stoneTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const shadowTex = createContactShadowTexture();

    const sandstoneMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: stoneTex,
      roughness: 0.84,
      metalness: 0.04,
    });
    const teakWoodMat = new THREE.MeshStandardMaterial({
      color: 0x5c2633,
      roughness: 0.58,
      metalness: 0.08,
    });
    const antiqueGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0xc9a35b,
      roughness: 0.24,
      metalness: 0.88,
      clearcoat: 0.4,
    });
    const silkDrapeMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9482b,
      roughness: 0.65,
      metalness: 0.02,
      sheen: 0.8,
      sheenColor: new THREE.Color(0xf6ebdd),
      side: THREE.DoubleSide,
    });
    const marigoldMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.72,
      metalness: 0.0,
    });
    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffc145,
    });

    const disposables: Array<{ dispose: () => void }> = [
      stoneTex,
      shadowTex,
      envTexture,
      sandstoneMat,
      teakWoodMat,
      antiqueGoldMat,
      silkDrapeMat,
      marigoldMat,
      flameMat,
    ];

    // Composite Mandap Pavilion Group (bottom-center pivot at y = 0)
    const mandapGroup = new THREE.Group();
    scene.add(mandapGroup);

    // Ground contact shadow
    const shadowGeo = new THREE.PlaneGeometry(7.2, 7.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    });
    disposables.push(shadowGeo, shadowMat);
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = 0.015;
    mandapGroup.add(shadowDisc);

    // Stepped octagonal base plinth
    const plinthLowerGeo = new THREE.CylinderGeometry(2.35, 2.5, 0.16, 8);
    const plinthUpperGeo = new THREE.CylinderGeometry(2.05, 2.15, 0.14, 8);
    const plinthTrimGeo = new THREE.TorusGeometry(2.08, 0.03, 10, 32);
    disposables.push(plinthLowerGeo, plinthUpperGeo, plinthTrimGeo);

    const plinthLower = new THREE.Mesh(plinthLowerGeo, sandstoneMat);
    plinthLower.position.y = 0.08;
    plinthLower.receiveShadow = true;
    mandapGroup.add(plinthLower);

    const plinthUpper = new THREE.Mesh(plinthUpperGeo, sandstoneMat);
    plinthUpper.position.y = 0.23;
    plinthUpper.receiveShadow = true;
    mandapGroup.add(plinthUpper);

    const plinthTrim = new THREE.Mesh(plinthTrimGeo, antiqueGoldMat);
    plinthTrim.rotation.x = Math.PI / 2;
    plinthTrim.position.y = 0.31;
    mandapGroup.add(plinthTrim);

    // Turned-lathe Mandap Pillar profile (10 points)
    const pillarPoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.18, 0.0),
      new THREE.Vector2(0.16, 0.18),
      new THREE.Vector2(0.10, 0.26),
      new THREE.Vector2(0.085, 1.1),
      new THREE.Vector2(0.12, 1.3),
      new THREE.Vector2(0.08, 1.5),
      new THREE.Vector2(0.085, 2.25),
      new THREE.Vector2(0.17, 2.45),
      new THREE.Vector2(0.0, 2.48),
    ];
    const pillarGeo = new THREE.LatheGeometry(pillarPoints, 20);
    const collarGeo = new THREE.TorusGeometry(0.105, 0.022, 8, 20);
    disposables.push(pillarGeo, collarGeo);

    const pillarCoords: [number, number][] = [
      [-1.32, -1.05],
      [1.32, -1.05],
      [-1.32, 1.05],
      [1.32, 1.05],
    ];
    pillarCoords.forEach(([px, pz]) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(px, 0.3, pz);

      const shaft = new THREE.Mesh(pillarGeo, teakWoodMat);
      shaft.castShadow = !isSoftwareGl;
      pGroup.add(shaft);

      const midRing = new THREE.Mesh(collarGeo, antiqueGoldMat);
      midRing.rotation.x = Math.PI / 2;
      midRing.position.y = 1.3;
      pGroup.add(midRing);

      const topRing = new THREE.Mesh(collarGeo, antiqueGoldMat);
      topRing.rotation.x = Math.PI / 2;
      topRing.position.y = 2.35;
      pGroup.add(topRing);

      mandapGroup.add(pGroup);
    });

    // Arched Mughal Torana Beam (ExtrudeGeometry with bevel)
    const archShape = new THREE.Shape();
    archShape.moveTo(-1.42, 0);
    archShape.lineTo(-1.42, 0.42);
    archShape.lineTo(1.42, 0.42);
    archShape.lineTo(1.42, 0);
    archShape.quadraticCurveTo(0.85, 0.34, 0.42, 0.22);
    archShape.quadraticCurveTo(0.15, 0.38, 0, 0.42);
    archShape.quadraticCurveTo(-0.15, 0.38, -0.42, 0.22);
    archShape.quadraticCurveTo(-0.85, 0.34, -1.42, 0);

    const archGeo = new THREE.ExtrudeGeometry(archShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.02,
      bevelSegments: 2,
    });
    archGeo.center();
    disposables.push(archGeo);

    const frontArch = new THREE.Mesh(archGeo, antiqueGoldMat);
    frontArch.position.set(0, 2.75, 1.05);
    mandapGroup.add(frontArch);

    const backArch = new THREE.Mesh(archGeo, antiqueGoldMat);
    backArch.position.set(0, 2.75, -1.05);
    mandapGroup.add(backArch);

    // Canopy Roof + Lotus Finial
    const roofGeo = new THREE.ConeGeometry(2.05, 0.72, 4, 1, false);
    const finialGeo = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.14, 0.06),
        new THREE.Vector2(0.06, 0.22),
        new THREE.Vector2(0.1, 0.34),
        new THREE.Vector2(0, 0.52),
      ],
      16,
    );
    disposables.push(roofGeo, finialGeo);

    const canopy = new THREE.Mesh(roofGeo, silkDrapeMat);
    canopy.rotation.y = Math.PI / 4;
    canopy.position.y = 3.22;
    mandapGroup.add(canopy);

    const finial = new THREE.Mesh(finialGeo, antiqueGoldMat);
    finial.position.y = 3.55;
    mandapGroup.add(finial);

    // Central Havan Kund (sacred fire vessel)
    const kundGeo = new THREE.CylinderGeometry(0.36, 0.22, 0.24, 4);
    const emberGeo = new THREE.SphereGeometry(0.16, 12, 10);
    const emberMat = new THREE.MeshStandardMaterial({
      color: 0xff6a2b,
      emissive: 0xff4500,
      emissiveIntensity: 1.5,
      roughness: 0.4,
    });
    disposables.push(kundGeo, emberGeo, emberMat);

    const kund = new THREE.Mesh(kundGeo, antiqueGoldMat);
    kund.rotation.y = Math.PI / 4;
    kund.position.y = 0.42;
    mandapGroup.add(kund);

    const ember = new THREE.Mesh(emberGeo, emberMat);
    ember.scale.set(1, 0.55, 1);
    ember.position.y = 0.52;
    mandapGroup.add(ember);

    // Swaying Marigold Garland InstancedMesh (48 blossoms across 2 catenaries)
    const blossomGeo = new THREE.IcosahedronGeometry(0.072, 1);
    disposables.push(blossomGeo);
    const garlandCount = 48;
    const garlandInstanced = new THREE.InstancedMesh(
      blossomGeo,
      marigoldMat,
      garlandCount,
    );
    garlandInstanced.frustumCulled = false;
    const marigoldTints = [
      new THREE.Color(0xe8a317),
      new THREE.Color(0xf59e0b),
      new THREE.Color(0xd9482b),
    ];
    for (let i = 0; i < garlandCount; i++) {
      garlandInstanced.setColorAt(i, marigoldTints[i % marigoldTints.length]);
    }
    if (garlandInstanced.instanceColor) {
      garlandInstanced.instanceColor.needsUpdate = true;
    }
    mandapGroup.add(garlandInstanced);

    // Floating Brass Diyas (6 surrounding composite diyas)
    const diyaBowlGeo = new THREE.LatheGeometry(
      [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.11, 0.01),
        new THREE.Vector2(0.15, 0.08),
        new THREE.Vector2(0.12, 0.09),
        new THREE.Vector2(0, 0.05),
      ],
      16,
    );
    const flameGeo = new THREE.ConeGeometry(0.036, 0.11, 10);
    disposables.push(diyaBowlGeo, flameGeo);

    interface DiyaItem {
      group: THREE.Group;
      flame: THREE.Mesh;
      baseAngle: number;
      radius: number;
      baseY: number;
      phase: number;
    }
    const diyas: DiyaItem[] = [];
    for (let i = 0; i < 6; i++) {
      const dg = new THREE.Group();
      const bowl = new THREE.Mesh(diyaBowlGeo, antiqueGoldMat);
      dg.add(bowl);

      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = 0.12;
      dg.add(flame);

      const angle = (i / 6) * Math.PI * 2;
      const radius = 2.65 + (i % 2) * 0.45;
      const baseY = 0.72 + (i % 3) * 0.42;
      dg.position.set(Math.cos(angle) * radius, baseY, Math.sin(angle) * radius);
      scene.add(dg);
      diyas.push({ group: dg, flame, baseAngle: angle, radius, baseY, phase: i * 1.1 });
    }

    // Drifting Marigold & Rose Petals (InstancedMesh, 42 petals)
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, -0.05);
    petalShape.quadraticCurveTo(0.045, 0, 0, 0.055);
    petalShape.quadraticCurveTo(-0.045, 0, 0, -0.05);
    const petalGeo = new THREE.ShapeGeometry(petalShape);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.75,
      side: THREE.DoubleSide,
    });
    disposables.push(petalGeo, petalMat);

    const petalCount = 42;
    const petalInstanced = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    petalInstanced.frustumCulled = false;
    const petalSeeds = Array.from({ length: petalCount }).map((_, i) => ({
      x: ((i * 73) % 100) / 14 - 3.5,
      y: ((i * 41) % 100) / 22 + 0.5,
      z: ((i * 31) % 100) / 25 - 2.0,
      speed: 0.25 + (i % 5) * 0.06,
      sway: 0.35 + (i % 3) * 0.2,
      phase: i * 0.7,
    }));
    const petalPalette = [
      new THREE.Color(0xe8a317),
      new THREE.Color(0xd9482b),
      new THREE.Color(0xb5767c),
    ];
    for (let i = 0; i < petalCount; i++) {
      petalInstanced.setColorAt(i, petalPalette[i % petalPalette.length]);
    }
    if (petalInstanced.instanceColor) {
      petalInstanced.instanceColor.needsUpdate = true;
    }
    scene.add(petalInstanced);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();
    let elapsed = 0;

    function updateScene(dt: number) {
      elapsed += dt;
      const targetSpec = MOOD_PALETTE[moodRef.current];
      _targetBg.setHex(targetSpec.bg);
      _targetKey.setHex(targetSpec.keyColor);

      const dampAlpha = 1 - Math.exp(-3.2 * Math.min(dt, 0.1));
      _currentBg.lerp(_targetBg, dampAlpha);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(_currentBg);
      }
      keyLight.color.lerp(_targetKey, dampAlpha);

      // Gentle pavilion breathing rotation
      mandapGroup.rotation.y = Math.sin(elapsed * 0.22) * 0.14;

      // Swaying marigold garlands along front/back catenaries
      for (let i = 0; i < garlandCount; i++) {
        const strand = i < 24 ? 0 : 1;
        const idxInStrand = i % 24;
        const t = idxInStrand / 23;
        const x = THREE.MathUtils.lerp(-1.26, 1.26, t);
        const sag = Math.sin(t * Math.PI) * 0.42;
        const swayZ = Math.sin(elapsed * 1.4 + t * 3.0 + strand) * 0.05;
        const y = 2.66 - sag;
        const z = (strand === 0 ? 1.05 : -1.05) + swayZ;
        _dummy.position.set(x, y, z);
        _dummy.rotation.set(0, elapsed * 0.4 + i, 0);
        const s = 0.85 + Math.sin(t * Math.PI) * 0.25;
        _dummy.scale.setScalar(s);
        _dummy.updateMatrix();
        garlandInstanced.setMatrixAt(i, _dummy.matrix);
      }
      garlandInstanced.instanceMatrix.needsUpdate = true;

      // Floating diyas & flickering flames
      for (let i = 0; i < diyas.length; i++) {
        const d = diyas[i];
        const a = d.baseAngle + elapsed * 0.12;
        d.group.position.set(
          Math.cos(a) * d.radius,
          d.baseY + Math.sin(elapsed * 1.2 + d.phase) * 0.12,
          Math.sin(a) * d.radius,
        );
        const flicker = 0.92 + Math.sin(elapsed * 11 + d.phase) * 0.16;
        d.flame.scale.set(1, flicker, 1);
      }

      // Drifting petals
      for (let i = 0; i < petalCount; i++) {
        const p = petalSeeds[i];
        const py = ((p.y - elapsed * p.speed) % 4.5 + 4.5) % 4.5 + 0.15;
        const px = p.x + Math.sin(elapsed * 0.9 + p.phase) * p.sway;
        _dummy.position.set(px, py, p.z);
        _dummy.rotation.set(
          elapsed * 1.1 + p.phase,
          elapsed * 0.7 + p.phase,
          Math.sin(elapsed + p.phase) * 0.8,
        );
        _dummy.scale.setScalar(1.0);
        _dummy.updateMatrix();
        petalInstanced.setMatrixAt(i, _dummy.matrix);
      }
      petalInstanced.instanceMatrix.needsUpdate = true;
    }

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      if (!sync) {
        frameId = window.setTimeout(cb, 85);
        return;
      }
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const status = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (status === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 6);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 85);
        }
      };
      frameId = window.setTimeout(poll, 6);
    }

    function tick() {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      updateScene(dt);
      renderer.render(scene, camera);

      if (prefersReducedMotion) return;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    updateScene(0.016);
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }
    tick();

    const handleResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (prefersReducedMotion) renderer.render(scene, camera);
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
    };
    const handleContextRestored = () => {
      lastTime = performance.now();
      tick();
    };

    window.addEventListener('resize', handleResize);
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener(
      'webglcontextrestored',
      handleContextRestored,
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener(
        'webglcontextlost',
        handleContextLost,
      );
      renderer.domElement.removeEventListener(
        'webglcontextrestored',
        handleContextRestored,
      );
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-testid="mandap-three-canvas"
      className={`pointer-events-none fixed inset-0 z-0 opacity-35 ${className}`}
      aria-hidden="true"
    />
  );
};
