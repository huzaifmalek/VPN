import { useState } from "react";
import { Mail, MessageSquare, User, Tag, Send, Check, Shield } from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const inputStyle = (field: string) => ({
    background: "rgba(255,255,255,0.06)",
    border: `1px solid ${errors[field] ? "rgba(239,68,68,0.5)" : "rgba(0,212,255,0.15)"}`,
    borderRadius: "0.75rem",
    color: "#e8eaf6",
    width: "100%",
    outline: "none",
    fontSize: "0.875rem",
  });

  return (
    <div style={{ background: "#06070f", minHeight: "100vh", paddingTop: "5rem" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: "10%", right: "5%", width: "40%", height: "40%", background: "radial-gradient(ellipse,rgba(0,212,255,0.06) 0%,transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "35%", height: "35%", background: "radial-gradient(ellipse,rgba(124,58,237,0.07) 0%,transparent 70%)" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-14" style={{ zIndex: 1 }}>
        <div className="text-center mb-14">
          <div className="inline-block mb-4 px-3 py-1 rounded-full text-xs" style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)", fontFamily: "var(--font-mono)" }}>CONTACT US</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
            Get in{" "}
            <span style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span>
          </h1>
          <p className="mt-4 max-w-lg mx-auto" style={{ color: "#8892b0" }}>Have a question? Our support team is available 24/7 to help you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Cards */}
          <div className="space-y-4">
            {[
              { icon: <Mail size={22} />, title: "Email Support", desc: "support@nexusvpn.com", sub: "Response within 2 hours", color: "#00d4ff" },
              { icon: <MessageSquare size={22} />, title: "Live Chat", desc: "Available 24/7", sub: "Avg. response: 2 minutes", color: "#7c3aed" },
              { icon: <Shield size={22} />, title: "Security Issues", desc: "security@nexusvpn.com", sub: "Priority handling", color: "#10b981" },
            ].map(({ icon, title, desc, sub, color }) => (
              <div key={title} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}18`, color }}>
                  {icon}
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "#e8eaf6" }}>{title}</p>
                <p className="text-sm" style={{ color: "#00d4ff" }}>{desc}</p>
                <p className="text-xs mt-1" style={{ color: "#8892b0" }}>{sub}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,212,255,0.15)", backdropFilter: "blur(20px)", borderRadius: "1.25rem", padding: "2rem" }}>
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(16,185,129,0.15)", border: "2px solid #10b981" }}>
                    <Check size={36} style={{ color: "#10b981" }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>Message Sent!</h3>
                  <p style={{ color: "#8892b0" }}>Thank you for contacting us. Our team will respond shortly.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl text-sm transition-all"
                    style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(0,212,255,0.1)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#8892b0" }}>Full Name</label>
                      <div className="relative">
                        <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }} />
                        <input type="text" value={form.name} onChange={set("name")} placeholder="John Doe" style={inputStyle("name")} className="pl-10 pr-4 py-3"
                          onFocus={e => { if (!errors.name) e.currentTarget.style.borderColor = "#00d4ff"; }}
                          onBlur={e => { if (!errors.name) e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"; }} />
                      </div>
                      {errors.name && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm mb-1.5" style={{ color: "#8892b0" }}>Email Address</label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }} />
                        <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" style={inputStyle("email")} className="pl-10 pr-4 py-3"
                          onFocus={e => { if (!errors.email) e.currentTarget.style.borderColor = "#00d4ff"; }}
                          onBlur={e => { if (!errors.email) e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"; }} />
                      </div>
                      {errors.email && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#8892b0" }}>Subject</label>
                    <div className="relative">
                      <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8892b0" }} />
                      <input type="text" value={form.subject} onChange={set("subject")} placeholder="How can we help?" style={inputStyle("subject")} className="pl-10 pr-4 py-3"
                        onFocus={e => { if (!errors.subject) e.currentTarget.style.borderColor = "#00d4ff"; }}
                        onBlur={e => { if (!errors.subject) e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"; }} />
                    </div>
                    {errors.subject && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm mb-1.5" style={{ color: "#8892b0" }}>Message</label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Describe your issue or question in detail…"
                      rows={5}
                      style={{ ...inputStyle("message"), padding: "0.75rem 1rem", resize: "vertical" }}
                      onFocus={e => { if (!errors.message) e.currentTarget.style.borderColor = "#00d4ff"; }}
                      onBlur={e => { if (!errors.message) e.currentTarget.style.borderColor = "rgba(0,212,255,0.15)"; }}
                    />
                    {errors.message && <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm transition-all duration-200"
                    style={{ background: loading ? "rgba(0,212,255,0.5)" : "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    {loading ? "Sending…" : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
