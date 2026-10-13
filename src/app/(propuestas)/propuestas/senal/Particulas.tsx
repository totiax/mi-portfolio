"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export type ParticulasHandle = { ensamblar: (duracion: number) => gsap.core.Tween | null; completo: () => void };

const vertex = /* glsl */ `
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRadio;
  uniform float uSize;
  attribute vec3 aDesde;
  attribute float aRand;
  varying float vAlpha;

  void main() {
    float t = smoothstep(aRand * 0.45, aRand * 0.45 + 0.55, uProgress);
    vec3 pos = mix(aDesde, position, t);

    pos.x += sin(uTime * 0.9 + aRand * 40.0) * 0.8;
    pos.y += cos(uTime * 0.7 + aRand * 30.0) * 0.8;

    vec2 dir = pos.xy - uMouse;
    float d = length(dir);
    float empuje = smoothstep(uRadio, 0.0, d);
    pos.xy += normalize(dir + 0.0001) * empuje * 42.0 * t;

    vAlpha = mix(0.25, 1.0, t) * (1.0 - empuje * 0.5);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (1.0 + empuje * 1.4);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAcento;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    vec3 c = mix(uAcento, uColor, smoothstep(0.35, 1.0, vAlpha));
    gl_FragColor = vec4(c, vAlpha * smoothstep(0.5, 0.2, d));
  }
`;

function muestrear(texto: string, ancho: number, paso: number, fuente: string) {
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d")!;
  let size = 200;
  ctx.font = `700 ${size}px ${fuente}`;
  size = Math.floor((size * ancho) / ctx.measureText(texto).width);
  c.width = Math.ceil(ancho);
  c.height = Math.ceil(size * 1.1);
  ctx.font = `700 ${size}px ${fuente}`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.fillText(texto, c.width / 2, c.height / 2);

  const { data } = ctx.getImageData(0, 0, c.width, c.height);
  const puntos: number[] = [];
  for (let y = 0; y < c.height; y += paso) {
    for (let x = 0; x < c.width; x += paso) {
      if (data[(y * c.width + x) * 4 + 3] > 128) puntos.push(x - c.width / 2, c.height / 2 - y);
    }
  }
  return puntos;
}

type Props = { texto: string; fuente: string; animar: boolean };

const Particulas = forwardRef<ParticulasHandle, Props>(function Particulas({ texto, fuente, animar }, ref) {
  const host = useRef<HTMLDivElement>(null);
  const uniforms = useRef({
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(9999, 9999) },
    uRadio: { value: 120 },
    uSize: { value: 2.2 },
    uColor: { value: new THREE.Color("#e8e6e1") },
    uAcento: { value: new THREE.Color("#ffb000") },
  });

  useImperativeHandle(ref, () => ({
    ensamblar: (duracion) => gsap.to(uniforms.current.uProgress, { value: 1, duration: duracion, ease: "expo.inOut" }),
    completo: () => {
      uniforms.current.uProgress.value = 1;
    },
  }));

  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      el.dataset.fallback = "true";
      return;
    }
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms.current,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
    });
    let puntos: THREE.Points | null = null;

    const construir = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      const movil = width < 700;
      uniforms.current.uSize.value = (movil ? 1.6 : 2.2) * dpr;
      uniforms.current.uRadio.value = movil ? 70 : 130;
      const pos = muestrear(texto, width * 0.92, movil ? 4 : 5, fuente);
      const n = pos.length / 2;
      const target = new Float32Array(n * 3);
      const desde = new Float32Array(n * 3);
      const rand = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        target[i * 3] = pos[i * 2];
        target[i * 3 + 1] = pos[i * 2 + 1];
        const ang = Math.random() * Math.PI * 2;
        const r = Math.max(width, height) * (0.4 + Math.random() * 0.6);
        desde[i * 3] = Math.cos(ang) * r;
        desde[i * 3 + 1] = Math.sin(ang) * r;
        rand[i] = Math.random();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(target, 3));
      geo.setAttribute("aDesde", new THREE.BufferAttribute(desde, 3));
      geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

      if (puntos) {
        puntos.geometry.dispose();
        scene.remove(puntos);
      }
      puntos = new THREE.Points(geo, material);
      scene.add(puntos);
      renderer.render(scene, camera);
    };

    construir();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const tick = (time: number) => {
      if (!visible) return;
      if (animar) uniforms.current.uTime.value = time;
      renderer.render(scene, camera);
    };
    gsap.ticker.add(tick);

    const mouse = uniforms.current.uMouse.value;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      gsap.to(mouse, { x: e.clientX - r.left - r.width / 2, y: r.height / 2 - (e.clientY - r.top), duration: 0.5, ease: "power3", overwrite: true });
    };
    const salir = () => gsap.to(mouse, { x: 9999, y: 9999, duration: 0.01, overwrite: true });
    if (animar) {
      window.addEventListener("pointermove", mover);
      document.documentElement.addEventListener("pointerleave", salir);
    }

    let timer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(construir, 150);
    });
    ro.observe(el);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", mover);
      document.documentElement.removeEventListener("pointerleave", salir);
      io.disconnect();
      ro.disconnect();
      clearTimeout(timer);
      puntos?.geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [texto, fuente, animar]);

  return <div ref={host} aria-hidden="true" style={{ position: "absolute", inset: 0 }} />;
});

export default Particulas;
