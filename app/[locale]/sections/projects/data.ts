import type { Lang, Project } from '@shared-types'
import type { IconName } from '@shared-types/icons'

export const PROJECTS_CONTENT: Record<Lang, {
  sectionLabel: string
  heading: string
  intro: string
  pickerLabel: string
  paletteLabel: string
  lightMode: string
  darkMode: string
  scopeLabel: string
  liveSite: string
  techStack: string
  github: string
  fullscreen: string
  openFullscreenGallery: string
  resetZoom: string
  closeModal: string
  previousImage: string
  nextImage: string
  zoomOut: string
  zoomIn: string
  viewImage: (index: number) => string
  showImage: (index: number) => string
}> = {
  fr: {
    sectionLabel: 'Projets',
    heading: 'Une selection de projets recents',
    intro: 'Des contextes differents, une meme intention : rendre un produit plus simple a comprendre, plus agreable a utiliser et plus solide cote front.',
    pickerLabel: 'Choisir un projet :',
    paletteLabel: 'Palette',
    lightMode: 'Mode clair',
    darkMode: 'Mode sombre',
    scopeLabel: 'Perimetre',
    liveSite: 'Voir le site live',
    techStack: 'Stack technique',
    github: 'GitHub',
    fullscreen: 'Fullscreen',
    openFullscreenGallery: 'Ouvrir la galerie en plein ecran',
    resetZoom: 'Reinitialiser le zoom',
    closeModal: 'Fermer la modal',
    previousImage: 'Image precedente',
    nextImage: 'Image suivante',
    zoomOut: 'Reduire le zoom',
    zoomIn: 'Augmenter le zoom',
    viewImage: (index) => `Voir l'image ${index}`,
    showImage: (index) => `Afficher l'image ${index}`,
  },
  en: {
    sectionLabel: 'Projects',
    heading: 'A selection of recent work',
    intro: 'Different contexts, one intention: make a product easier to understand, more enjoyable to use and more solid on the front.',
    pickerLabel: 'Pick a project:',
    paletteLabel: 'Colour palette',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    scopeLabel: 'Project scope',
    liveSite: 'Check live site',
    techStack: 'Tech stack',
    github: 'GitHub',
    fullscreen: 'Fullscreen',
    openFullscreenGallery: 'Open fullscreen gallery',
    resetZoom: 'Reset zoom',
    closeModal: 'Close modal',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    viewImage: (index) => `View image ${index}`,
    showImage: (index) => `Show image ${index}`,
  },
}

export const PROJECT_ICON_BY_ID: Record<string, IconName> = {
  'human-work-force': 'humanworkforce',
  'dashboard-rch': 'dashboard',
  skillswap: 'skyllswap',
  horloges: 'horloges',
  'cesar-lezard': 'cesarlezard',
  'monority-base': 'monority',
}

export const PROJECT_TECH_ICON_BY_LABEL: Record<string, IconName> = {
  react: 'react',
  'react 19': 'react',
  'next.js': 'nextjs',
  typescript: 'typescript',
  'node.js': 'node',
  websocket: 'websocket',
  'd3.js': 'd3js',
  postgresql: 'sql',
  prisma: 'prisma',
  stripe: 'arrowRight',
  gsap: 'gsap',
  'three.js': 'threejs',
  css: 'css',
  storybook: 'storybook',
  i18n: 'i18n',
  'framer motion': 'motion',
}

export const PROJECTS: Project[] = [
  {
    id: 'human-work-force',
    titleDisplay: 'Human Work Force',
    tagline: {
      fr: 'Les IA embauchent des humains.',
      en: 'AIs hire humans.',
    },
    description: {
      fr: 'Concept SaaS satirique où les intelligences artificielles recrutent des humains pour leurs tâches créatives, avec un ton volontairement décalé mais une exécution très produit.',
      en: 'Satirical SaaS concept where AIs recruit humans for creative tasks, with a deliberately playful tone but a product-grade execution.',
    },
    tech: ['React 19', 'TypeScript', 'i18n', 'Framer Motion'],
    year: '2024',
    tags: [
      { fr: 'SaaS', en: 'SaaS' },
      { fr: 'concept', en: 'concept' },
      { fr: 'direction artistique', en: 'art direction' },
    ],
    live: 'https://humanworkforce.vercel.app',
    github: 'https://github.com/monority/frontend-hwf-react',
    visual: '/images/projects/hwf/hwf-1.webp',
    gallery: [
      '/images/projects/hwf/hwf-1.webp',
      '/images/projects/hwf/hwf-2.webp',
      '/images/projects/hwf/hwf-3.webp',
      '/images/projects/hwf/hwf-4.webp',
    ],
    palette: {
      dark: {
        accent: '#3a85ea',
        bg: '#0c0c0c',
        surface: '#141f2e',
        fg: '#8a8a8b',
      },
      light: {
        accent: '#d5e6f0',
        bg: '#fff4e8',
        surface: '#ffe7cf',
        fg: '#22140b',
      },
    },
  },
  {
    id: 'dashboard-rch',
    titleDisplay: 'Dashboard',
    tagline: {
      fr: 'Donnees de marche en temps reel.',
      en: 'Real-time market data.',
    },
    description: {
      fr: 'Dashboard de visualisation de données financières avec mise à jour WebSocket, pensé pour lire l\'info rapidement et garder un rythme visuel vivant.',
      en: 'Financial data visualization dashboard with WebSocket updates, designed for fast readability and a lively visual rhythm.',
    },
    tech: ['React', 'D3.js', 'WebSocket', 'TypeScript'],
    year: '2024',
    tags: [
      { fr: 'dashboard', en: 'dashboard' },
      { fr: 'data', en: 'data' },
      { fr: 'temps reel', en: 'real-time' },
    ],
    live: 'https://dashboard-rch.vercel.app',
    github: 'https://github.com/monority/frontend-dashboard-react',
    visual: '/images/projects/dashboard/dashboard-1.webp',
    gallery: [
      '/images/projects/dashboard/dashboard-1.webp',
      '/images/projects/dashboard/dashboard-2.webp',
      '/images/projects/dashboard/dashboard-3.webp',
      '/images/projects/dashboard/dashboard-4.webp',
    ],
    palette: {
      dark: {
        accent: '#66d9ef',
        bg: '#12161d',
        surface: '#171d26',
        fg: '#e6ebf3',
      },
    },
  },
  {
    id: 'skillswap',
    titleDisplay: 'SkillSwap',
    tagline: {
      fr: 'Echangez vos competences.',
      en: 'Exchange your skills.',
    },
    description: {
      fr: 'Plateforme peer-to-peer d\'échange de compétences, orientée communauté, confiance et échanges simples entre profils complémentaires.',
      en: 'Peer-to-peer skill exchange platform, focused on community, trust, and simple exchanges between complementary profiles.',
    },
    tech: ['React 19', 'Node.js', 'WebSocket', 'PostgreSQL'],
    year: '2024',
    tags: [
      { fr: 'plateforme', en: 'platform' },
      { fr: 'social', en: 'social' },
      { fr: 'fullstack', en: 'fullstack' },
      { fr: 'matching', en: 'matching' },
    ],
    live: 'https://skyllswap.vercel.app',
    github: 'https://github.com/monority/fullstack-skyllswap-react',
    visual: '/images/projects/skyllswap/skyllswap-1.webp',
    gallery: [
      '/images/projects/skyllswap/skyllswap-1.webp',
      '/images/projects/skyllswap/skyllswap-2.webp',
      '/images/projects/skyllswap/skyllswap-3.webp',
      '/images/projects/skyllswap/skyllswap-4.webp',
    ],
    palette: {
      dark: {
        accent: '#16a249',
        bg: '#090909',
        surface: '#0e0e0e',
        fg: '#f7f3ff',
      },
    },
  },
  {
    id: 'horloges',
    titleDisplay: 'Horloges',
    tagline: {
      fr: 'La marketplace des montres rares.',
      en: 'Marketplace for rare watches.',
    },
    description: {
      fr: 'Marketplace dédiée aux montres avec filtres avancés, conçue pour une lecture rapide des collections et une navigation plus premium.',
      en: 'Watches marketplace with advanced filters, designed for fast collection scanning and a more premium browsing experience.',
    },
    tech: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    year: '2023',
    tags: [
      { fr: 'e-commerce', en: 'e-commerce' },
      { fr: 'marketplace', en: 'marketplace' },
      { fr: 'luxe', en: 'luxury' },
    ],
    live: 'https://horloges.vercel.app',
    github: 'https://github.com/monority/frontend-horloges-react',
    visual: '/images/projects/horloges/horloges-1.webp',
    gallery: [
      '/images/projects/horloges/horloges-1.webp',
      '/images/projects/horloges/horloges-2.webp',
      '/images/projects/horloges/horloges-3.webp',
      '/images/projects/horloges/horloges-4.webp',
    ],
    palette: {
      dark: {
        accent: '#d9b77c',
        bg: '#14110d',
        surface: '#1d1812',
        fg: '#f7efe3',
      },
    },
  },
  {
    id: 'cesar-lezard',
    titleDisplay: 'César Lézard',
    tagline: {
      fr: 'Experience musicale immersive.',
      en: 'Immersive music experience.',
    },
    description: {
      fr: 'Site vitrine interactif pour un artiste musical, pensé comme une immersion visuelle et sonore plutôt qu\'une simple landing page.',
      en: 'Interactive showcase for a music artist, built as a visual and sonic immersion rather than a simple landing page.',
    },
    tech: ['Next.js', 'GSAP', 'Three.js', 'CSS'],
    year: '2023',
    tags: [
      { fr: 'vitrine', en: 'showcase' },
      { fr: 'musique', en: 'music' },
      { fr: 'immersif', en: 'immersive' },
    ],
    live: 'https://cesarlezard.com',
    github: 'https://github.com/monority/frontend-cslz-react',
    visual: '/images/projects/cesarlezard/cesarlezard-1.webp',
    gallery: [
      '/images/projects/cesarlezard/cesarlezard-1.webp',
      '/images/projects/cesarlezard/cesarlezard-2.webp',
      '/images/projects/cesarlezard/cesarlezard-3.webp',
      '/images/projects/cesarlezard/cesarlezard-4.webp',
    ],
    palette: {
      dark: {
        accent: '#ff6b6b',
        bg: '#120f12',
        surface: '#1b161b',
        fg: '#f8f2f8',
      },
    },
  },
  {
    id: 'monority-base',
    titleDisplay: 'Monority Library',
    tagline: {
      fr: 'Design system open source.',
      en: 'Open-source design system.',
    },
    description: {
      fr: 'Bibliothèque de composants React avec design system complet, pensée pour servir de base solide et réutilisable sur plusieurs projets.',
      en: 'React component library with a complete design system, built as a solid and reusable base for multiple projects.',
    },
    tech: ['React', 'Storybook', 'TypeScript', 'CSS'],
    year: '2023',
    tags: [
      { fr: 'open source', en: 'open source' },
      { fr: 'design system', en: 'design system' },
      { fr: 'composants', en: 'components' },
    ],
    live: 'https://monority.vercel.app',
    github: 'https://github.com/monority/lib-monority-react',
    visual: '/images/projects/library/library-1.webp',
    gallery: [
      '/images/projects/library/library-1.webp',
      '/images/projects/library/library-2.webp',
      '/images/projects/library/library-3.webp',
      '/images/projects/library/library-4.webp',
    ],
    palette: {
      dark: {
        accent: '#7dd3fc',
        bg: '#0d1320',
        surface: '#141c2d',
        fg: '#eef5ff',
      },
    },
  },
]