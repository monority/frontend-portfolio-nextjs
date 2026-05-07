import type { IconName } from '@shared-types/icons'

export type TechLevel = 'primary' | 'secondary' | 'familiar'

export interface TechItem {
  id: IconName
  label: string
  level: TechLevel
}

export interface TechBentoGroup {
  id: string
  items: TechItem[]
}

export const TECH_BENTO_GROUPS: TechBentoGroup[] = [
  {
    id: 'frontend',
    items: [
      { id: 'react',      label: 'React',       level: 'primary' },
      { id: 'nextjs',     label: 'Next.js',     level: 'primary' },
      { id: 'tailwind',   label: 'Tailwind',    level: 'secondary' },
      { id: 'sass',       label: 'Sass',        level: 'secondary' },
      { id: 'motion',     label: 'Motion',      level: 'secondary' },
      { id: 'astro',      label: 'Astro',       level: 'familiar' },
    ],
  },
  {
    id: 'backend',
    items: [
      { id: 'node',       label: 'Node.js',     level: 'primary' },
      { id: 'express',    label: 'Express',     level: 'secondary' },
      { id: 'mongo',      label: 'MongoDB',     level: 'secondary' },
      { id: 'sql',        label: 'SQL',         level: 'secondary' },
      { id: 'jwt',        label: 'JWT',         level: 'familiar' },
      { id: 'nodemon',    label: 'Nodemon',     level: 'familiar' },
    ],
  },
  {
    id: 'languages',
    items: [
      { id: 'typescript', label: 'TypeScript',  level: 'primary' },
      { id: 'javascript', label: 'JavaScript',  level: 'primary' },
      { id: 'csharp',     label: 'C#',          level: 'secondary' },
    ],
  },
  {
    id: 'hosting',
    items: [
      { id: 'vercel',     label: 'Vercel',      level: 'primary' },
      { id: 'supabase',   label: 'Supabase',    level: 'secondary' },
      { id: 'railway',    label: 'Railway',     level: 'secondary' },
      { id: 'render',     label: 'Render',      level: 'familiar' },
      { id: 'neon',       label: 'Neon',        level: 'familiar' },
      { id: 'firebase',   label: 'Firebase',    level: 'secondary' },
      { id: 'cloudfare',  label: 'Cloudflare',  level: 'familiar' },
    ],
  },
  {
    id: 'tools',
    items: [
      { id: 'figma',      label: 'Figma',       level: 'primary' },
      { id: 'github',     label: 'GitHub',      level: 'primary' },
      { id: 'docker',     label: 'Docker',      level: 'secondary' },
      { id: 'vscode',     label: 'VS Code',     level: 'secondary' },
      { id: 'postman',    label: 'Postman',     level: 'familiar' },
      { id: 'photoshop',  label: 'Photoshop',   level: 'secondary' },
    ],
  },
]

export const MARQUEE_ITEMS: { icon: IconName; label: string }[] = [
  { icon: 'react', label: 'React' },
  { icon: 'nextjs', label: 'Next.js' },
  { icon: 'astro', label: 'Astro' },
  { icon: 'tailwind', label: 'Tailwind CSS' },
  { icon: 'sass', label: 'Sass' },
  { icon: 'motion', label: 'Motion' },
  { icon: 'node', label: 'Node.js' },
  { icon: 'express', label: 'Express' },
  { icon: 'mongo', label: 'MongoDB' },
  { icon: 'typescript', label: 'TypeScript' },
  { icon: 'javascript', label: 'JavaScript' },
  { icon: 'docker', label: 'Docker' },
  { icon: 'figma', label: 'Figma' },
  { icon: 'github', label: 'GitHub' },
  { icon: 'vercel', label: 'Vercel' },
  { icon: 'railway', label: 'Railway' },
]