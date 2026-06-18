"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/app/_lib/data";

// Ken-Burns keyframe names defined in globals.css (kb1..kb8) — proven working
// (the hero uses them). We reference them via INLINE animation so this
// component never depends on the .sb-* stylesheet being applied. That makes the
// rotation/opacity robust against CSS hot-reload quirks.
const KB = ["kb1", "kb2", "kb3", "kb4", "kb5", "kb6", "kb7", "kb8"];

export default function SectionBg({
  images,
  intensity = "normal",
}: {
  images: Photo[];
  intensity?: "normal" | "max";
}) {
  const [idx, setIdx] = useState(0);
  const [reduce, setReduce] = useState(false);

  const rotateMs = intensity === "max" ? 3200 : 4200;
  const fadeMs = intensity === "max" ? 1100 : 1400;
  const kbDur = intensity === "max" ? 15 : 26;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.("change", onChange);

    // Random entry image on every visit (runs after mount -> no hydration mismatch).
    setIdx(Math.floor(Math.random() * images.length));

    let timer: ReturnType<typeof setInterval> | undefined;
    if (!mq.matches && images.length > 1) {
      timer = setInterval(() => setIdx((i) => (i + 1) % images.length), rotateMs);
    }
    return () => {
      if (timer) clearInterval(timer);
      mq.removeEventListener?.("change", onChange);
    };
  }, [images.length, rotateMs]);

  const scrim =
    intensity === "max"
      ? "linear-gradient(180deg, rgba(13,26,21,.74) 0%, rgba(13,26,21,.64) 38%, rgba(13,26,21,.88) 100%)"
      : "linear-gradient(180deg, rgba(13,26,21,.80) 0%, rgba(13,26,21,.72) 45%, rgba(13,26,21,.84) 100%)";

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", background: "var(--spruce-deep)" }}>
      {images.map((img, i) => (
        <div
          key={img.src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === idx ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease-in-out`,
            willChange: "opacity",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt=""
            loading={i < 2 ? "eager" : "lazy"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transformOrigin: "center",
              animation: reduce ? "none" : `${KB[i % 8]} ${kbDur}s ease-in-out infinite alternate`,
            }}
          />
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: scrim }} />
    </div>
  );
}
