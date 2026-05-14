import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiMapPin, FiPhone, FiCheck, FiCalendar } from 'react-icons/fi';
import { portfolioData } from '@/data/portfolio';
import SocialLinks from '@/components/ui/SocialLinks';
import TimeZone from '@/components/ui/TimeZone';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { deviceType } = useDeviceDetect();
  const isMobile = deviceType === 'mobile';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Simulate API call — in production, point to your backend
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      // Fallback: store in localStorage for demo
      const stored = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      stored.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem('contact_messages', JSON.stringify(stored));
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const contactInfo = [
    { icon: <FiMail className="h-4 w-4" />, label: 'Email', value: portfolioData.email, href: `mailto:${portfolioData.email}` },
    { icon: <FiPhone className="h-4 w-4" />, label: 'Phone', value: portfolioData.phone, href: `tel:${portfolioData.phone}` },
    { icon: <FiMapPin className="h-4 w-4" />, label: 'Location', value: portfolioData.address },
  ];

  return (
    <section id="contact" className="relative py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5 text-xs font-medium tracking-wider text-neon-cyan uppercase">
            Get In Touch
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[var(--text-primary)] sm:text-4xl font-[Orbitron]">
            Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)] max-w-lg mx-auto">
            Interested in working together? Send me a message and I&apos;ll get back to you.
          </p>
        </motion.div>

        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-5'}`}>
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className={`glass-panel p-6 ${isMobile ? '' : 'col-span-3'}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-neon-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.05)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-neon-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.05)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-muted)]">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full resize-none rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all focus:border-neon-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.05)]"
                />
              </div>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all ${
                  status === 'sent'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : status === 'error'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-gradient-to-r from-neon-cyan/20 to-electric-purple/20 text-[var(--text-primary)] border border-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]'
                }`}
                whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                whileTap={status === 'idle' ? { scale: 0.99 } : {}}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      className="h-4 w-4 rounded-full border-2 border-neon-cyan/30 border-t-neon-cyan"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Sending...
                  </>
                ) : status === 'sent' ? (
                  <>
                    <FiCheck className="h-4 w-4" />
                    Message Sent!
                  </>
                ) : status === 'error' ? (
                  'Failed — try again'
                ) : (
                  <>
                    <FiSend className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Contact Info Sidebar */}
          <motion.div
            className={`flex flex-col gap-4 ${isMobile ? '' : 'col-span-2'}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Contact Info Card */}
            <div className="glass-panel p-6">
              <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Contact Info</h3>
              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--card-bg)] text-neon-cyan">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--text-muted)] uppercase">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-[var(--text-secondary)] transition-colors hover:text-neon-cyan"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[var(--text-secondary)]">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-panel p-6">
              <h3 className="mb-4 text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Quick Actions</h3>
              <div className="space-y-3">
                <motion.a
                  href={`mailto:${portfolioData.email}?subject=Hiring%20Inquiry`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-3 text-sm font-medium text-neon-cyan transition-colors hover:bg-neon-cyan/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiMail className="h-4 w-4" />
                  Hire Me
                </motion.a>
                <motion.a
                  href={`mailto:${portfolioData.email}?subject=Schedule%20a%20Call`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiCalendar className="h-4 w-4" />
                  Schedule Call
                </motion.a>
              </div>
            </div>

            {/* Time Zone */}
            <TimeZone />

            {/* Social Links */}
            <div className="glass-panel p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">Connect</span>
                <SocialLinks iconSize="sm" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
