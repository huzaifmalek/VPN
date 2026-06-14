import { useState } from "react";
import { Shield, Eye, EyeOff, Lock, Mail, User, Phone, AlertCircle, Check } from "lucide-react";

interface SignupPageProps {
  onNavigate: (page: string) => void;
}

export function SignupPage({ onNavigate }: SignupPageProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.phone && form.phone.length < 10) e.phone = "Enter a valid phone number";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!agreed) e.agreed = "Please agree to terms & conditions";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onNavigate("login"), 2000);
    }, 1500);
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(prev => { const n = { ...prev }; delete n[k]; return n; });
  };

  if (success) {
    return (
      <div style={{ background: "#06070f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(16,185,129,0.15)", border: "2px solid #10b981" }}>
            <Check size={36} style={{ color: "#10b981" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>Account Created!</h2>
          <p className="mt-3" style={{ color: "#8892b0" }}>Redirecting to login page…</p>
        </div>
      </div>
    );
  }

  const Field = ({ label, name, type = "text", icon, placeholder, extra }: {
    label: string; name: string; type?: string; icon: React.ReactNode; placeholder: string; extra?: React.ReactNode;
  }) => (
    <div>
      <label className="block text-sm mb-1.5" style={{ color: "#8892b0" }}>{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }}>{icon}</span>
        <input
          type={type}
          value={form[name as keyof typeof form]}
          onChange={set(name)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
          style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${errors[name] ? "rgba(239,68,68,0.5)" : "rgba(0,212,255,0.15)"}`, color: "#e8eaf6" }}
          onFocus={e => { if (!errors[name]) e.currentTarget.style.borderColor = "#00d4ff"; }}
          onBlur={e => { if (!errors[name]) e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"; }}
        />
        {extra}
      </div>
      {errors[name] && <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>{errors[name]}</p>}
    </div>
  );

  return (
    <div style={{ background: "#06070f", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 1.5rem 2rem" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "40%", height: "40%", background: "radial-gradient(ellipse,rgba(124,58,237,0.07) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "35%", height: "35%", background: "radial-gradient(ellipse,rgba(0,212,255,0.06) 0%,transparent 70%)" }} />
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
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>Create Account</h1>
          <p className="mt-2 text-sm" style={{ color: "#8892b0" }}>Join millions protecting their privacy</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(30px)", borderRadius: "1.25rem", padding: "2rem" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full Name" name="name" icon={<User size={16} />} placeholder="John Doe" />
            <Field label="Email Address" name="email" type="email" icon={<Mail size={16} />} placeholder="you@example.com" />
            <Field label="Phone Number" name="phone" type="tel" icon={<Phone size={16} />} placeholder="+91 98765 43210" />
            <Field
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              icon={<Lock size={16} />}
              placeholder="Min. 6 characters"
              extra={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
            <Field
              label="Confirm Password"
              name="confirm"
              type={showConfirm ? "text" : "password"}
              icon={<Lock size={16} />}
              placeholder="Repeat password"
              extra={
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <button
                  type="button"
                  onClick={() => { setAgreed(!agreed); if (errors.agreed) setErrors(p => { const n = { ...p }; delete n.agreed; return n; }); }}
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                  style={{ border: `1px solid ${agreed ? "#00d4ff" : errors.agreed ? "rgba(239,68,68,0.5)" : "rgba(0,212,255,0.3)"}`, background: agreed ? "rgba(0,212,255,0.2)" : "transparent" }}
                >
                  {agreed && <Check size={12} style={{ color: "#00d4ff" }} />}
                </button>
                <span className="text-sm" style={{ color: "#8892b0" }}>
                  I agree to the{" "}
                  <button type="button" onClick={() => onNavigate("terms")} style={{ color: "#00d4ff" }}>Terms & Conditions</button>
                  {" "}and Privacy Policy
                </span>
              </label>
              {errors.agreed && <p className="mt-1 text-xs" style={{ color: "#ef4444" }}>{errors.agreed}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm transition-all duration-200 mt-2"
              style={{ background: loading ? "rgba(0,212,255,0.5)" : "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Creating Account…" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: "#8892b0" }}>
              Already have an account?{" "}
              <button onClick={() => onNavigate("login")} style={{ color: "#00d4ff", fontWeight: 600 }}>Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
