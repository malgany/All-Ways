"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/cn";

type CourseOrbitSceneProps = {
  activeCourseId: string;
  activeColor: string;
  scrollProgressRef: MutableRefObject<number>;
  className?: string;
};

type SceneController = {
  setStage: (courseId: string, color: string) => void;
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

const COLOR_BY_COURSE: Record<string, string> = {
  viagem: "#f4a340",
  tecnologia: "#58a6ff",
  conversacao: "#57be73",
  negocios: "#8a78dd",
  certificacoes: "#d96f6f",
  criancas: "#efb94a",
};

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
  activeColor,
  scrollProgressRef,
  className,
}: CourseOrbitSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneControllerRef = useRef<SceneController | null>(null);
  const activeCourseIdRef = useRef(activeCourseId);
  const activeColorRef = useRef(activeColor);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    activeCourseIdRef.current = activeCourseId;
    activeColorRef.current = activeColor;
    sceneControllerRef.current?.setStage(activeCourseId, activeColor);
  }, [activeColor, activeCourseId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const initialCourseId = activeCourseIdRef.current;
    const initialColor = activeColorRef.current;
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.05);
    mainLight.position.set(3.8, 2.6, 4);
    const rimLight = new THREE.DirectionalLight(0x8fb6ff, 0.5);
    rimLight.position.set(-3.2, -1.8, -3.2);
    scene.add(ambientLight, mainLight, rimLight);

    const sphereGeometry = new THREE.SphereGeometry(1.45, 72, 72);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(COLOR_BY_COURSE[initialCourseId] ?? initialColor),
      roughness: 0.23,
      metalness: 0.25,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const haloGeometry = new THREE.SphereGeometry(1.57, 52, 52);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(halo);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = THREE.MathUtils.degToRad(25);
    orbitGroup.rotation.z = THREE.MathUtils.degToRad(-8);
    scene.add(orbitGroup);

    const textureCache = new Map<string, THREE.CanvasTexture>();
    const getTextureForCourse = (courseId: string) => {
      const cached = textureCache.get(courseId);
      if (cached) {
        return cached;
      }

      const emoji = EMOJI_BY_COURSE[courseId] ?? "\u2728";
      const texture = createEmojiTexture(emoji);
      if (!texture) {
        return null;
      }

      textureCache.set(courseId, texture);
      return texture;
    };

    const currentEmojiMaterial = new THREE.SpriteMaterial({
      map: getTextureForCourse(initialCourseId),
      transparent: true,
      depthTest: true,
      depthWrite: false,
      opacity: 1,
    });
    const currentEmoji = new THREE.Sprite(currentEmojiMaterial);
    currentEmoji.scale.set(1.15, 1.15, 1.15);
    orbitGroup.add(currentEmoji);
    let currentCourseId = initialCourseId;
    const sphereTargetColor = new THREE.Color(
      COLOR_BY_COURSE[initialCourseId] ?? initialColor,
    );

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

      // One full orbit per stage and always crossing stage boundaries behind the sphere.
      const orbitAngle = scrollProgressRef.current * Math.PI * 2 - Math.PI / 2;

      if (!prefersReducedMotion) {
        sphere.rotation.y = orbitAngle * 0.4;
        sphere.rotation.x = Math.sin(orbitAngle * 0.55) * 0.08;
        halo.scale.setScalar(1 + Math.sin(orbitAngle * 0.9) * 0.015);
      }

      sphereMaterial.color.lerp(sphereTargetColor, prefersReducedMotion ? 0.2 : 0.09);

      placeOnOrbit(currentEmoji, orbitAngle);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    render();

    sceneControllerRef.current = {
      setStage: (courseId: string, color: string) => {
        const targetColor = COLOR_BY_COURSE[courseId] ?? color;
        sphereTargetColor.set(targetColor);

        if (courseId === currentCourseId) {
          return;
        }

        currentCourseId = courseId;
        currentEmojiMaterial.map = getTextureForCourse(courseId);
        currentEmojiMaterial.needsUpdate = true;
      },
      dispose: () => {
        isDisposed = true;
        window.cancelAnimationFrame(frameId);
        resizeObserver.disconnect();
        textureCache.forEach((texture) => texture.dispose());
        currentEmojiMaterial.dispose();
        sphereGeometry.dispose();
        sphereMaterial.dispose();
        haloGeometry.dispose();
        haloMaterial.dispose();
        renderer.dispose();
        renderer.forceContextLoss();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      },
    };

    sceneControllerRef.current.setStage(initialCourseId, initialColor);

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
