"use client";
import { useState } from "react";

export default function Carousel({ images = [] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) images = ["/360/img_0.jpg"];

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="relative max-w-4xl mx-auto">
      <img
        src={images[idx]}
        alt={`img-${idx}`}
        className="w-full h-64 object-cover rounded-lg"
      />
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">
        ◀
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full">
        ▶
      </button>
      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full ${i===idx ? 'bg-purple-600' : 'bg-gray-300'}`}></button>
        ))}
      </div>
    </div>
  );
}
