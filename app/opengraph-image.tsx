import { ImageResponse } from "next/og";
import { BRAND, REGION, BRAND_TAGLINE } from "./brand";

export const alt = `${BRAND} — ${REGION} home renovation marketplace`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card shown when a link is posted to X / Facebook /
// Instagram / LinkedIn etc. Auto-wired by Next to og:image and twitter:image.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#15281F",
          color: "#F6F1E7",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: "#1E3A2F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #CBA96A",
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: 6, background: "#CBA96A" }} />
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>{BRAND}</div>
          <div style={{ fontSize: 19, color: "#CBA96A", letterSpacing: 4, marginLeft: 8 }}>
            {REGION.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2, maxWidth: 1000 }}>
            {`Renovate smarter in ${REGION}.`}
          </div>
          <div style={{ fontSize: 30, color: "rgba(246,241,231,0.85)", maxWidth: 940, lineHeight: 1.3 }}>
            {BRAND_TAGLINE}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 23, color: "rgba(246,241,231,0.82)" }}>
          <div>Post a project free</div>
          <div style={{ color: "#CBA96A" }}>•</div>
          <div>Verified local pros</div>
          <div style={{ color: "#CBA96A" }}>•</div>
          <div>Source materials</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
