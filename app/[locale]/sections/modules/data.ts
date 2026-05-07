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
        heading: 'Des briques plus petites, pensees pour etre utiles',
        intro: 'Des mini projets plus cibles, construits comme des modules autonomes : une intention claire, une execution propre et une base facile a faire evoluer.',
        highlights: 'Points cles',
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
            fr: 'Conversion d images rapide et sans friction.',
            en: 'Fast image conversion without friction.',
        },
        description: {
            fr: 'Petit outil focalise sur une tache simple: convertir des images proprement, avec une interface claire et un parcours direct.',
            en: 'A focused utility built for one simple job: converting images cleanly with a clear interface and a direct flow.',
        },
        details: {
            fr: 'Le module a ete pense comme une brique autonome: peu de bruit visuel, actions immediates et structure facile a enrichir si de nouveaux formats ou options sont ajoutes.',
            en: 'This module was designed as a self-contained building block: low visual noise, immediate actions, and a structure that stays easy to extend when new formats or options are added.',
        },
        highlights: [
            { fr: 'Conversion rapide', en: 'Fast conversion' },
            { fr: 'Parcours minimal', en: 'Minimal flow' },
            { fr: 'Base extensible', en: 'Extensible base' },
        ],
        tech: ['Next.js', 'TypeScript', 'CSS'],
        year: '2025',
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
            fr: 'Compresser PDF, images et autres fichiers dans un meme flux.',
            en: 'Compress PDFs, images, and other files in one flow.',
        },
        description: {
            fr: 'Outil polyvalent pense pour reduire le poids de plusieurs types de fichiers avec une interface claire, un parcours direct et peu de friction.',
            en: 'A versatile tool built to reduce the size of multiple file types with a clear interface, a direct flow, and low friction.',
        },
        details: {
            fr: 'Le module regroupe des usages souvent disperses dans plusieurs outils: compresser des PDF, des images ou d autres documents depuis une meme base, avec une logique simple a etendre.',
            en: 'This module brings together workflows that are often split across multiple tools: compressing PDFs, images, or other documents from one base, with logic that stays simple to extend.',
        },
        highlights: [
            { fr: 'Compression multi-format', en: 'Multi-format compression' },
            { fr: 'Par lots', en: 'Batch-ready flow' },
            { fr: 'Base evolutive', en: 'Evolvable base' },
        ],
        tech: ['Node.js', 'TypeScript', 'CLI'],
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
        titleDisplay: 'Screenshot API',
        tagline: {
            fr: 'Capturer une page ou un etat produit a la demande.',
            en: 'Capture a page or product state on demand.',
        },
        description: {
            fr: 'Module oriente service pour generer des captures depuis une URL ou un contexte donne, utile pour automatiser des usages produit ou marketing.',
            en: 'A service-oriented module that generates screenshots from a URL or a given state, useful for product and marketing automation.',
        },
        details: {
            fr: 'L objectif est d offrir une brique claire a brancher dans un workflow plus large: generation, export et reutilisation, sans surcharger l experience.',
            en: 'The goal is to provide a clean building block that plugs into a broader workflow for generation, export, and reuse without overcomplicating the experience.',
        },
        highlights: [
            { fr: 'Generation a la demande', en: 'On-demand generation' },
            { fr: 'Usage API first', en: 'API-first usage' },
            { fr: 'Integration facile', en: 'Easy integration' },
        ],
        tech: ['Node.js', 'API', 'TypeScript'],
        year: '2025',
        category: {
            fr: 'Automatisation',
            en: 'Automation',
        },
        github: 'https://github.com/monority/tools-screenshot-api',
        palette: PALETTES.gold,
    },
    {
        id: 'git-quality-commit',
        titleDisplay: 'Git Quality Commit',
        tagline: {
            fr: 'Mieux cadrer la qualite avant le commit.',
            en: 'Improve quality before the commit.',
        },
        description: {
            fr: 'Outil centre sur le confort de developpement pour verifier, structurer ou guider la qualite des commits avant envoi.',
            en: 'A developer-focused tool designed to improve commit quality by checking, structuring, or guiding changes before they are sent.',
        },
        details: {
            fr: 'Le module met l accent sur la lisibilite et les garde-fous: une logique simple a maintenir, utile seul ou comme etape d un workflow plus grand.',
            en: 'This module emphasizes readability and guardrails: simple logic to maintain, useful on its own or as a step inside a larger workflow.',
        },
        highlights: [
            { fr: 'Workflow dev', en: 'Dev workflow' },
            { fr: 'Qualite de commit', en: 'Commit quality' },
            { fr: 'Usage quotidien', en: 'Daily usage' },
        ],
        tech: ['Git', 'Node.js', 'CLI'],
        year: '2025',
        category: {
            fr: 'Outil dev',
            en: 'Developer tool',
        },
        github: 'https://github.com/monority/tools-commit-quality-check',
        npm: 'https://www.npmjs.com/package/commit-quality-check',
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
}