import { useState } from "react";
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (email: string) => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email address."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
      onNavigate("dashboard");
    }, 1200);
  };

  return (
    <div style={{ background: "#06070f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 1.5rem 2rem" }}>
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "20%", left: "10%", width: "40%", height: "40%", background: "radial-gradient(ellipse,rgba(0,212,255,0.07) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "35%", height: "35%", background: "radial-gradient(ellipse,rgba(124,58,237,0.07) 0%,transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <button onClick={() => onNavigate("home")} className="inline-flex items-center gap-2 mb-6 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)" }}>
              <Shield size={22} className="text-white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "0.05em", color: "#fff" }}>
              NEXUS<span style={{ color: "#00d4ff" }}>VPN</span>
            </span>
          </button>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Welcome Back</h1>
          <p className="mt-2 text-sm" style={{ color: "#8892b0" }}>Sign in to your secure account</p>
        </div>

        {/* Card */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(30px)", borderRadius: "1.25rem", padding: "2rem" }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}>
                <AlertCircle size={16} />
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

            <div>
              <label className="block text-sm mb-1.5" style={{ color: "#8892b0" }}>Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", color: "#e8eaf6" }}
                  onFocus={e => e.currentTarget.style.borderColor = "#00d4ff"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={() => onNavigate("forgot")} className="text-sm transition-colors" style={{ color: "#00d4ff" }}
                onMouseEnter={e => e.currentTarget.style.color = "#38bdf8"}
                onMouseLeave={e => e.currentTarget.style.color = "#00d4ff"}>
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm transition-all duration-200"
              style={{ background: loading ? "rgba(0,212,255,0.5)" : "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "#8892b0" }}>
              Don't have an account?{" "}
              <button onClick={() => onNavigate("signup")} className="transition-colors" style={{ color: "#00d4ff", fontWeight: 600 }}
                onMouseEnter={e => e.currentTarget.style.color = "#38bdf8"}
                onMouseLeave={e => e.currentTarget.style.color = "#00d4ff"}>
                Create New Account
              </button>
            </p>
          </div>
        </div>

        {/* Security note */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <Lock size={12} style={{ color: "#8892b0" }} />
          <p className="text-xs" style={{ color: "#8892b0" }}>256-bit SSL encrypted login. Your data is safe.</p>
        </div>
      </div>
    </div>
  );
}
