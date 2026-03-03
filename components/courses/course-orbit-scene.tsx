"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

type CourseOrbitSceneProps = {
  activeCourseId: string;
  scrollProgressRef: MutableRefObject<number>;
  className?: string;
};

type SceneController = {
  setStage: (courseId: string) => void;
  dispose: () => void;
};

const EMOJI_BY_COURSE: Record<string, string> = {
  viagem: "\u2708\uFE0F",
  tecnologia: "\u{1F4BB}",
  conversacao: "\u{1F4AC}",
  negocios: "\u{1F4BC}",
  certificacoes: "\u{1F4DD}",
  criancas: "\u{1F9F8}",
};

function seededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createEarthTexture() {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const oceanGradient = context.createLinearGradient(0, 0, 0, height);
  oceanGradient.addColorStop(0, "#6cb6ff");
  oceanGradient.addColorStop(0.48, "#2b78c5");
  oceanGradient.addColorStop(1, "#174a8d");
  context.fillStyle = oceanGradient;
  context.fillRect(0, 0, width, height);

  const fillContinent = (points: Array<[number, number]>, color: string) => {
    if (points.length === 0) {
      return;
    }

    context.beginPath();
    context.moveTo(points[0][0] * width, points[0][1] * height);

    for (let index = 1; index < points.length; index += 1) {
      context.lineTo(points[index][0] * width, points[index][1] * height);
    }

    context.closePath();
    context.fillStyle = color;
    context.fill();
  };

  fillContinent(
    [
      [0.12, 0.2],
      [0.2, 0.15],
      [0.26, 0.23],
      [0.24, 0.35],
      [0.2, 0.42],
      [0.22, 0.56],
      [0.18, 0.74],
      [0.12, 0.8],
      [0.08, 0.66],
      [0.1, 0.5],
      [0.1, 0.34],
    ],
    "#4cb765",
  );

  fillContinent(
    [
      [0.42, 0.23],
      [0.5, 0.19],
      [0.58, 0.26],
      [0.56, 0.35],
      [0.6, 0.47],
      [0.55, 0.62],
      [0.47, 0.75],
      [0.42, 0.6],
      [0.44, 0.46],
      [0.41, 0.34],
    ],
    "#51bf6a",
  );

  fillContinent(
    [
      [0.56, 0.17],
      [0.73, 0.18],
      [0.83, 0.28],
      [0.85, 0.41],
      [0.8, 0.52],
      [0.72, 0.49],
      [0.67, 0.44],
      [0.62, 0.5],
      [0.58, 0.43],
      [0.58, 0.31],
    ],
    "#4ab361",
  );

  fillContinent(
    [
      [0.73, 0.66],
      [0.8, 0.67],
      [0.83, 0.74],
      [0.78, 0.8],
      [0.72, 0.76],
    ],
    "#4eb867",
  );

  context.globalAlpha = 0.25;
  fillContinent(
    [
      [0.16, 0.23],
      [0.22, 0.24],
      [0.24, 0.3],
      [0.2, 0.45],
      [0.14, 0.39],
    ],
    "#2f7d44",
  );
  fillContinent(
    [
      [0.47, 0.28],
      [0.54, 0.29],
      [0.57, 0.36],
      [0.53, 0.5],
      [0.46, 0.46],
    ],
    "#2f7d44",
  );
  context.globalAlpha = 1;

  context.fillStyle = "rgba(245,250,255,0.56)";
  context.fillRect(0, 0, width, height * 0.09);
  context.fillRect(0, height * 0.91, width, height * 0.09);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

function createCloudTexture() {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const random = seededRandom(42);

  for (let index = 0; index < 180; index += 1) {
    const x = random() * width;
    const y = random() * height;
    const radiusX = 20 + random() * 90;
    const radiusY = 10 + random() * 45;
    const opacity = 0.12 + random() * 0.26;

    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, random() * Math.PI, 0, Math.PI * 2);
    context.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`;
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

function createEmojiTexture(emoji: string) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  context.clearRect(0, 0, size, size);
  context.font =
    "180px 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(emoji, size / 2, size / 2 + 5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function placeOnOrbit(sprite: THREE.Sprite, angle: number, xOffset = 0) {
  const x = Math.cos(angle) * 2.3 + xOffset;
  const z = Math.sin(angle) * 1.7;
  const y = Math.sin(angle * 1.85) * 0.38;

  sprite.position.set(x, y, z);

  const depthProgress = (z + 1.7) / 3.4;
  const scale = THREE.MathUtils.lerp(0.78, 1.17, depthProgress);
  sprite.scale.setScalar(scale);
}

export function CourseOrbitScene({
  activeCourseId,
  scrollProgressRef,
  className,
}: CourseOrbitSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneControllerRef = useRef<SceneController | null>(null);
  const activeCourseIdRef = useRef(activeCourseId);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    activeCourseIdRef.current = activeCourseId;
    sceneControllerRef.current?.setStage(activeCourseId);
  }, [activeCourseId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const initialCourseId = activeCourseIdRef.current;
    let frameId = 0;
    let isDisposed = false;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.25, 6.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearAlpha(0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "h-full w-full";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.84);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(4.2, 2.8, 3.2);
    const fillLight = new THREE.DirectionalLight(0x9cc4ff, 0.45);
    fillLight.position.set(-3.4, -2.1, -2.8);
    scene.add(ambientLight, keyLight, fillLight);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const earthTexture = createEarthTexture();
    const cloudTexture = createCloudTexture();

    if (earthTexture) {
      earthTexture.anisotropy = maxAnisotropy;
    }

    if (cloudTexture) {
      cloudTexture.anisotropy = maxAnisotropy;
    }

    const earthGeometry = new THREE.SphereGeometry(1.45, 96, 96);
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: earthTexture,
      roughness: 0.88,
      metalness: 0.02,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.rotation.z = THREE.MathUtils.degToRad(23.5);
    scene.add(earth);

    const cloudGeometry = new THREE.SphereGeometry(1.49, 96, 96);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: cloudTexture,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      roughness: 1,
      metalness: 0,
    });
    const cloudLayer = new THREE.Mesh(cloudGeometry, cloudMaterial);
    cloudLayer.rotation.z = THREE.MathUtils.degToRad(23.5);
    scene.add(cloudLayer);

    const atmosphereGeometry = new THREE.SphereGeometry(1.62, 72, 72);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x78c8ff,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = THREE.MathUtils.degToRad(25);
    orbitGroup.rotation.z = THREE.MathUtils.degToRad(-8);
    scene.add(orbitGroup);

    const emojiTextureCache = new Map<string, THREE.CanvasTexture>();
    const getEmojiTextureForCourse = (courseId: string) => {
      const cached = emojiTextureCache.get(courseId);
      if (cached) {
        return cached;
      }

      const emoji = EMOJI_BY_COURSE[courseId] ?? "\u2728";
      const texture = createEmojiTexture(emoji);
      if (!texture) {
        return null;
      }

      emojiTextureCache.set(courseId, texture);
      return texture;
    };

    const currentEmojiMaterial = new THREE.SpriteMaterial({
      map: getEmojiTextureForCourse(initialCourseId),
      transparent: true,
      depthTest: true,
      depthWrite: false,
      opacity: 1,
    });
    const currentEmoji = new THREE.Sprite(currentEmojiMaterial);
    currentEmoji.scale.set(1.15, 1.15, 1.15);
    orbitGroup.add(currentEmoji);

    let currentCourseId = initialCourseId;

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const render = () => {
      if (isDisposed) {
        return;
      }

      const elapsedSeconds = performance.now() * 0.001;

      // One full orbit per stage and always crossing stage boundaries behind the sphere.
      const orbitAngle = scrollProgressRef.current * Math.PI * 2 - Math.PI / 2;

      earth.rotation.y = elapsedSeconds * 0.07;
      cloudLayer.rotation.y = elapsedSeconds * 0.1;

      if (!prefersReducedMotion) {
        atmosphere.scale.setScalar(1 + Math.sin(elapsedSeconds * 0.35) * 0.012);
      }

      placeOnOrbit(currentEmoji, orbitAngle);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    sceneControllerRef.current = {
      setStage: (courseId: string) => {
        if (courseId === currentCourseId) {
          return;
        }

        currentCourseId = courseId;
        currentEmojiMaterial.map = getEmojiTextureForCourse(courseId);
        currentEmojiMaterial.needsUpdate = true;
      },
      dispose: () => {
        isDisposed = true;
        window.cancelAnimationFrame(frameId);
        resizeObserver.disconnect();

        emojiTextureCache.forEach((texture) => texture.dispose());
        earthTexture?.dispose();
        cloudTexture?.dispose();

        currentEmojiMaterial.dispose();
        earthGeometry.dispose();
        earthMaterial.dispose();
        cloudGeometry.dispose();
        cloudMaterial.dispose();
        atmosphereGeometry.dispose();
        atmosphereMaterial.dispose();

        renderer.dispose();
        renderer.forceContextLoss();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      },
    };

    sceneControllerRef.current.setStage(initialCourseId);

    return () => {
      sceneControllerRef.current?.dispose();
      sceneControllerRef.current = null;
    };
  }, [prefersReducedMotion, scrollProgressRef]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
        className,
      )}
      aria-hidden
    />
  );
}
