import { useState } from "react";
import { Shield, Mail, ArrowLeft, Check } from "lucide-react";

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div style={{ background: "#06070f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 1.5rem 2rem" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "40%", height: "40%", background: "radial-gradient(ellipse,rgba(124,58,237,0.07) 0%,transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <button onClick={() => onNavigate("home")} className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)" }}>
              <Shield size={22} className="text-white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "0.05em", color: "#fff" }}>
              NEXUS<span style={{ color: "#00d4ff" }}>VPN</span>
            </span>
          </button>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>Reset Password</h1>
          <p className="mt-2 text-sm" style={{ color: "#8892b0" }}>
            {sent ? "Check your inbox for the reset link." : "Enter your email and we'll send a reset link."}
          </p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(30px)", borderRadius: "1.25rem", padding: "2rem" }}>
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(16,185,129,0.15)", border: "2px solid #10b981" }}>
                <Check size={28} style={{ color: "#10b981" }} />
              </div>
              <p className="text-sm mb-6" style={{ color: "#8892b0" }}>Password reset email sent successfully.<br />Please check your inbox and spam folder.</p>
              <button
                onClick={() => onNavigate("login")}
                className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl text-sm transition-all"
                style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", fontWeight: 600 }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <ArrowLeft size={16} /> Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm mb-1.5" style={{ color: "#8892b0" }}>Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", color: "#e8eaf6" }}
                    onFocus={e => e.currentTarget.style.borderColor = "#00d4ff"}
                    onBlur={e => e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm transition-all duration-200"
                style={{ background: loading ? "rgba(0,212,255,0.5)" : "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="flex items-center gap-2 mx-auto text-sm transition-colors"
                style={{ color: "#8892b0" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
                onMouseLeave={e => e.currentTarget.style.color = "#8892b0"}
              >
                <ArrowLeft size={14} /> Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
