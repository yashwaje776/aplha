"use client";
import { useEffect, useRef, useState } from "react";

export default function Car360Viewer({
  totalFrames = 45,
  basePath = "/360/",
  filePrefix = "img_",
  startIndex = 0,         
  extension = ".jpg",
  sensitivity = 6,        
  autoRotateDefault = false,
  autoRotateSpeed = 100,  
}) {
  const [frameIdx, setFrameIdx] = useState(0); 
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const acc = useRef(0);
  const autoRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);

  const frameSrc = (i) => `${basePath}${filePrefix}${startIndex + i}${extension}`;

  useEffect(() => {
    const img = new Image();
    img.src = frameSrc(frameIdx);
    img.onload = () => setLoaded(true);

    for (let i = 0; i < totalFrames; i++) {
      const p = new Image();
      p.src = frameSrc(i);
    }
  }, [basePath, filePrefix, extension, startIndex, frameIdx, totalFrames]);

  useEffect(() => {
    if (!autoRotate) {
      if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
      return;
    }
    autoRef.current = setInterval(() => {
      setFrameIdx((p) => (p + 1) % totalFrames);
    }, autoRotateSpeed);
    return () => clearInterval(autoRef.current);
  }, [autoRotate, autoRotateSpeed, totalFrames]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const down = (e) => {
      dragging.current = true;
      lastX.current = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
      if (autoRef.current) { clearInterval(autoRef.current); autoRef.current = null; }
    };
    const up = () => {
      dragging.current = false;
      acc.current = 0;
    };
    const move = (e) => {
      if (!dragging.current) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
      const diff = clientX - lastX.current;
      lastX.current = clientX;
      acc.current += diff;
      if (Math.abs(acc.current) >= sensitivity) {
        const steps = Math.floor(Math.abs(acc.current) / sensitivity);
        setFrameIdx((prev) => {
          let next = prev - (acc.current > 0 ? steps : -steps); 
          
          while (next < 0) next += totalFrames;
          while (next >= totalFrames) next -= totalFrames;
          return next;
        });
        acc.current = 0;
      }
    };

    el.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointermove", move);

    el.addEventListener("touchstart", down);
    el.addEventListener("touchend", up);
    el.addEventListener("touchmove", move);

    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointermove", move);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchend", up);
      el.removeEventListener("touchmove", move);
    };
  }, [sensitivity, totalFrames]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setFrameIdx((p) => (p === 0 ? totalFrames - 1 : p - 1));
      if (e.key === "ArrowRight") setFrameIdx((p) => (p === totalFrames - 1 ? 0 : p + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalFrames]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        tabIndex={0}
        className="relative bg-black rounded-lg overflow-hidden select-none"
        style={{ height: 480 }}
        aria-label="360 car viewer"
      >
        {!loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 text-white">
            Loading...
          </div>
        )}

        <img
          src={frameSrc(frameIdx)}
          alt={`frame ${frameIdx}`}
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />

        <div className="absolute left-3 bottom-3 z-30 bg-white/90 text-black px-3 py-1 rounded-md text-sm">
          {frameIdx + startIndex}/{startIndex + totalFrames - 1}
        </div>

        <button
          onClick={() => setAutoRotate((s) => !s)}
          className="absolute right-3 bottom-3 z-30 bg-white/90 text-black px-3 py-1 rounded-md text-sm"
        >
          {autoRotate ? "Stop" : "Auto"}
        </button>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto px-1">
        {Array.from({ length: totalFrames }).map((_, i) => (
          <button
            key={i}
            onClick={() => setFrameIdx(i)}
            className={`shrink-0 w-16 h-10 rounded overflow-hidden border ${
              i === frameIdx ? "border-purple-600" : "border-gray-200"
            }`}
            aria-label={`thumb-${i}`}
          >
            <img
              src={frameSrc(i)}
              alt={`thumb-${i}`}
              className="w-full h-full object-cover"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
