import { useEffect, useRef, useState } from "react";
import {
  Shield, Lock, Globe, Zap, Wifi, Monitor,
  ChevronRight, Check, Star, Users, Server, Activity
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
  scrollTarget: string | null;
  onScrollHandled: () => void;
}

const GlassCard = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <div
    className={className}
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(0,212,255,0.12)",
      backdropFilter: "blur(20px)",
      borderRadius: "1rem",
      ...style,
    }}
  >
    {children}
  </div>
);

const features = [
  {
    icon: <Lock size={28} />,
    title: "Military Grade Encryption",
    desc: "AES-256 encryption protects every packet you send. The same standard used by governments and militaries worldwide.",
    color: "#00d4ff",
  },
  {
    icon: <Shield size={28} />,
    title: "No Logs Policy",
    desc: "We never store, track, or share your activity. Zero-knowledge architecture means we can't hand over what we don't have.",
    color: "#7c3aed",
  },
  {
    icon: <Globe size={28} />,
    title: "Global Servers",
    desc: "Access 5,000+ servers across 100+ countries. Bypass geo-restrictions and browse the open internet freely.",
    color: "#06b6d4",
  },
  {
    icon: <Zap size={28} />,
    title: "Kill Switch",
    desc: "Automatic kill switch instantly cuts internet if VPN drops. Your real IP is never exposed, even for a millisecond.",
    color: "#8b5cf6",
  },
  {
    icon: <Wifi size={28} />,
    title: "Unlimited Bandwidth",
    desc: "Stream 4K, game online, and download without limits. No throttling, no data caps, no speed restrictions ever.",
    color: "#10b981",
  },
  {
    icon: <Monitor size={28} />,
    title: "Multi Device Support",
    desc: "One account, unlimited devices. Windows, Mac, iOS, Android, Linux — full protection across your entire digital life.",
    color: "#f59e0b",
  },
];

const plans = [
  {
    name: "Basic",
    price: "₹299",
    period: "/month",
    features: ["Unlimited browsing", "AES-256 encryption", "1 device", "24/7 support", "No logs policy"],
    highlighted: false,
    cta: "Choose Plan",
  },
  {
    name: "Premium",
    price: "₹599",
    period: "/month",
    features: ["Unlimited browsing", "AES-256 encryption", "5 devices", "24/7 priority support", "No logs policy", "Kill switch", "Global servers"],
    highlighted: true,
    cta: "Start Trial",
    badge: "Most Popular",
  },
  {
    name: "Ultimate",
    price: "₹999",
    period: "/month",
    features: ["Unlimited browsing", "AES-256 encryption", "Unlimited devices", "24/7 dedicated support", "No logs policy", "Kill switch", "Global servers", "Dedicated IP"],
    highlighted: false,
    cta: "Choose Plan",
  },
];

const stats = [
  { value: "100+", label: "Countries", icon: <Globe size={20} /> },
  { value: "5000+", label: "Servers", icon: <Server size={20} /> },
  { value: "10M+", label: "Users", icon: <Users size={20} /> },
  { value: "99.99%", label: "Uptime", icon: <Activity size={20} /> },
];

export function HomePage({ onNavigate, scrollTarget, onScrollHandled }: HomePageProps) {
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected");
  const [ipDisplay, setIpDisplay] = useState("192.168.1.1");

  useEffect(() => {
    if (!scrollTarget) return;
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      features: featuresRef,
      pricing: pricingRef,
    };
    const ref = map[scrollTarget];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onScrollHandled();
  }, [scrollTarget, onScrollHandled]);

  const handleHeroConnect = () => {
    if (connectionStatus === "disconnected") {
      setConnectionStatus("connecting");
      setTimeout(() => {
        setConnectionStatus("connected");
        setIpDisplay("45.77.142.189");
      }, 1500);
    } else {
      setConnectionStatus("disconnected");
      setIpDisplay("192.168.1.1");
    }
  };

  return (
    <div style={{ background: "#06070f", minHeight: "100vh" }}>
      {/* Mesh background */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(ellipse,rgba(0,212,255,0.07) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(ellipse,rgba(124,58,237,0.07) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "20%", width: "40%", height: "40%", background: "radial-gradient(ellipse,rgba(0,212,255,0.05) 0%,transparent 70%)" }} />
      </div>

      {/* HERO */}
      <section ref={homeRef} className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6" style={{ zIndex: 1 }}>
        {/* Badge */}
        <div className="mb-6 px-4 py-1.5 rounded-full text-xs flex items-center gap-2" style={{ border: "1px solid rgba(0,212,255,0.3)", background: "rgba(0,212,255,0.08)", color: "#00d4ff", fontFamily: "var(--font-mono)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00d4ff" }} />
          Enterprise-grade security for everyone
        </div>

        <h1 className="text-center max-w-4xl mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,6vw,5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>
          Secure Your Internet{" "}
          <span style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Connection Anywhere
          </span>
        </h1>
        <p className="text-center max-w-2xl mb-10 text-lg" style={{ color: "#8892b0", lineHeight: 1.7 }}>
          Protect your privacy, encrypt your data, and access global content with high-speed VPN servers worldwide.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button
            onClick={() => onNavigate("signup")}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl text-black transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#00d4ff,#0ea5e9)", fontWeight: 700, fontSize: "1rem" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,212,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Get Started <ChevronRight size={18} />
          </button>
          <button
            onClick={handleHeroConnect}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl transition-all duration-200"
            style={{ border: "1px solid rgba(0,212,255,0.4)", color: "#00d4ff", fontWeight: 600, fontSize: "1rem" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {connectionStatus === "connected" ? "Disconnect VPN" : "Connect VPN"}
          </button>
        </div>

        {/* Live Connection Card + World Map */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Connection Status Card */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-widest" style={{ color: "#8892b0", fontFamily: "var(--font-mono)" }}>Connection Status</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{
                  background: connectionStatus === "connected" ? "#10b981" : connectionStatus === "connecting" ? "#f59e0b" : "#ef4444",
                  boxShadow: connectionStatus === "connected" ? "0 0 8px #10b981" : connectionStatus === "connecting" ? "0 0 8px #f59e0b" : "none",
                  animation: connectionStatus === "connecting" ? "pulse 1s infinite" : "none",
                }} />
                <span className="text-xs capitalize" style={{ color: connectionStatus === "connected" ? "#10b981" : connectionStatus === "connecting" ? "#f59e0b" : "#ef4444", fontFamily: "var(--font-mono)" }}>
                  {connectionStatus}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "#8892b0" }}>Your IP</span>
                <span className="text-xs" style={{ color: "#ccd6f6", fontFamily: "var(--font-mono)" }}>{ipDisplay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "#8892b0" }}>Protocol</span>
                <span className="text-xs" style={{ color: "#ccd6f6", fontFamily: "var(--font-mono)" }}>OpenVPN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "#8892b0" }}>Encryption</span>
                <span className="text-xs" style={{ color: "#00d4ff", fontFamily: "var(--font-mono)" }}>AES-256</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: "#8892b0" }}>Server</span>
                <span className="text-xs" style={{ color: "#ccd6f6", fontFamily: "var(--font-mono)" }}>{connectionStatus === "connected" ? "DE-Frankfurt-01" : "--"}</span>
              </div>
            </div>
            {connectionStatus === "connected" && (
              <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
                <p className="text-xs text-center" style={{ color: "#10b981" }}>✓ Connection Secured</p>
              </div>
            )}
          </GlassCard>

          {/* World Map Visualization */}
          <GlassCard className="md:col-span-2 p-6 relative overflow-hidden">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8892b0", fontFamily: "var(--font-mono)" }}>Global Server Network</p>
            <div className="relative h-40 md:h-48">
              {/* SVG world map representation */}
              <svg viewBox="0 0 800 400" className="w-full h-full" style={{ opacity: 0.4 }}>
                {/* Simplified world continents */}
                <ellipse cx="120" cy="160" rx="80" ry="60" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                <ellipse cx="250" cy="140" rx="120" ry="80" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                <ellipse cx="450" cy="130" rx="80" ry="60" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                <ellipse cx="560" cy="160" rx="40" ry="30" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                <ellipse cx="650" cy="140" rx="60" ry="50" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                <ellipse cx="700" cy="250" rx="40" ry="50" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
                <ellipse cx="200" cy="250" rx="50" ry="70" fill="none" stroke="#00d4ff" strokeWidth="1" opacity="0.5" />
              </svg>
              {/* Server dots */}
              {[
                { x: "15%", y: "40%", label: "New York" },
                { x: "32%", y: "30%", label: "London" },
                { x: "55%", y: "35%", label: "Frankfurt" },
                { x: "70%", y: "40%", label: "Singapore" },
                { x: "82%", y: "35%", label: "Tokyo" },
                { x: "25%", y: "65%", label: "São Paulo" },
                { x: "62%", y: "65%", label: "Sydney" },
              ].map(({ x, y, label }) => (
                <div key={label} className="absolute group" style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}>
                  <div className="w-3 h-3 rounded-full cursor-pointer relative" style={{ background: "#00d4ff", boxShadow: "0 0 8px #00d4ff, 0 0 20px rgba(0,212,255,0.4)", animation: "pulse 2s infinite" }}>
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(0,212,255,0.3)" }} />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none" style={{ background: "#0d1021", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)", fontFamily: "var(--font-mono)" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Stats */}
        <div className="w-full max-w-3xl mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ value, label, icon }) => (
            <div key={label} className="text-center p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.08)" }}>
              <div className="flex justify-center mb-2" style={{ color: "#00d4ff" }}>{icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#8892b0" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featuresRef} className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)", fontFamily: "var(--font-mono)" }}>FEATURES</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
              Built for Maximum{" "}
              <span style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Security</span>
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#8892b0" }}>Every feature engineered to protect your digital identity and keep your data safe.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc, color }) => (
              <GlassCard
                key={title}
                className="p-6 group cursor-default transition-all duration-300"
                style={{ transition: "transform 0.3s, box-shadow 0.3s" }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}
                >
                  {icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#e8eaf6", marginBottom: "0.5rem" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8892b0" }}>{desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} className="relative px-6 py-24" style={{ zIndex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.3)", fontFamily: "var(--font-mono)" }}>PRICING</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
              Simple,{" "}
              <span style={{ background: "linear-gradient(135deg,#7c3aed,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Transparent</span>{" "}
              Pricing
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#8892b0" }}>No hidden fees. Cancel anytime. 30-day money-back guarantee.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map(({ name, price, period, features: planFeatures, highlighted, cta, badge }) => (
              <div
                key={name}
                className="rounded-2xl p-8 relative transition-all duration-300"
                style={{
                  background: highlighted
                    ? "linear-gradient(135deg,rgba(0,212,255,0.12),rgba(124,58,237,0.12))"
                    : "rgba(255,255,255,0.04)",
                  border: highlighted ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  transform: highlighted ? "scale(1.03)" : "scale(1)",
                  boxShadow: highlighted ? "0 0 60px rgba(0,212,255,0.12)" : "none",
                }}
              >
                {badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold" style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)", color: "#06070f" }}>
                    {badge}
                  </div>
                )}
                <div className="mb-2 flex items-center gap-2">
                  <Star size={14} style={{ color: highlighted ? "#00d4ff" : "#8892b0" }} />
                  <span className="text-xs uppercase tracking-widest" style={{ color: highlighted ? "#00d4ff" : "#8892b0", fontFamily: "var(--font-mono)" }}>{name}</span>
                </div>
                <div className="mb-6">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 700, color: "#fff" }}>{price}</span>
                  <span style={{ color: "#8892b0", fontSize: "0.875rem" }}>{period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {planFeatures.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm" style={{ color: "#ccd6f6" }}>
                      <Check size={16} style={{ color: highlighted ? "#00d4ff" : "#10b981", flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate("signup")}
                  className="w-full py-3 rounded-xl transition-all duration-200"
                  style={highlighted
                    ? { background: "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700 }
                    : { border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", fontWeight: 600 }
                  }
                  onMouseEnter={e => { if (!highlighted) e.currentTarget.style.background = "rgba(0,212,255,0.1)"; }}
                  onMouseLeave={e => { if (!highlighted) e.currentTarget.style.background = "transparent"; }}
                >
                  {cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
