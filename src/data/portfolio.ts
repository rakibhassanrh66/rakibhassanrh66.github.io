export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: 'security' | 'ai' | 'backend' | 'research';
  links?: { label: string; url: string }[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'security' | 'backend' | 'tools' | 'programming' | 'ai' | 'languages';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Certification {
  title: string;
  description: string;
}

export const portfolioData = {
  name: 'Rakib Hassan',
  role: 'Cyber Security Engineer',
  tagline: 'Securing systems. Building resilient infrastructure. Engineering trust in the digital age.',
  location: 'Dhaka, Bangladesh',
  timezone: 'Asia/Dhaka',
  email: 'rakibhassan.rh66@protonmail.com',
  phone: '+880 1533996681',
  address: '1296/1 West Monipur, Mirpur-10, Dhaka',
  cvUrl: '/public/CV of RAKIB HASSAN.pdf',
  profileSummary:
    'Cybersecurity professional with a strong programming foundation, field technical skills, and practical experience in securing digital systems, networks, and applications. Passionate about continuous learning, applied research, and working in modern security IT environments based on engineering concepts.',
  aboutDetail:
    'Pursuing as a cybersecurity professional with a unique programming foundation, technical field skills, and field experience in securing server systems, networks, applications. eager to learn about new way to exploit and secure and adapt with modern system, applying research, and eager to supply modern IT security surroundings based on engineering principles.',
};

export const projects: Project[] = [
  {
    id: 'accessx',
    title: 'AccessX',
    description:
      'Cyber Recon & Phishing Simulation Framework — a controlled red-team toolkit with mobile integration and secure tunneling.',
    longDescription:
      'Designed and built a controlled security-testing framework for reconnaissance and phishing simulations. Focused on secure communication, system orchestration, and test-environment isolation. Features mobile integration and secure tunneling capabilities.',
    techStack: ['Frontend', 'Self-Hosted Backend', 'Mobile Integration', 'Secure Tunneling'],
    category: 'security',
    links: [],
  },
  {
    id: 'vehicle-detection',
    title: 'AI Vehicle Detection System',
    description:
      'Real-time vehicle detection pipeline using YOLOv8 for live video streams with object classification for traffic analysis.',
    longDescription:
      'Built with Object Detection segment using base form of Ultralytics YOLOv8. Designed for traffic analysis use cases with object tracking. Engineered for integration into backend services for data aggregation and reporting.',
    techStack: ['Python', 'YOLOv8', 'OpenCV', 'Object Tracking'],
    category: 'ai',
    links: [],
  },
  {
    id: 'deforestation',
    title: 'Deforestation Analysis (Bangladesh)',
    description:
      '25-year NDVI analysis on satellite data using Google Earth Engine to identify deforestation trends and hotspots.',
    longDescription:
      'Performed 25-year NDVI analysis using Google Earth Engine API and Landsat satellite imagery. Generated analytical outputs suitable for integration into dashboards or reporting systems. Identified key deforestation trends and hotspots across Bangladesh.',
    techStack: ['Python', 'Google Earth Engine', 'Landsat', 'NDVI Analysis'],
    category: 'ai',
    links: [],
  },
  {
    id: 'airport-management',
    title: 'Airport Entrance Management System',
    description:
      'Desktop system with role-based access control, passenger logs, and reporting using JavaFX and MySQL backend.',
    longDescription:
      'Designed and developed a desktop system with secure role-based access control. Built a relational database for passenger logs, user accounts, and daily reports. Focused on data integrity, authentication flow, and operational reliability.',
    techStack: ['Java', 'JavaFX', 'MySQL', 'RBAC'],
    category: 'backend',
    links: [],
  },
  {
    id: 'quantum-research',
    title: 'Quantum Computing Research',
    description:
      'Exploration of foundational quantum algorithms including Quantum Teleportation, Deutsch-Jozsa, and Grover\'s Search on IBM Quantum backends.',
    longDescription:
      'Explored foundational quantum algorithms including Quantum Teleportation, Deutsch-Jozsa, and Grover\'s Search. Implemented quantum circuits in Qiskit and executed them on IBM Quantum backends. Studied superposition, entanglement, and noise behavior on NISQ devices.',
    techStack: ['Qiskit', 'Python', 'Jupyter Notebooks', 'IBM Quantum'],
    category: 'research',
    links: [],
  },
];

export const skills: Skill[] = [
  // Security
  { name: 'Linux Administration', level: 85, category: 'security' },
  { name: 'Access Control', level: 80, category: 'security' },
  { name: 'Incident Response', level: 70, category: 'security' },
  { name: 'Penetration Testing', level: 65, category: 'security' },
  { name: 'Network Security', level: 75, category: 'security' },
  // Backend
  { name: 'Python', level: 90, category: 'backend' },
  { name: 'Django', level: 75, category: 'backend' },
  { name: 'RESTful APIs', level: 80, category: 'backend' },
  { name: 'MySQL', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 70, category: 'backend' },
  { name: 'Java', level: 75, category: 'backend' },
  // Programming Languages
  { name: 'C/C++/C#', level: 70, category: 'programming' },
  { name: 'Kotlin', level: 60, category: 'programming' },
  { name: 'Ruby', level: 50, category: 'programming' },
  // AI & Data
  { name: 'YOLOv8', level: 75, category: 'ai' },
  { name: 'OpenCV', level: 70, category: 'ai' },
  { name: 'Google Earth Engine', level: 65, category: 'ai' },
  // Tools
  { name: 'Git/GitHub', level: 90, category: 'tools' },
  { name: 'VS Code', level: 95, category: 'tools' },
  { name: 'Android Studio', level: 70, category: 'tools' },
  { name: 'Linux Server (Debian/Arch)', level: 80, category: 'tools' },
];

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/rakibhassanrh66', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rakibhassan66', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:rakibhassan.rh66@protonmail.com', icon: 'email' },
];

export const certifications: Certification[] = [
  {
    title: 'Network Defense – Cisco Networking Academy',
    description:
      'Issued September 2024. Focused on network defense techniques, remote control mechanisms, and foundational security operations.',
  },
  {
    title: 'Introduction to Cybersecurity – Cisco Networking Academy',
    description:
      'Issued September 2024. Covered core cybersecurity concepts, threat models, and security protocols.',
  },
  {
    title: 'The Cybersecurity Threat Landscape – LinkedIn Learning',
    description:
      'Issued February 2025. Focused on threat and vulnerability management in modern systems.',
  },
  {
    title: 'Cybersecurity Foundations – LinkedIn Learning',
    description:
      'Issued March 2025. Covered essential cybersecurity principles and defensive strategies.',
  },
  {
    title: 'Cybersecurity Awareness: Terminology – LinkedIn Learning',
    description:
      'Issued March 2025. Focused on information security awareness and industry terminology.',
  },
];

export const experience = [
  {
    role: 'Backend Developer (Associate)',
    company: 'BRAC IT (Contract)',
    location: 'Dhaka (Remote)',
    period: '2025',
    highlights: [
      'Designed backend systems using Django',
      'Optimized database performance',
      'Implemented scalable architectures',
    ],
  },
  {
    role: 'IT Technical Assistant',
    company: 'Foodpanda',
    location: 'Dhaka',
    period: '2021',
    highlights: [
      'Provided technical support for operations',
      'Configured mobile and POS systems',
      'Resolved network and hardware issues',
    ],
  },
];

export const education = [
  {
    degree: 'B.Sc. in Computer Science & Engineering (Major in Cyber Security)',
    institution: 'Daffodil International University',
    period: 'Expected Graduation: September 2026',
  },
  {
    degree: 'Higher Secondary Certificate (Science)',
    institution: 'Bangladesh Air Force Shaheen College, Kurmitola',
    period: '2018-2020',
    grade: 'GPA: 5.00/5.00',
  },
  {
    degree: 'Secondary School Certificate (Science)',
    institution: 'Bangladesh Tea Research Institute High School, Sreemangal',
    period: '2016-2017',
    grade: 'GPA: 5.00/5.00',
  },
];

export const languages = [
  { name: 'Bangla', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'Russian', level: 'A2 (actively studying, 56-day streak)' },
  { name: 'Romanian', level: 'A1 (basic reading and phrases)' },
];

export const achievements = [
  'Team Leader, Dhaka Marathon (2023, 2024)',
  'Completed cycling across 61 districts of Bangladesh within 2 months',
  'Active community contributor to Parrot OS security distribution',
  'Published research on quantum algorithms in academic journals',
];
