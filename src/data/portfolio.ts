export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  architectureOverview: string;
  threatModelNotes?: string;
  techStack: string[];
  category: 'security' | 'systems' | 'ai' | 'research';
  githubUrl: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  description: string;
  skills: { name: string; tag: string }[];
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  summary: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  highlights: string[];
}

export const portfolioData = {
  name: 'Rakib Hassan',
  monogram: 'RH',
  role: 'Cybersecurity Engineer & Systems Architect',
  headline: 'Engineering resilient systems, offensive security tooling, and verified software infrastructure.',
  tagline: 'Defensive architecture through offensive research. CSE graduate specializing in network defense, Linux internals, and applied systems engineering.',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  email: 'rakibhassan.rh66@protonmail.com',
  secondaryEmail: 'rakibhassan.rh66@gmail.com',
  phone: '+880 1533996681',
  address: 'Mirpur, Dhaka, Bangladesh',
  cvUrl: '/Rakib_Hassan_CV.pdf',
  pgpKeyId: '4A8F 9C21 88E0 11B4',
  availability: 'Available for Security Engineering & Systems Roles',
  summary:
    'Cybersecurity engineer with a strong foundation in systems programming, penetration testing, and infrastructure hardening. Practical experience in Linux server administration, access control architectures, and threat modeling paired with cross-platform application engineering.',
};

export const projects: Project[] = [
  {
    id: 'accessx',
    title: 'AccessX',
    tagline: 'Cyber Reconnaissance & Phishing Simulation Engine',
    description:
      'Controlled red-team simulation platform with automated credential-harvest analysis, device telemetry inspection, and encrypted tunnel orchestration.',
    longDescription:
      'Engineered an offensive security testing suite designed for red-team reconnaissance exercises. Features secure payload encapsulation, hardware feature telemetry tracking (camera/microphone authorization verification), Wi-Fi deauthentication analysis, and multi-endpoint tunnel management.',
    architectureOverview:
      'Self-hosted command & control agent communicating over encrypted reverse proxies. Isolates audit payloads in sandboxed runtimes to prevent lateral traversal during adversary simulations.',
    threatModelNotes:
      'Built around STRIDE methodology. Mitigates telemetry spoofing via HMAC payload signatures; implements ephemeral session tokens for tunnel teardown.',
    techStack: ['Python', 'Linux Socket API', 'Encrypted Tunneling', 'Web Security', 'Reverse Proxy'],
    category: 'security',
    githubUrl: 'https://github.com/rakibhassanrh66/AccessX',
    featured: true,
    stats: [
      { label: 'Security Model', value: 'Zero-Trust Sandboxed' },
      { label: 'Tunnel Protocol', value: 'TLS / Encrypted SOCKS' },
      { label: 'Role', value: 'Offensive Security Lead' },
    ],
  },
  {
    id: 'afos',
    title: 'AFOS — All Facilities One System',
    tagline: 'Unified Enterprise Facility Management & IoT Core',
    description:
      'Centralized facility orchestration architecture connecting access control nodes, telemetry sensors, and operational staff workflows.',
    longDescription:
      'Designed and developed a multi-tenant facility control interface built with Dart and modern cross-platform architecture. Handles physical access checkpoint logs, automated work orders, environmental sensor aggregation, and real-time incident routing.',
    architectureOverview:
      'Event-driven reactive state pipeline with offline-first synchronization. Connects edge hardware gateway endpoints to administrative management dashboards.',
    threatModelNotes:
      'Role-based granular access control (RBAC) enforcing least-privilege principle across physical facility zones; audited against unauthorized escalation paths.',
    techStack: ['Dart', 'Flutter Engine', 'RESTful API', 'SQLite / State Sync', 'Hardware Integration'],
    category: 'systems',
    githubUrl: 'https://github.com/rakibhassanrh66/AFOS',
    featured: true,
    stats: [
      { label: 'Architecture', value: 'Offline-First Reactive' },
      { label: 'Sync Latency', value: '< 80ms Edge Sync' },
      { label: 'Target Platforms', value: 'Desktop, Android, Web' },
    ],
  },
  {
    id: 'markitdown-flutter',
    title: 'MarkItDown Flutter',
    tagline: 'High-Performance Offline Document-to-Markdown Pipeline',
    description:
      'Cross-platform desktop & mobile document parsing engine. Pure-Dart reimplementation of Microsoft MarkItDown for zero-dependency local text extraction.',
    longDescription:
      'Re-architected document AST extraction pipelines to operate 100% locally on user devices without sending sensitive company documents to external cloud APIs. Converts PDF, DOCX, XLSX, and presentation files into clean CommonMark-compliant Markdown.',
    architectureOverview:
      'Streaming parser architecture that processes binary file chunks with minimal memory overhead, eliminating buffer overflow risks and data leaks.',
    threatModelNotes:
      'Air-gapped operation guarantee. Strict sandbox bounds prevent local file traversal; zero network sockets opened during conversion passes.',
    techStack: ['Dart', 'Flutter', 'Binary Parsing', 'AST Extraction', 'CommonMark'],
    category: 'systems',
    githubUrl: 'https://github.com/rakibhassanrh66/markitdown-flutter',
    featured: true,
    stats: [
      { label: 'Privacy', value: '100% Air-Gapped' },
      { label: 'Supported Formats', value: 'PDF, DOCX, XLSX' },
      { label: 'Engine', value: 'Pure Dart / Zero Deps' },
    ],
  },
  {
    id: 'vehicle-detection',
    title: 'Traffic AI & Vehicle Detection System',
    tagline: 'Real-Time Edge Computer Vision Pipeline',
    description:
      'Computer vision pipeline deploying Ultralytics YOLOv8 paired with graph search algorithms (BFS, DFS, Uniform Cost Search) for traffic density analysis.',
    longDescription:
      'Trained and evaluated custom object detection weights for multi-class vehicle identification across real-time video feeds. Integrated graph search algorithms to compute optimal path trajectories and detect congestion anomalies across monitored road segments.',
    architectureOverview:
      'Asynchronous frame decoding pipeline feeding tensor batches into CUDA/MPS accelerated YOLOv8 runtimes, outputting structured JSON metrics at 30+ FPS.',
    threatModelNotes:
      'Stream verification protects against camera injection attacks by validating RTSP digest authentication and frame sequence hashes.',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'PyTorch', 'Graph Algorithms'],
    category: 'ai',
    githubUrl: 'https://github.com/rakibhassanrh66/Vehicle-Detector-AI-',
    featured: false,
    stats: [
      { label: 'Inference Speed', value: '~14ms / frame' },
      { label: 'Precision (mAP50)', value: '0.89' },
      { label: 'Model', value: 'YOLOv8 Custom Trained' },
    ],
  },
  {
    id: 'airport-management',
    title: 'Airport Entrance Management System',
    tagline: 'Secure Passenger Manifest & Checkpoint Terminal',
    description:
      'Role-based passenger credential verification and checkpoint terminal system engineered with Java and relational data persistence.',
    longDescription:
      'Designed an operations terminal enforcing multi-level authority verification for terminal gates. Manages passenger manifest auditing, security clearance logging, baggage tracking states, and real-time flight boarding clearance.',
    architectureOverview:
      'Model-View-Controller architecture backed by normalized relational schemas with transactional consistency for passenger checkpoint state transitions.',
    threatModelNotes:
      'Enforces strict non-repudiation logging with immutable audit trails. Parameterized query sanitization eliminates SQL injection risks.',
    techStack: ['Java', 'JavaFX', 'MySQL', 'RBAC Security', 'Audit Logging'],
    category: 'systems',
    githubUrl: 'https://github.com/rakibhassanrh66/Airport-Entrance-Management-System',
    featured: false,
    stats: [
      { label: 'Access Control', value: 'Multi-Role RBAC' },
      { label: 'Integrity', value: 'ACID Transactional' },
      { label: 'Platform', value: 'Workstation Terminal' },
    ],
  },
  {
    id: 'deforestation-satellite',
    title: 'Geospatial Deforestation Analysis',
    tagline: '25-Year Remote Sensing & NDVI Satellite Intelligence',
    description:
      'Longitudinal satellite analysis processing 25 years of Landsat imagery via Google Earth Engine to compute vegetation loss indices across Bangladesh.',
    longDescription:
      'Processed massive multispectral satellite datasets spanning 2000 to 2025. Applied Normalized Difference Vegetation Index (NDVI) calculus and cloud masking algorithms in Python and GEE to quantify forest canopy regression across vulnerable biomes.',
    architectureOverview:
      'Cloud compute pipelines orchestrating Earth Engine raster reducers and geospatial polygon masking for high-throughput temporal data generation.',
    techStack: ['Python', 'Google Earth Engine', 'Landsat 7/8/9', 'NDVI Analysis', 'geemap'],
    category: 'research',
    githubUrl:
      'https://github.com/rakibhassanrh66/Deforestation-Analysis-in-Bangladesh-Using-Satellite-Imagery-2000-2025-with-NDVI-and-Landsat-Data',
    featured: false,
    stats: [
      { label: 'Time Horizon', value: '25 Years (2000-2025)' },
      { label: 'Resolution', value: '30m Multi-spectral' },
      { label: 'Data Source', value: 'USGS / NASA Landsat' },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Offensive & Defensive Security',
    description: 'System hardening, penetration testing workflows, and incident response architecture.',
    skills: [
      { name: 'Linux Server Administration (Debian/Arch)', tag: 'Core' },
      { name: 'Network Protocol Defense & PCAP Analysis', tag: 'Network' },
      { name: 'Role-Based Access Control (RBAC)', tag: 'IAM' },
      { name: 'Penetration Testing & Red-Teaming', tag: 'Offensive' },
      { name: 'Incident Mitigation & Threat Modeling', tag: 'Security' },
      { name: 'Sandboxing & Secure Tunneling', tag: 'Infra' },
    ],
  },
  {
    category: 'Systems & Backend Engineering',
    description: 'High-reliability server systems, API design, and data persistence models.',
    skills: [
      { name: 'Python (Django, FastAPI, CLI)', tag: 'Backend' },
      { name: 'Dart / Flutter Engine (Desktop & Mobile)', tag: 'Cross-Platform' },
      { name: 'Java (Systems Programming & Enterprise)', tag: 'Backend' },
      { name: 'Relational Schemas (PostgreSQL, MySQL)', tag: 'Database' },
      { name: 'RESTful API Architecture & Webhooks', tag: 'APIs' },
      { name: 'C / C++ Foundations & Memory Safety', tag: 'Systems' },
    ],
  },
  {
    category: 'Applied Intelligence & Tools',
    description: 'Computer vision, remote sensing pipelines, and developer operations.',
    skills: [
      { name: 'YOLOv8 & Computer Vision (OpenCV)', tag: 'AI' },
      { name: 'Google Earth Engine & Geospatial Analytics', tag: 'Remote Sensing' },
      { name: 'Quantum Circuit Modeling (Qiskit)', tag: 'Research' },
      { name: 'Git / GitHub CI & Workflow Automation', tag: 'DevOps' },
      { name: 'VS Code & Android Studio Toolchains', tag: 'Tooling' },
      { name: 'Cryptographic Primitives & PGP', tag: 'Crypto' },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'Backend Developer (Associate)',
    organization: 'BRAC IT (Contract)',
    location: 'Dhaka, Bangladesh (Remote)',
    period: '2025',
    type: 'Engineering Contract',
    bullets: [
      'Architected resilient backend modules with Python and Django framework.',
      'Optimized database query latency and designed relational storage schemas.',
      'Enforced defensive input validation to eliminate API injection vectors.',
    ],
  },
  {
    role: 'IT Technical Assistant',
    organization: 'Foodpanda',
    location: 'Dhaka, Bangladesh',
    period: '2021',
    type: 'Operational Systems',
    bullets: [
      'Managed hardware node configuration, network provisioning, and POS endpoint reliability.',
      'Conducted live diagnostics and security troubleshooting for enterprise mobile terminals.',
      'Resolved infrastructure connectivity incidents across operating hubs.',
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'B.Sc. in Computer Science & Engineering (Major in Cyber Security)',
    institution: 'Daffodil International University',
    period: '2022 — Expected September 2026',
    grade: 'Undergraduate Program',
    highlights: [
      'Specialized coursework in Cryptography, Network Security, Operating System Internals, and Computer Architecture.',
      'Research focus on quantum algorithm performance and applied threat modeling.',
    ],
  },
  {
    degree: 'Higher Secondary Certificate (Science)',
    institution: 'Bangladesh Air Force Shaheen College, Kurmitola',
    period: '2018 — 2020',
    grade: 'GPA: 5.00 / 5.00 (Perfect Score)',
    highlights: ['Majored in Mathematics, Physics, and Information Technology.'],
  },
  {
    degree: 'Secondary School Certificate (Science)',
    institution: 'Bangladesh Tea Research Institute High School, Sreemangal',
    period: '2016 — 2017',
    grade: 'GPA: 5.00 / 5.00 (Perfect Score)',
    highlights: ['Graduated top of class with honors in Natural Sciences and Mathematics.'],
  },
];

export const certifications: Certification[] = [
  {
    title: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    issued: 'September 2024',
    summary: 'Defense-in-depth methodologies, firewall design, network IDS/IPS inspection, and remote control containment.',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    issued: 'September 2024',
    summary: 'Core security architecture, threat vector classification, and operational defense foundations.',
  },
  {
    title: 'The Cybersecurity Threat Landscape',
    issuer: 'LinkedIn Learning',
    issued: 'February 2025',
    summary: 'Adversary analysis, vulnerability lifecycle management, and contemporary attack patterns.',
  },
  {
    title: 'Cybersecurity Foundations',
    issuer: 'LinkedIn Learning',
    issued: 'March 2025',
    summary: 'Defensive architecture principles, authentication flows, and security perimeter governance.',
  },
  {
    title: 'Cybersecurity Awareness: Terminology',
    issuer: 'LinkedIn Learning',
    issued: 'March 2025',
    summary: 'Industry standard terminology, threat categorization, and regulatory compliance concepts.',
  },
];

export const achievements = [
  'Crossed 61 districts of Bangladesh via solo bicycle expedition within 2 consecutive months.',
  'Team Leader, Dhaka International Marathon organizing committee (2023, 2024).',
  'Active open-source contributor to Parrot OS and security engineering tooling.',
  'Applied research contributor exploring quantum algorithm noise behavior on NISQ hardware.',
];

export const languages = [
  { name: 'Bangla', level: 'Native' },
  { name: 'English', level: 'Fluent / Professional' },
  { name: 'Russian', level: 'A2 (Elementary)' },
  { name: 'Romanian', level: 'A1 (Basic)' },
];

// Flat export for backward-compatibility during section migrations
export const skills = skillGroups.flatMap((group) =>
  group.skills.map((s) => ({
    name: s.name,
    level: 80,
    category: group.category.toLowerCase().includes('security')
      ? 'security'
      : group.category.toLowerCase().includes('systems')
      ? 'backend'
      : 'tools',
  }))
);


export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/rakibhassanrh66',
    handle: '@rakibhassanrh66',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rakibhassan66',
    handle: 'in/rakibhassan66',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:rakibhassan.rh66@protonmail.com',
    handle: 'rakibhassan.rh66@protonmail.com',
    icon: 'email',
  },
];
