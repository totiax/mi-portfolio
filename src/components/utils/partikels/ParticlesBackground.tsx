// components/NoiseBackground.tsx
"use client";
import { useEffect, useRef } from "react";

const NoiseBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function drawNoise() {
      if (!ctx) return;
      const imageData = ctx.createImageData(width, height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const shade = Math.floor(Math.random() * 60 + 195); // gris claro
        imageData.data[i] = shade;
        imageData.data[i + 1] = shade;
        imageData.data[i + 2] = shade;
        imageData.data[i + 3] = Math.floor(Math.random() * 50 + 30); // opacidad baja
      }
      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(drawNoise);
    }

    drawNoise();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: -1,
        opacity: 0.25, // ajusta la opacidad para que sea sutil
        mixBlendMode: "screen", // prueba con "overlay" o "soft-light" para otros efectos
      }}
    />
  );
};

export default NoiseBackground;
