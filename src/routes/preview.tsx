import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Design preview — Senior Services Adult Family Home" },
      { name: "description", content: "Internal design preview for Senior Services Adult Family Home." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen" style={{ background: "#F9F7F2", color: "#2D2A26", fontFamily: "Inter, system-ui, sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-xs uppercase tracking-[0.25em]" style={{ color: "#5B6351" }}>Design preview · Mount Vernon, WA</p>
        <h1 className="mt-4 text-5xl md:text-6xl leading-tight" style={{ fontFamily: "Lora, Georgia, serif", letterSpacing: "-0.01em" }}>
          Two design directions for <em>Senior Services Adult Family Home</em>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg" style={{ color: "rgba(45,42,38,0.7)" }}>
          Both sites share the same content and data — only the visual direction differs.
        </p>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link to="/heritage" className="block rounded-2xl p-8 transition hover:-translate-y-1" style={{ background: "#fafaf9", border: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="text-xs uppercase tracking-widest" style={{ color: "#3f6212" }}>Direction One</div>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: "Fraunces, Georgia, serif" }}>Warm Heritage</h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(28,25,23,0.7)" }}>Sage green, soft surfaces, gentle editorial layouts.</p>
            <span className="mt-6 inline-block text-sm font-medium" style={{ color: "#3f6212" }}>Open Heritage →</span>
          </Link>
          <Link to="/heirloom" className="block rounded-2xl p-8 transition hover:-translate-y-1" style={{ background: "#fff", border: "1px solid rgba(45,42,38,0.12)" }}>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "#5B6351", fontFamily: "JetBrains Mono, monospace" }}>Direction Two</div>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: "Lora, Georgia, serif" }}>Editorial <em>Heirloom</em></h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(45,42,38,0.7)" }}>Cream, serif headlines, mono labels.</p>
            <span className="mt-6 inline-block text-sm font-medium" style={{ color: "#5B6351" }}>Open Heirloom →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}