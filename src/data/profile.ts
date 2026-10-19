// Public sources and review notes: docs/CONTENT_SOURCES.md.
// Include only intentionally public profile information and published personal projects.
export const profile = {
  name: 'Moh. Rizky Kay', shortName: 'Rizky', handle: 'morizkay', location: 'Palu, Indonesia',
  email: 'morizkay@proton.me', // Contact address published on the public GitHub profile.
  github: 'https://github.com/morizkay',
  linkedin: 'https://www.linkedin.com/in/morizkay/',
  bluesky: 'https://bsky.app/profile/morizkay.bsky.social',
  npm: 'https://www.npmjs.com/~morizkay',
};
export const projects = [
  { name: 'ClosedRouter', label: 'AI infrastructure', description: 'A self-hosted LLM API gateway with a React dashboard and PostgreSQL-backed memory.', href: 'https://github.com/morizkay/closedrouter', linkLabel: 'Explore repository', tags: ['Rust', 'React', 'PostgreSQL'], visual: 'router' },
  { name: 'Efektif', label: 'Interface building blocks', description: 'React components, hooks, and shared design tokens, with primitives for React Native.', href: 'https://www.npmjs.com/package/@efektif/ui', linkLabel: 'Explore packages', tags: ['React', 'React Native', 'Design systems'], visual: 'ui' },
  { name: 'pi-cursor-auth', label: 'AI developer tools', description: 'Use Cursor models in Pi while keeping Pi’s tools, extensions, and agent loop.', href: 'https://github.com/morizkay/pi-cursor-auth', linkLabel: 'View on GitHub', tags: ['TypeScript', 'Cursor SDK'], visual: 'terminal' },
  { name: 'Pantai', label: 'Local tooling', description: 'A local dashboard for watching Cursor and Pi agent sessions.', href: 'https://www.npmjs.com/package/pantai', linkLabel: 'View on npm', tags: ['React', 'Effect'], visual: 'activity' },
  { name: 'Lokalisa', label: 'Developer experience', description: 'Directory-derived .lolo domains for local development servers.', href: 'https://www.npmjs.com/package/lokalisa', linkLabel: 'View on npm', tags: ['Node.js', 'Effect'], visual: 'globe' },
  { name: 'AppVolume', label: 'macOS · prototype', description: 'A menu bar prototype for discovering active audio apps and controlling system output.', href: 'https://github.com/morizkay/appvolume', linkLabel: 'View on GitHub', tags: ['SwiftUI', 'Core Audio'], visual: 'sliders' },
] as const;
