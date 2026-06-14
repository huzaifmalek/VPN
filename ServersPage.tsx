import { useState, useEffect } from "react";
import { Wifi, WifiOff, Activity, Zap, Globe, Clock, ArrowDown, ArrowUp } from "lucide-react";

const countries = [
  { name: "United States", flag: "🇺🇸", ping: 28, servers: 420 },
  { name: "United Kingdom", flag: "🇬🇧", ping: 35, servers: 180 },
  { name: "Germany", flag: "🇩🇪", ping: 32, servers: 210 },
  { name: "France", flag: "🇫🇷", ping: 38, servers: 145 },
  { name: "Canada", flag: "🇨🇦", ping: 45, servers: 160 },
  { name: "India", flag: "🇮🇳", ping: 22, servers: 95 },
  { name: "Japan", flag: "🇯🇵", ping: 65, servers: 130 },
  { name: "Singapore", flag: "🇸🇬", ping: 55, servers: 110 },
  { name: "Australia", flag: "🇦🇺", ping: 88, servers: 95 },
  { name: "Netherlands", flag: "🇳🇱", ping: 31, servers: 175 },
];

type Status = "disconnected" | "connecting" | "connected";

const GlassCard = ({ children, style = {}, className = "" }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) => (
  <div className={className} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.12)", backdropFilter: "blur(20px)", borderRadius: "1rem", ...style }}>
    {children}
  </div>
);

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function ServersPage() {
  const [selected, setSelected] = useState(countries[2]);
  const [status, setStatus] = useState<Status>("disconnected");
  const [virtualIp, setVirtualIp] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [downSpeed] = useState("148.3 Mbps");
  const [upSpeed] = useState("52.7 Mbps");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === "connected") {
      interval = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleConnect = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setTimeout(() => {
        setStatus("connected");
        setVirtualIp(`${Math.floor(Math.random() * 50 + 100)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 200 + 10)}`);
      }, 2000);
    } else if (status === "connected") {
      setStatus("disconnected");
      setVirtualIp("");
    }
  };

  return (
    <div style={{ background: "#06070f", minHeight: "100vh", paddingTop: "5rem" }}>
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: 0, right: "10%", width: "40%", height: "50%", background: "radial-gradient(ellipse,rgba(124,58,237,0.07) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "5%", width: "40%", height: "40%", background: "radial-gradient(ellipse,rgba(0,212,255,0.06) 0%,transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12" style={{ zIndex: 1 }}>
        <div className="mb-10">
          <div className="inline-block mb-3 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)", fontFamily: "var(--font-mono)" }}>SERVER NETWORK</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
            Global VPN{" "}
            <span style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Servers</span>
          </h1>
          <p style={{ color: "#8892b0", marginTop: "0.5rem" }}>5,000+ servers across 100+ countries. Connect to the fastest server near you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Country List */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <p className="text-xs uppercase tracking-widest mb-4 px-2" style={{ color: "#8892b0", fontFamily: "var(--font-mono)" }}>Select Server Location</p>
              <div className="space-y-1">
                {countries.map(country => (
                  <button
                    key={country.name}
                    onClick={() => { setSelected(country); if (status === "connected") setStatus("disconnected"); }}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 text-left"
                    style={{
                      background: selected.name === country.name ? "rgba(0,212,255,0.1)" : "transparent",
                      border: selected.name === country.name ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{country.flag}</span>
                      <div>
                        <div className="text-sm" style={{ color: selected.name === country.name ? "#00d4ff" : "#ccd6f6", fontWeight: 500 }}>{country.name}</div>
                        <div className="text-xs" style={{ color: "#8892b0" }}>{country.servers} servers</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs" style={{ color: country.ping < 40 ? "#10b981" : country.ping < 70 ? "#f59e0b" : "#ef4444", fontFamily: "var(--font-mono)" }}>{country.ping} ms</div>
                      <div className="w-8 h-1 rounded mt-1" style={{ background: country.ping < 40 ? "#10b981" : country.ping < 70 ? "#f59e0b" : "#ef4444", opacity: 0.5 }} />
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Connection Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Connection Card */}
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Shield / Status Indicator */}
                <div className="relative flex-shrink-0">
                  <div className="w-36 h-36 rounded-full flex items-center justify-center relative"
                    style={{
                      background: status === "connected"
                        ? "radial-gradient(circle,rgba(16,185,129,0.2),rgba(16,185,129,0.05))"
                        : status === "connecting"
                          ? "radial-gradient(circle,rgba(245,158,11,0.2),rgba(245,158,11,0.05))"
                          : "radial-gradient(circle,rgba(0,212,255,0.12),rgba(0,212,255,0.03))",
                      border: `2px solid ${status === "connected" ? "#10b981" : status === "connecting" ? "#f59e0b" : "rgba(0,212,255,0.3)"}`,
                      boxShadow: status === "connected" ? "0 0 40px rgba(16,185,129,0.2)" : "none",
                    }}
                  >
                    {status === "connected" ? (
                      <Wifi size={52} style={{ color: "#10b981" }} />
                    ) : status === "connecting" ? (
                      <Activity size={52} style={{ color: "#f59e0b", animation: "pulse 1s infinite" }} />
                    ) : (
                      <WifiOff size={52} style={{ color: "#8892b0" }} />
                    )}
                    {status === "connecting" && (
                      <div className="absolute inset-0 rounded-full animate-ping" style={{ border: "2px solid rgba(245,158,11,0.3)" }} />
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                      <span className="text-4xl">{selected.flag}</span>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{selected.name}</h2>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm" style={{ fontFamily: "var(--font-mono)" }}>
                      <span style={{ color: "#8892b0" }}>Ping: <span style={{ color: "#00d4ff" }}>{selected.ping} ms</span></span>
                      <span style={{ color: "#8892b0" }}>Speed: <span style={{ color: "#00d4ff" }}>1 Gbps</span></span>
                      <span style={{ color: "#8892b0" }}>IP: <span style={{ color: "#00d4ff" }}>{status === "connected" ? virtualIp : "Dynamic"}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <div className="w-2 h-2 rounded-full" style={{
                      background: status === "connected" ? "#10b981" : status === "connecting" ? "#f59e0b" : "#ef4444",
                      boxShadow: status === "connected" ? "0 0 8px #10b981" : "none",
                    }} />
                    <span className="text-sm capitalize" style={{ color: status === "connected" ? "#10b981" : status === "connecting" ? "#f59e0b" : "#ef4444" }}>
                      {status === "connecting" ? "Establishing secure tunnel…" : status === "connected" ? `Connected Successfully to ${selected.name}` : "Disconnected"}
                    </span>
                  </div>

                  <button
                    onClick={handleConnect}
                    disabled={status === "connecting"}
                    className="px-10 py-3 rounded-xl transition-all duration-200"
                    style={
                      status === "connected"
                        ? { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", fontWeight: 700, cursor: "pointer" }
                        : status === "connecting"
                          ? { background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", fontWeight: 700, cursor: "not-allowed" }
                          : { background: "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700, cursor: "pointer" }
                    }
                    onMouseEnter={e => { if (status === "disconnected") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,212,255,0.4)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {status === "connecting" ? "Connecting…" : status === "connected" ? "Disconnect" : "Connect"}
                  </button>
                </div>
              </div>
            </GlassCard>

            {/* Live Stats (shown when connected) */}
            {status === "connected" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Globe size={18} />, label: "Virtual IP", value: virtualIp, color: "#00d4ff" },
                  { icon: <Clock size={18} />, label: "Session Time", value: formatTime(elapsed), color: "#7c3aed" },
                  { icon: <ArrowDown size={18} />, label: "Download", value: downSpeed, color: "#10b981" },
                  { icon: <ArrowUp size={18} />, label: "Upload", value: upSpeed, color: "#06b6d4" },
                ].map(({ icon, label, value, color }) => (
                  <GlassCard key={label} className="p-4 text-center">
                    <div style={{ color, marginBottom: "0.5rem" }} className="flex justify-center">{icon}</div>
                    <div className="text-xs mb-1" style={{ color: "#8892b0" }}>{label}</div>
                    <div className="text-sm" style={{ color: "#fff", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{value}</div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Server specs */}
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8892b0", fontFamily: "var(--font-mono)" }}>Server Specifications</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Protocol", value: "OpenVPN / WireGuard" },
                  { label: "Encryption", value: "AES-256-GCM" },
                  { label: "Auth", value: "SHA-512 HMAC" },
                  { label: "Bandwidth", value: "1 Gbps" },
                  { label: "Available Servers", value: `${selected.servers}` },
                  { label: "Uptime", value: "99.99%" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs mb-0.5" style={{ color: "#8892b0" }}>{label}</div>
                    <div className="text-sm" style={{ color: "#ccd6f6", fontFamily: "var(--font-mono)" }}>{value}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
