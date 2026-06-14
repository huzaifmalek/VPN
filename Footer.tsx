import { Shield, Facebook, Instagram, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{ background: "#030309", borderTop: "1px solid rgba(0,212,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)" }}>
                <Shield size={18} className="text-white" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", letterSpacing: "0.05em", color: "#fff" }}>
                NEXUS<span style={{ color: "#00d4ff" }}>VPN</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#8892b0" }}>
              Military-grade encryption protecting millions of users worldwide. Your privacy is our mission.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: <Facebook size={18} />, label: "Facebook" },
                { icon: <Instagram size={18} />, label: "Instagram" },
                { icon: <XIcon />, label: "X" },
                { icon: <Linkedin size={18} />, label: "LinkedIn" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ border: "1px solid rgba(0,212,255,0.2)", color: "#8892b0" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff"; e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.background = "rgba(0,212,255,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; e.currentTarget.style.color = "#8892b0"; e.currentTarget.style.background = "transparent"; }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm mb-4" style={{ color: "#00d4ff", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Navigation</p>
            {[
              { label: "Home", page: "home" },
              { label: "Features", page: "home" },
              { label: "Pricing", page: "home" },
              { label: "Servers", page: "servers" },
              { label: "Contact Us", page: "contact" },
            ].map(({ label, page }) => (
              <button key={label} onClick={() => onNavigate(page)} className="block text-sm mb-2 text-left transition-colors duration-200" style={{ color: "#8892b0" }}
                onMouseEnter={e => e.currentTarget.style.color = "#ccd6f6"}
                onMouseLeave={e => e.currentTarget.style.color = "#8892b0"}>
                {label}
              </button>
            ))}
          </div>

          <div>
            <p className="text-sm mb-4" style={{ color: "#00d4ff", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Account</p>
            {[
              { label: "Login", page: "login" },
              { label: "Sign Up", page: "signup" },
              { label: "Dashboard", page: "dashboard" },
              { label: "Terms & Conditions", page: "terms" },
            ].map(({ label, page }) => (
              <button key={label} onClick={() => onNavigate(page)} className="block text-sm mb-2 text-left transition-colors duration-200" style={{ color: "#8892b0" }}
                onMouseEnter={e => e.currentTarget.style.color = "#ccd6f6"}
                onMouseLeave={e => e.currentTarget.style.color = "#8892b0"}>
                {label}
              </button>
            ))}
          </div>

          <div>
            <p className="text-sm mb-4" style={{ color: "#00d4ff", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Security</p>
            <div className="space-y-3">
              {["AES-256 Encryption", "No-Logs Policy", "Kill Switch", "DNS Leak Protection", "OpenVPN Protocol"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#8892b0" }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00d4ff" }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}>
          <p className="text-sm" style={{ color: "#8892b0" }}>© 2026 NexusVPN. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => onNavigate("terms")} className="text-sm transition-colors duration-200" style={{ color: "#8892b0" }}
              onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#8892b0"}>
              Terms & Conditions
            </button>
            <button className="text-sm transition-colors duration-200" style={{ color: "#8892b0" }}
              onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#8892b0"}>
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
