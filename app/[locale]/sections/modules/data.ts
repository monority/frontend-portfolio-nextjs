import type { IconName } from "@shared-types/icons"
import type { Lang, Module } from "@shared-types"
import { PALETTES } from '../shared/palettes'

export const MODULES_CONTENT: Record<Lang, {
    sectionLabel: string
    heading: string
    intro: string
    highlights: string
    stack: string
    live: string
    github: string
    npm: string
    miniLabel: string
}> = {
    fr: {
        sectionLabel: 'Modules',
        heading: 'Des briques plus petites, pensées pour être utiles',
        intro: 'Des mini projets plus ciblés, construits comme des modules autonomes : une intention claire, une exécution propre et une base facile à faire évoluer.',
        highlights: 'Points clés',
        stack: 'Stack technique',
        live: 'Voir le module',
        github: 'GitHub',
        npm: 'npm',
        miniLabel: 'Format mini',
    },
    en: {
        sectionLabel: 'Modules',
        heading: 'Smaller building blocks, designed to stay useful',
        intro: 'More focused mini projects, built like self-contained modules: clear intent, clean execution, and a structure that stays easy to evolve.',
        highlights: 'Key highlights',
        stack: 'Tech stack',
        live: 'Open module',
        github: 'GitHub',
        npm: 'npm',
        miniLabel: 'Mini format',
    },
}

export const MODULES: Module[] = [
    {
        id: 'convert-img',
        titleDisplay: 'Convert Img',
        tagline: {
            fr: 'Conversion d\'images rapide et sans friction.',
            en: 'Fast image conversion without friction.',
        },
        description: {
            fr: 'Petit outil focalisé sur une tâche simple: convertir des images proprement, avec une interface claire et un parcours direct.',
            en: 'A focused utility built for one simple job: converting images cleanly with a clear interface and a direct flow.',
        },
        details: {
            fr: 'Le module a été pensé comme une brique autonome: peu de bruit visuel, actions immédiates et structure facile à enrichir si de nouveaux formats ou options sont ajoutés.',
            en: 'This module was designed as a self-contained building block: low visual noise, immediate actions, and a structure that stays easy to extend when new formats or options are added.',
        },
        highlights: [
            { fr: 'Conversion rapide', en: 'Fast conversion' },
            { fr: 'Parcours minimal', en: 'Minimal flow' },
            { fr: 'Base extensible', en: 'Extensible base' },
        ],
        tech: ['Javascript', 'Node.js'],
        year: '2026',
        category: {
            fr: 'Utilitaire',
            en: 'Utility',
        },
        github: 'https://github.com/monority/tools-convert-img',
        palette: PALETTES.blue,
    },
    {
        id: 'compress-multi',
        titleDisplay: 'Compress Multi',
        tagline: {
            fr: 'Compresser PDF, images et autres fichiers dans un même flux.',
            en: 'Compress PDFs, images, and other files in one flow.',
        },
        description: {
            fr: 'Outil polyvalent pensé pour réduire le poids de plusieurs types de fichiers avec une interface claire, un parcours direct et peu de friction.',
            en: 'A versatile tool built to reduce the size of multiple file types with a clear interface, a direct flow, and low friction.',
        },
        details: {
            fr: 'Le module regroupe des usages souvent dispersés dans plusieurs outils: compresser des PDF, des images ou d\'autres documents depuis une même base, avec une logique simple à étendre.',
            en: 'This module brings together workflows that are often split across multiple tools: compressing PDFs, images, or other documents from one base, with logic that stays simple to extend.',
        },
        highlights: [
            { fr: 'Compression multi-format', en: 'Multi-format compression' },
            { fr: 'Par lots', en: 'Batch-ready flow' },
            { fr: 'Base évolutive', en: 'Evolvable base' },
        ],
        tech: ['Python'],
        year: '2026',
        category: {
            fr: 'Utilitaire',
            en: 'Utility',
        },
        github: 'https://github.com/monority/tools-compressor-multi',
        palette: PALETTES.orange,
    },
    {
        id: 'screenshot-api',
        titleDisplay: 'Screenshot tool',
        tagline: {
            fr: 'Capturer une page ou un état produit à la demande.',
            en: 'Capture a page or product state on demand.',
        },
        description: {
            fr: 'Module orienté service pour générer des captures depuis une URL ou un contexte donné, utile pour automatiser des usages produit ou marketing.',
            en: 'A service-oriented module that generates screenshots from a URL or a given state, useful for product and marketing automation.',
        },
        details: {
            fr: 'L\'objectif est d\'offrir une brique claire à brancher dans un workflow plus large: génération, export et réutilisation, sans surcharger l\'expérience.',
            en: 'The goal is to provide a clean building block that plugs into a broader workflow for generation, export, and reuse without overcomplicating the experience.',
        },
        highlights: [
            { fr: 'Génération à la demande', en: 'On-demand generation' },
            { fr: 'Intégration facile', en: 'Easy integration' },
        ],
        tech: ['Node.js', 'Javascript'],
        year: '2026',
        category: {
            fr: 'Automatisation',
            en: 'Automation',
        },
        github: 'https://github.com/monority/tools-screenshot',
        palette: PALETTES.gold,
    },
    {
        id: 'commitiq-engine',
        titleDisplay: 'CommitIQ Engine',
        tagline: {
            fr: 'Mieux cadrer la qualité avant le commit.',
            en: 'Improve quality before the commit.',
        },
        description: {
            fr: 'Outil centré sur le confort de développement pour vérifier, structurer ou guider la qualité des commits avant envoi.',
            en: 'A developer-focused tool designed to improve commit quality by checking, structuring, or guiding changes before they are sent.',
        },
        details: {
            fr: 'Le module met l\'accent sur la lisibilité et les garde-fous: une logique simple à maintenir, utile seul ou comme étape d\'un workflow plus grand.',
            en: 'This module emphasizes readability and guardrails: simple logic to maintain, useful on its own or as a step inside a larger workflow.',
        },
        highlights: [
            { fr: 'Workflow dev', en: 'Dev workflow' },
            { fr: 'Qualité de commit', en: 'Commit quality' },
            { fr: 'Usage quotidien', en: 'Daily usage' },
        ],
        tech: ['Git', 'Node.js', 'CLI', 'Python'],
        year: '2026',
        category: {
            fr: 'Outil dev',
            en: 'Developer tool',
        },
        github: 'https://github.com/monority/tools-commitiq-engine',
        npm: 'https://www.npmjs.com/package/commitiq-engine',
        palette: PALETTES.green,
    },
]

export const MODULE_TECH_ICON_BY_LABEL: Record<string, IconName> = {
    "next.js": "nextjs",
    typescript: "typescript",
    css: "css",
    "node.js": "node",
    api: "websocket",
    git: "github",
    cli: "arrowRight",
    javascript: "javascript",
    python: "python",
}