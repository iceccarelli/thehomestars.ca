"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/app/_lib/data";

// Cinematic cross-fade frame: cycles a set of photos with a slow Ken-Burns
// drift and a soft fade, plus tappable dots. Fills its (relative) parent, so
// the parent supplies the aspect ratio + rounding + overflow-hidden.
export default function CineFrame({ images, interval = 4500 }: { images: Photo[]; interval?: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="cine-stage">
      {images.map((img, i) => (
        <div key={i} className={`cine-slide kb${(i % 8) + 1} ${i === idx ? "is-active" : ""}`} aria-hidden={i !== idx}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src} alt={i === idx ? img.alt : ""} loading={i === 0 ? "eager" : "lazy"} />
        </div>
      ))}
      <div className="cine-vignette" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10" role="tablist" aria-label="Showcase images">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`cine-dot ${i === idx ? "is-active" : ""}`}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Show image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
