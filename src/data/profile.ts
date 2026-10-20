// Public sources and review notes: docs/CONTENT_SOURCES.md.
// Include only intentionally public profile information and published personal projects.
export const profile = {
  name: 'Moh. Rizky Kay', shortName: 'Rizky', handle: 'morizkay',
  location: 'Palu, Indonesia', timezone: 'WITA, UTC+8',
  email: 'morizkay@proton.me', // Contact address published on the public GitHub profile.
  github: 'https://github.com/morizkay',
  linkedin: 'https://www.linkedin.com/in/morizkay/',
  bluesky: 'https://bsky.app/profile/morizkay.bsky.social',
  npm: 'https://www.npmjs.com/~morizkay',
};

export const links = [
  { label: 'GitHub', handle: 'morizkay', href: profile.github },
  { label: 'LinkedIn', handle: 'in/morizkay', href: profile.linkedin },
  { label: 'Bluesky', handle: '@morizkay.bsky.social', href: profile.bluesky },
  { label: 'npm', handle: '~morizkay', href: profile.npm },
];

type Project = {
  name: string; slug: string; kind: string; summary: string; detail: string;
  stack: string[]; links: { label: string; href: string }[]; install?: string;
};

// The order is the order on the homepage and /projects/.
export const projects: Project[] = [
  {
    name: 'ClosedRouter', slug: 'closedrouter', kind: 'AI infrastructure',
    summary: 'A self-hosted LLM gateway. OpenRouter, but local.',
    detail: 'One endpoint in front of OpenAI, Anthropic, and local Ollama models, with a React dashboard for routing and keys, and PostgreSQL/pgvector for memory. Runs with Docker Compose on your own machine or network.',
    stack: ['Rust', 'Axum', 'React', 'PostgreSQL'],
    links: [{ label: 'Repository', href: 'https://github.com/morizkay/closedrouter' }],
  },
  {
    name: 'Efektif', slug: 'efektif', kind: 'Design system',
    summary: 'React components, hooks, and design tokens, with React Native primitives.',
    detail: 'The component library I maintain. A CSS theme and React components for the web, reusable hooks, shared tokens for web, desktop, and mobile, and a React Native package built on the same tokens.',
    stack: ['React', 'React Native', 'CSS'],
    links: [{ label: 'npm', href: 'https://www.npmjs.com/package/@efektif/ui' }, { label: 'GitHub org', href: 'https://github.com/efektif' }],
    install: 'npm install @efektif/ui',
  },
  {
    name: 'pi-cursor-auth', slug: 'pi-cursor-auth', kind: 'Agent tooling',
    summary: 'Use Cursor models inside the Pi coding agent.',
    detail: 'A Pi extension that registers Cursor as a model provider through the Cursor SDK. Pi keeps the agent loop, tools, and extensions; Cursor supplies the model, and thinking, text, and tool calls stream back into Pi.',
    stack: ['TypeScript', 'Cursor SDK'],
    links: [{ label: 'Repository', href: 'https://github.com/morizkay/pi-cursor-auth' }, { label: 'npm', href: 'https://www.npmjs.com/package/pi-cursor-auth' }],
    install: 'pi install npm:pi-cursor-auth',
  },
  {
    name: 'Pantai', slug: 'pantai', kind: 'Agent tooling',
    summary: 'A local dashboard for watching Cursor and Pi agent sessions.',
    detail: 'From “pantau AI”: keep an eye on every running AI-agent session from one local page instead of switching between terminals and editors.',
    stack: ['TypeScript', 'React', 'Effect'],
    links: [{ label: 'npm', href: 'https://www.npmjs.com/package/pantai' }],
  },
  {
    name: 'Lokalisa', slug: 'lokalisa', kind: 'Local development',
    summary: 'Directory-derived *.lolo domains for local dev servers.',
    detail: 'Gives each local development server a stable domain based on its project directory, so you stop memorising which port belongs to which app.',
    stack: ['TypeScript', 'Node.js', 'Effect'],
    links: [{ label: 'npm', href: 'https://www.npmjs.com/package/lokalisa' }],
  },
  {
    name: 'Omakill', slug: 'omakill', kind: 'Linux desktop',
    summary: 'Search and kill processes and listening ports from the Omarchy shell.',
    detail: 'An Omarchy plugin with an overlay picker: type to fuzzy-filter processes by name, arguments, user, or PID, or a port like :3000, then press Enter to send SIGTERM or Shift+Enter for SIGKILL.',
    stack: ['QML', 'Omarchy', 'Hyprland'],
    links: [{ label: 'Repository', href: 'https://github.com/morizkay/omarkill' }],
    install: 'omarchy plugin add https://github.com/morizkay/omarkill --enable',
  },
  {
    name: 'AppVolume', slug: 'appvolume', kind: 'macOS prototype',
    summary: 'A menu bar app that finds which apps are playing audio.',
    detail: 'A native SwiftUI menu bar prototype that discovers apps with active Core Audio output and controls the system output. Per-app volume, mute, and routing are not part of this version.',
    stack: ['Swift', 'SwiftUI', 'Core Audio'],
    links: [{ label: 'Repository', href: 'https://github.com/morizkay/appvolume' }],
  },
];
