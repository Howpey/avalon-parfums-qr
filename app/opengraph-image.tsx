import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avalon Parfums — Perfumaria de Nicho";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share card for the site (home, catalog). Product pages override this
// with the real bottle photo via generateMetadata.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #14110b 0%, #0f1011 60%, #1a1206 100%)",
          color: "#f5f5f7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#6a6b6b",
          }}
        >
          Perfumaria de nicho
        </div>
        <div style={{ fontSize: 96, fontWeight: 500, marginTop: 20 }}>
          Avalon{" "}
          <span style={{ color: "#e3c378" }}>Parfums</span>
        </div>
        <div style={{ fontSize: 30, color: "#9f9fa0", marginTop: 24 }}>
          Nicho · Importados · Árabes · Baixada Santista
        </div>
      </div>
    ),
    { ...size },
  );
}
