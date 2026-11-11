import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiMapPin,
  FiPhone,
  FiCheck,
  FiCopy,
  FiSend,
  FiShield,
  FiExternalLink,
} from 'react-icons/fi';
import { portfolioData, socialLinks } from '@/data/portfolio';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);

  function copyText(text: string, type: 'email' | 'pgp') {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPgp(true);
      setTimeout(() => setCopiedPgp(false), 2000);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Basic sanitization
    const payload = {
      name: form.name.trim().slice(0, 100),
      email: form.email.trim().slice(0, 100),
      message: form.message.trim().slice(0, 2000),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      // Network failure or local static environment: graceful mailto fallback
      setStatus('error');
    }
  };

  function openMailClient() {
    const subject = encodeURIComponent(`Engineering Inquiry from ${form.name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Hello Rakib,\n\n${form.message || 'I would like to discuss an engineering role / security advisory.'}\n\nFrom: ${form.name} (${form.email})`
    );
    window.location.href = `mailto:${portfolioData.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      aria-label="Direct Contact & Engineering Inquiries"
      className="py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[var(--color-hairline)]"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3 pb-6 border-b border-[var(--color-hairline)]">
          <div className="telemetry-chip">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <span>INQUIRY_ROUTING // SECURE CHANNELS</span>
          </div>
          <h2 className="type-h1 text-[var(--color-ink)]">
            Initiate Direct Engineering Contact
          </h2>
          <p className="type-body text-[var(--color-ink-muted)] max-w-2xl">
            Direct channel for security advisory, software infrastructure inquiries, and technical roles. Messages are received directly by Rakib.
          </p>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (5 cols): Verified Channels & PGP Key */}
          <div className="lg:col-span-5 space-y-6">
            <div className="panel-surface p-6 rounded-[var(--radius-lg)] space-y-5">
              <div className="text-xs font-mono font-semibold text-[var(--color-accent)] uppercase">
                // DIRECT COMMUNICATIONS
              </div>

              {/* Primary Email with 1-click copy */}
              <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-hairline)] space-y-1.5">
                <span className="text-[11px] font-mono text-[var(--color-ink-faint)]">PRIMARY INBOX</span>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="text-xs font-mono font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors truncate pr-2"
                  >
                    {portfolioData.email}
                  </a>
                  <button
                    onClick={() => copyText(portfolioData.email, 'email')}
                    className="btn-base btn-sm btn-ghost px-2 text-xs font-mono shrink-0"
                    aria-label="Copy primary email"
                  >
                    {copiedEmail ? <FiCheck size={13} className="text-emerald-500" /> : <FiCopy size={13} />}
                  </button>
                </div>
              </div>

              {/* Secondary Backup Email */}
              <div className="p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-hairline)] space-y-1.5">
                <span className="text-[11px] font-mono text-[var(--color-ink-faint)]">BACKUP INBOX</span>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${portfolioData.secondaryEmail}`}
                    className="text-xs font-mono text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors truncate pr-2"
                  >
                    {portfolioData.secondaryEmail}
                  </a>
                </div>
              </div>

              {/* Location & Response Expectation */}
              <div className="space-y-2 pt-2 text-xs font-mono text-[var(--color-ink-muted)]">
                <div className="flex items-center gap-2">
                  <FiMapPin size={14} className="text-[var(--color-ink-faint)] shrink-0" />
                  <span>{portfolioData.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiPhone size={14} className="text-[var(--color-ink-faint)] shrink-0" />
                  <span>{portfolioData.phone}</span>
                </div>
              </div>

              {/* PGP Fingerprint Card */}
              <div className="pt-4 border-t border-[var(--color-hairline)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[var(--color-accent)] font-semibold">
                    <FiShield size={13} />
                    <span>PGP PUBLIC FINGERPRINT</span>
                  </span>
                  <button
                    onClick={() => copyText(portfolioData.pgpKeyId, 'pgp')}
                    className="text-[11px] font-mono text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]"
                  >
                    {copiedPgp ? 'COPIED' : 'COPY'}
                  </button>
                </div>
                <div className="p-2.5 rounded bg-[var(--color-canvas)] border border-[var(--color-hairline)] font-mono text-[11px] text-[var(--color-ink-faint)] select-all break-all">
                  {portfolioData.pgpKeyId}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Secure Form */}
          <div className="lg:col-span-7">
            <div className="panel-surface p-6 sm:p-8 rounded-[var(--radius-lg)] space-y-6">
              <div>
                <h3 className="type-h2 text-[var(--color-ink)]">
                  Transmit Message
                </h3>
                <p className="type-body text-xs text-[var(--color-ink-muted)] mt-1">
                  Enter your details below. For encrypted dispatches, reach out via ProtonMail.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[var(--color-ink-muted)]">
                      Your Name <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full h-11 px-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-hairline-strong)] text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-[var(--color-ink-muted)]">
                      Return Email Address <span className="text-[var(--color-accent)]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@organization.com"
                      className="w-full h-11 px-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-hairline-strong)] text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[var(--color-ink-muted)]">
                    Inquiry Brief / Scope <span className="text-[var(--color-accent)]">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe the opportunity, security advisory requirements, or project scope..."
                    className="w-full p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface-2)] border border-[var(--color-hairline-strong)] text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-faint)] focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                  />
                </div>

                {/* State Feedback */}
                {status === 'sent' && (
                  <div className="p-3.5 rounded-[var(--radius-md)] bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono flex items-center gap-2">
                    <FiCheck size={15} />
                    <span>Message dispatched successfully. A response will follow shortly.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3.5 rounded-[var(--radius-md)] bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-2">
                    <div className="text-amber-500 font-semibold">
                      API endpoint unavailable in current environment.
                    </div>
                    <button
                      type="button"
                      onClick={openMailClient}
                      className="btn-base btn-sm btn-secondary text-xs"
                    >
                      <FiMail size={13} />
                      <span>Click to Send via Your Email Client</span>
                    </button>
                  </div>
                )}

                {/* Submit Action (44px fixed height) */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-[var(--color-ink-faint)]">
                    RESPONSE TIME: &lt; 24 HOURS
                  </span>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-base btn-md btn-primary px-6"
                  >
                    {status === 'sending' ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <FiSend size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
