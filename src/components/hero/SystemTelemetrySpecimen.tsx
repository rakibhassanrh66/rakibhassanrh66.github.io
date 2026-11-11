import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiShield, FiCpu, FiCheck, FiCopy } from 'react-icons/fi';
import { portfolioData } from '@/data/portfolio';

export const SystemTelemetrySpecimen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'threat' | 'telemetry'>('architecture');
  const [copied, setCopied] = useState(false);

  const specimenContent = {
    architecture: {
      title: 'ACCESSX // C2 & TUNNEL ARCHITECTURE',
      code: `[1] client_init() -> TLSv1.3 tunnel
[2] hmac_verify(session_token, SHA256)
[3] sandbox_boundary: ISOLATED (cgroups v2)
[4] active_sockets: 127.0.0.1:443 -> reverse proxy
[5] payload_integrity: 0x4A8F... VERIFIED`,
      meta: 'PROTOCOL: ENCRYPTED REVERSE PROXY // ZERO-TRUST',
    },
    threat: {
      title: 'STRIDE // MITIGATION MATRIX',
      code: `• Spoofing    -> Ephemeral Ed25519 handshake
• Tampering   -> HMAC-SHA256 payload envelopes
• Repudiation -> Immutable local append-only log
• Info Leak   -> Memory wipe on socket termination
• Denial-Svc  -> Token-bucket rate limiter: 60/min
• Elev-Priv   -> Capability bounding (CAP_NET_BIND)`,
      meta: 'AUDIT STANDARD: STRIDE / OWASP ASVS v4.0',
    },
    telemetry: {
      title: 'RUNTIME TELEMETRY // SYSTEM STATE',
      code: `HOST: arch-linux-x86_64 // KERNEL 6.12-LTS
PGP_ID: ${portfolioData.pgpKeyId}
LOCATION: ${portfolioData.location} [UTC+6]
INTEGRITY: SHA-256 CHECK PASS
STATUS: READY FOR SELECT ADVISORY / ENG`,
      meta: 'OPERATIONAL STATUS: NOMINAL // ALL ENCLAVES SECURE',
    },
  };

  const current = specimenContent[activeTab];

  function copyCode() {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full max-w-lg rounded-[var(--radius-lg)] border border-[var(--color-hairline-strong)] bg-[var(--color-surface-1)] shadow-2xl overflow-hidden font-mono text-xs">
      {/* Specimen Header & Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-hairline)] bg-[var(--color-surface-2)]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[11px] font-semibold text-[var(--color-ink-muted)]">
            sys-enclave.telemetry
          </span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-[var(--color-ink-faint)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface-3)] transition-colors"
          aria-label="Copy terminal snippet"
        >
          {copied ? <FiCheck size={12} className="text-emerald-500" /> : <FiCopy size={12} />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-hairline)] bg-[var(--color-surface-1)] text-[11px]">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex-1 py-2 px-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'architecture'
              ? 'border-[var(--color-accent)] text-[var(--color-ink)] font-semibold bg-[var(--color-surface-2)]'
              : 'border-transparent text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]'
          }`}
        >
          <FiTerminal size={12} />
          <span>Architecture</span>
        </button>
        <button
          onClick={() => setActiveTab('threat')}
          className={`flex-1 py-2 px-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'threat'
              ? 'border-[var(--color-accent)] text-[var(--color-ink)] font-semibold bg-[var(--color-surface-2)]'
              : 'border-transparent text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]'
          }`}
        >
          <FiShield size={12} />
          <span>Threat Model</span>
        </button>
        <button
          onClick={() => setActiveTab('telemetry')}
          className={`flex-1 py-2 px-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
            activeTab === 'telemetry'
              ? 'border-[var(--color-accent)] text-[var(--color-ink)] font-semibold bg-[var(--color-surface-2)]'
              : 'border-transparent text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]'
          }`}
        >
          <FiCpu size={12} />
          <span>Telemetry</span>
        </button>
      </div>

      {/* Specimen Output Body */}
      <div className="p-4 sm:p-5 space-y-3 min-h-[170px] bg-[var(--color-canvas)]">
        <div className="text-[10px] text-[var(--color-accent)] font-semibold tracking-wider">
          {current.title}
        </div>
        <AnimatePresence mode="wait">
          <motion.pre
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="text-[12px] sm:text-[13px] leading-relaxed text-[var(--color-ink)] whitespace-pre-wrap font-mono"
          >
            {current.code}
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Specimen Status Footer */}
      <div className="px-4 py-2 border-t border-[var(--color-hairline)] bg-[var(--color-surface-2)] flex items-center justify-between text-[10px] text-[var(--color-ink-faint)]">
        <span className="truncate">{current.meta}</span>
        <span className="flex items-center gap-1.5 text-emerald-500 font-semibold shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ONLINE
        </span>
      </div>
    </div>
  );
};
