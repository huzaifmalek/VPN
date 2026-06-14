import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onScrollTo: (section: string) => void;
}

export function Navbar({ currentPage, onNavigate, onScrollTo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", action: () => { onNavigate("home"); onScrollTo("home"); } },
    { label: "Features", action: () => { onNavigate("home"); onScrollTo("features"); } },
    { label: "Pricing", action: () => { onNavigate("home"); onScrollTo("pricing"); } },
    { label: "Servers", action: () => onNavigate("servers") },
    { label: "Contact Us", action: () => onNavigate("contact") },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(6,7,15,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)" }}>
            <Shield size={18} className="text-white" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "0.05em", color: "#fff" }}>
            NEXUS<span style={{ color: "#00d4ff" }}>VPN</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              className="text-sm transition-colors duration-200"
              style={{ color: "#8892b0", fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00d4ff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#8892b0")}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onNavigate("login")}
            className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
            style={{ color: "#00d4ff", border: "1px solid rgba(0,212,255,0.3)", fontWeight: 500 }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
          >
            Login
          </button>
          <button
            onClick={() => onNavigate("signup")}
            className="px-4 py-2 rounded-lg text-sm text-black transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#00d4ff,#0ea5e9)", fontWeight: 600 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 pt-2" style={{ background: "rgba(6,7,15,0.98)", borderTop: "1px solid rgba(0,212,255,0.12)" }}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => { link.action(); setMobileOpen(false); }}
                className="text-left text-sm py-2"
                style={{ color: "#ccd6f6" }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <button onClick={() => { onNavigate("login"); setMobileOpen(false); }} className="flex-1 py-2 rounded-lg text-sm" style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}>Login</button>
              <button onClick={() => { onNavigate("signup"); setMobileOpen(false); }} className="flex-1 py-2 rounded-lg text-sm text-black" style={{ background: "linear-gradient(135deg,#00d4ff,#0ea5e9)", fontWeight: 600 }}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
