// components/View360Modal.jsx
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// dynamic import to avoid SSR issues; Car360Viewer is client-only anyway
const Car360Viewer = dynamic(() => import("./Car360Viewer"), { ssr: false });

export default function View360Modal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-purple-600 text-white rounded-md"
      >
        360° View
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
          <div className="bg-white rounded-lg max-w-5xl w-full p-4 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-gray-700"
            >
              ✕
            </button>

            <h4 className="mb-3 font-semibold">360° Viewer — Renault Kwid</h4>

            <Car360Viewer
              totalFrames={45}
              basePath="/360/"
              filePrefix="img_"
              startIndex={0}
              extension=".jpg"
              sensitivity={6}
              autoRotateDefault={false}
              autoRotateSpeed={120}
            />
          </div>
        </div>
      )}
    </>
  );
}
