import { useState, useEffect } from "react";
import { Shield, Wifi, WifiOff, Globe, Activity, ArrowDown, ArrowUp, Clock, Server, LogOut, Settings } from "lucide-react";

interface DashboardPageProps {
  userEmail: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

type ConnStatus = "disconnected" | "connecting" | "connected";

const servers = [
  { name: "United States", flag: "🇺🇸", ping: 28 },
  { name: "Germany", flag: "🇩🇪", ping: 32 },
  { name: "United Kingdom", flag: "🇬🇧", ping: 35 },
  { name: "Singapore", flag: "🇸🇬", ping: 55 },
];

function formatTime(s: number) {
  const h = Math.floor(s / 3600).toString().padStart(2, "0");
  const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

const GlassCard = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div className={className} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.12)", backdropFilter: "blur(20px)", borderRadius: "1rem", ...style }}>
    {children}
  </div>
);

export function DashboardPage({ userEmail, onNavigate, onLogout }: DashboardPageProps) {
  const [status, setStatus] = useState<ConnStatus>("disconnected");
  const [server, setServer] = useState(servers[1]);
  const [elapsed, setElapsed] = useState(0);
  const [virtualIp, setVirtualIp] = useState("");
  const [dataDown, setDataDown] = useState(0);
  const [dataUp, setDataUp] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === "connected") {
      interval = setInterval(() => {
        setElapsed(e => e + 1);
        setDataDown(d => d + Math.random() * 2);
        setDataUp(u => u + Math.random() * 0.5);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const connect = () => {
    if (status === "disconnected") {
      setStatus("connecting");
      setTimeout(() => {
        setStatus("connected");
        setVirtualIp(`45.77.${Math.floor(Math.random() * 200 + 10)}.${Math.floor(Math.random() * 200 + 10)}`);
      }, 1800);
    } else if (status === "connected") {
      setStatus("disconnected");
      setVirtualIp("");
      setElapsed(0);
      setDataDown(0);
      setDataUp(0);
    }
  };

  const userName = userEmail.split("@")[0];

  return (
    <div style={{ background: "#06070f", minHeight: "100vh", paddingTop: "5rem" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", background: "radial-gradient(ellipse at 50% 0%,rgba(0,212,255,0.06) 0%,transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#00d4ff", fontFamily: "var(--font-mono)" }}>Dashboard</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>
              Welcome back, <span style={{ color: "#00d4ff" }}>{userName}</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: "#8892b0" }}>{userEmail}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => onNavigate("servers")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all" style={{ border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Settings size={16} /> Change Server
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all" style={{ border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main VPN Control */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connection Card */}
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full flex items-center justify-center"
                    style={{
                      background: status === "connected" ? "radial-gradient(circle,rgba(16,185,129,0.2),rgba(16,185,129,0.04))" : "radial-gradient(circle,rgba(0,212,255,0.12),rgba(0,212,255,0.02))",
                      border: `2px solid ${status === "connected" ? "#10b981" : status === "connecting" ? "#f59e0b" : "rgba(0,212,255,0.3)"}`,
                      boxShadow: status === "connected" ? "0 0 60px rgba(16,185,129,0.2)" : "none",
                      transition: "all 0.5s",
                    }}
                  >
                    {status === "connected" ? (
                      <Wifi size={56} style={{ color: "#10b981" }} />
                    ) : (
                      <WifiOff size={56} style={{ color: status === "connecting" ? "#f59e0b" : "#8892b0", animation: status === "connecting" ? "pulse 1s infinite" : "none" }} />
                    )}
                  </div>
                  {status === "connected" && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs" style={{ background: "#10b981", color: "#fff", fontWeight: 600 }}>Protected</div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                    <span className="text-2xl">{server.flag}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>{server.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm mb-6" style={{ fontFamily: "var(--font-mono)" }}>
                    <span style={{ color: "#8892b0" }}>Status: <span style={{ color: status === "connected" ? "#10b981" : status === "connecting" ? "#f59e0b" : "#ef4444" }}>{status}</span></span>
                    <span style={{ color: "#8892b0" }}>Ping: <span style={{ color: "#00d4ff" }}>{server.ping}ms</span></span>
                    <span style={{ color: "#8892b0" }}>IP: <span style={{ color: "#00d4ff" }}>{status === "connected" ? virtualIp : "---.---.---.---"}</span></span>
                  </div>
                  <button
                    onClick={connect}
                    disabled={status === "connecting"}
                    className="px-10 py-3.5 rounded-xl transition-all duration-200"
                    style={
                      status === "connected"
                        ? { background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", color: "#ef4444", fontWeight: 700 }
                        : status === "connecting"
                          ? { background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", fontWeight: 700, cursor: "not-allowed" }
                          : { background: "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700 }
                    }
                    onMouseEnter={e => { if (status === "disconnected") { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,212,255,0.4)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {status === "connecting" ? "Connecting…" : status === "connected" ? "Disconnect VPN" : "Connect VPN"}
                  </button>
                </div>
              </div>
            </GlassCard>

            {/* Live Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Globe size={18} />, label: "Virtual IP", value: status === "connected" ? virtualIp : "—", color: "#00d4ff" },
                { icon: <Clock size={18} />, label: "Session Time", value: status === "connected" ? formatTime(elapsed) : "00:00:00", color: "#7c3aed" },
                { icon: <ArrowDown size={18} />, label: "Downloaded", value: status === "connected" ? `${dataDown.toFixed(1)} MB` : "0 MB", color: "#10b981" },
                { icon: <ArrowUp size={18} />, label: "Uploaded", value: status === "connected" ? `${dataUp.toFixed(1)} MB` : "0 MB", color: "#06b6d4" },
              ].map(({ icon, label, value, color }) => (
                <GlassCard key={label} className="p-4 text-center">
                  <div style={{ color }} className="flex justify-center mb-2">{icon}</div>
                  <div className="text-xs mb-1" style={{ color: "#8892b0" }}>{label}</div>
                  <div className="text-sm" style={{ color: "#fff", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{value}</div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Server Picker */}
            <GlassCard className="p-5">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8892b0", fontFamily: "var(--font-mono)" }}>Quick Server Switch</p>
              <div className="space-y-2">
                {servers.map(s => (
                  <button
                    key={s.name}
                    onClick={() => { setServer(s); if (status === "connected") setStatus("disconnected"); }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all"
                    style={{
                      background: server.name === s.name ? "rgba(0,212,255,0.1)" : "transparent",
                      border: server.name === s.name ? "1px solid rgba(0,212,255,0.3)" : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{s.flag}</span>
                      <span className="text-sm" style={{ color: server.name === s.name ? "#00d4ff" : "#ccd6f6" }}>{s.name}</span>
                    </div>
                    <span className="text-xs" style={{ color: "#8892b0", fontFamily: "var(--font-mono)" }}>{s.ping}ms</span>
                  </button>
                ))}
              </div>
              <button onClick={() => onNavigate("servers")} className="mt-4 w-full py-2 rounded-xl text-sm transition-all" style={{ border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,255,0.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                View All Servers →
              </button>
            </GlassCard>

            {/* Security Status */}
            <GlassCard className="p-5">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8892b0", fontFamily: "var(--font-mono)" }}>Security Features</p>
              <div className="space-y-3">
                {[
                  { label: "Kill Switch", active: true },
                  { label: "DNS Protection", active: true },
                  { label: "No-Log Policy", active: true },
                  { label: "Ad Blocker", active: status === "connected" },
                ].map(({ label, active }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: "#8892b0" }}>{label}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: active ? "#10b981" : "#374151" }} />
                      <span className="text-xs" style={{ color: active ? "#10b981" : "#374151", fontFamily: "var(--font-mono)" }}>{active ? "ON" : "OFF"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Plan */}
            <GlassCard className="p-5" style={{ background: "linear-gradient(135deg,rgba(0,212,255,0.08),rgba(124,58,237,0.08))", borderColor: "rgba(0,212,255,0.25)" }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield size={16} style={{ color: "#00d4ff" }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: "#00d4ff", fontFamily: "var(--font-mono)" }}>Premium Plan</span>
              </div>
              <p className="text-sm mb-1" style={{ color: "#ccd6f6" }}>₹599/month</p>
              <p className="text-xs mb-4" style={{ color: "#8892b0" }}>Renews on Jul 11, 2026</p>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: "65%", background: "linear-gradient(90deg,#00d4ff,#7c3aed)" }} />
              </div>
              <p className="text-xs mt-1.5" style={{ color: "#8892b0" }}>65% of plan used</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
