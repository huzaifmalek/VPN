import { ArrowLeft, Shield } from "lucide-react";

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

const sections = [
  {
    num: "01",
    title: "Acceptance of Terms",
    content: `By accessing or using NexusVPN services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services. We reserve the right to update these terms at any time, and your continued use of the service constitutes acceptance of the updated terms.`,
  },
  {
    num: "02",
    title: "User Accounts",
    content: `You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. Each account is for individual use only — sharing accounts is prohibited. You must provide accurate and complete information when creating your account and keep it updated.`,
  },
  {
    num: "03",
    title: "VPN Service Usage",
    content: `NexusVPN grants you a non-exclusive, non-transferable right to use our VPN services for lawful purposes only. You agree not to use the service to engage in any illegal activities, violate third-party rights, distribute malware, conduct unauthorized access to systems, or engage in any activity that could harm our infrastructure or other users.`,
  },
  {
    num: "04",
    title: "Privacy Policy",
    content: `We are committed to protecting your privacy. Our privacy practices are governed by our separate Privacy Policy. We collect minimal data necessary to provide the service, including account information and anonymized diagnostic data. We do not sell your personal information to third parties under any circumstances.`,
  },
  {
    num: "05",
    title: "No Logs Policy",
    content: `NexusVPN maintains a strict zero-logs policy. We do not record your VPN browsing activity, connection logs, IP addresses assigned, original IP addresses, connection timestamps, session duration, DNS queries, or traffic data. Our no-logs policy has been independently audited by third-party security firms.`,
  },
  {
    num: "06",
    title: "Payment Terms",
    content: `Subscription fees are billed in advance on a monthly or annual basis. All fees are in Indian Rupees (INR) unless otherwise stated. We accept major credit/debit cards, UPI, and net banking. Prices may change with 30 days' notice. Taxes applicable under Indian law will be added to the subscription price.`,
  },
  {
    num: "07",
    title: "Refund Policy",
    content: `We offer a 30-day money-back guarantee for new subscribers. Refund requests must be submitted within 30 days of the initial purchase. Refunds are not available for renewals or promotional pricing plans. To request a refund, contact our support team with your account email and reason for cancellation.`,
  },
  {
    num: "08",
    title: "Prohibited Activities",
    content: `Users are strictly prohibited from: accessing child exploitation material, conducting DDoS attacks, distributing spam, engaging in phishing schemes, accessing systems without authorization, circumventing export restrictions, violating intellectual property rights, or using the VPN to facilitate any criminal activity under Indian or international law.`,
  },
  {
    num: "09",
    title: "Service Availability",
    content: `We strive to maintain 99.99% uptime. However, we do not guarantee uninterrupted service. Scheduled maintenance will be announced 24 hours in advance. We are not liable for service interruptions caused by factors beyond our control, including natural disasters, government-mandated restrictions, or internet infrastructure failures.`,
  },
  {
    num: "10",
    title: "Limitation of Liability",
    content: `NexusVPN's liability is limited to the amount paid by you in the 12 months preceding the claim. We are not liable for indirect, incidental, special, or consequential damages. We do not warrant that the service is error-free, uninterrupted, or completely secure. Use the service at your own risk.`,
  },
  {
    num: "11",
    title: "Account Suspension",
    content: `We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, generate excessive network load, or whose associated payment is declined. We will provide notice where legally required and where it would not compromise security or legal investigations.`,
  },
  {
    num: "12",
    title: "Termination",
    content: `You may cancel your subscription at any time through your account settings. Upon termination, your access to the service will continue until the end of the current billing period. We may terminate accounts with 30 days' notice for business reasons. Upon termination, we will delete your account data in accordance with our Privacy Policy.`,
  },
  {
    num: "13",
    title: "Changes to Terms",
    content: `We reserve the right to modify these Terms and Conditions at any time. Material changes will be communicated via email to your registered address at least 30 days before they take effect. Minor changes may take effect immediately. Your continued use of the service after changes constitutes acceptance.`,
  },
  {
    num: "14",
    title: "Contact Information",
    content: `For questions regarding these Terms and Conditions, please contact us at: legal@nexusvpn.com. For privacy-related inquiries: privacy@nexusvpn.com. For technical support: support@nexusvpn.com. Our registered address: NexusVPN Technologies Pvt. Ltd., Bengaluru, Karnataka, India — 560001.`,
  },
];

export function TermsPage({ onNavigate }: TermsPageProps) {
  return (
    <div style={{ background: "#06070f", minHeight: "100vh", paddingTop: "5rem" }}>
      <div className="fixed inset-0 pointer-events-none">
        <div style={{ position: "absolute", top: 0, left: "20%", width: "40%", height: "30%", background: "radial-gradient(ellipse,rgba(0,212,255,0.05) 0%,transparent 70%)" }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-14" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 mb-8 text-sm transition-colors"
            style={{ color: "#8892b0" }}
            onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
            onMouseLeave={e => e.currentTarget.style.color = "#8892b0"}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00d4ff,#7c3aed)" }}>
              <Shield size={22} className="text-white" />
            </div>
            <div className="text-xs uppercase tracking-widest" style={{ color: "#00d4ff", fontFamily: "var(--font-mono)" }}>NexusVPN Legal</div>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#8892b0" }}>Last updated: June 11, 2026 · Effective: June 11, 2026</p>
          <div className="mt-6 p-4 rounded-xl text-sm" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", color: "#8892b0" }}>
            Please read these Terms and Conditions carefully before using NexusVPN. By using our service, you agree to all terms below.
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map(({ num, title, content }) => (
            <div
              key={num}
              className="p-6 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,212,255,0.08)" }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 text-xs pt-0.5" style={{ color: "#00d4ff", fontFamily: "var(--font-mono)", fontWeight: 600, minWidth: "2rem" }}>
                  {num}
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#e8eaf6", marginBottom: "0.75rem" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8892b0" }}>{content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate("home")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm transition-all duration-200"
            style={{ background: "linear-gradient(135deg,#00d4ff,#0ea5e9)", color: "#06070f", fontWeight: 700 }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,212,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <p className="mt-6 text-xs" style={{ color: "#8892b0" }}>© 2026 NexusVPN Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
