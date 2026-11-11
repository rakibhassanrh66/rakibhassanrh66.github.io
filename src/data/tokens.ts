/**
 * DESIGN TOKENS — Single Source of Truth
 * Governing document: /DESIGN.md
 */

export const tokens = {
  colors: {
    dark: {
      canvas: '#090a0f',
      surface1: '#111319',
      surface2: '#181b24',
      surface3: '#222633',
      hairline: '#262a36',
      hairlineStrong: '#3d4457',
      ink: '#f8fafc',
      inkMuted: '#94a3b8',
      inkFaint: '#64748b',
      accent: '#38bdf8',
      accentHover: '#7dd3fc',
      accentSubtle: 'rgba(56, 189, 248, 0.08)',
    },
    light: {
      canvas: '#f8fafc',
      surface1: '#ffffff',
      surface2: '#f1f5f9',
      surface3: '#e2e8f0',
      hairline: '#e2e8f0',
      hairlineStrong: '#cbd5e1',
      ink: '#0f172a',
      inkMuted: '#475569',
      inkFaint: '#64748b',
      accent: '#0284c7',
      accentHover: '#0369a1',
      accentSubtle: 'rgba(2, 132, 199, 0.08)',
    },
  },
  typography: {
    fonts: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    },
    sizes: {
      display: 'clamp(2.25rem, 5vw + 1rem, 3.75rem)',
      h1: 'clamp(1.75rem, 3vw + 0.75rem, 2.5rem)',
      h2: 'clamp(1.25rem, 1.5vw + 0.75rem, 1.625rem)',
      body: 'clamp(1rem, 0.25vw + 0.95rem, 1.0625rem)',
      caption: 'clamp(0.8125rem, 0.1vw + 0.8rem, 0.875rem)',
    },
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '14px',
    full: '9999px',
  },
  buttons: {
    heights: {
      sm: '36px',
      md: '44px',
      lg: '52px',
    },
    paddingX: {
      sm: '14px',
      md: '18px',
      lg: '24px',
    },
    iconSizes: {
      sm: 14,
      md: 16,
      lg: 18,
    },
  },
  motion: {
    durations: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms',
    },
    easing: 'cubic-bezier(0.2, 0.0, 0.0, 1.0)',
  },
} as const;
