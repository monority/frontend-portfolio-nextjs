import type { IconName } from "@shared-types/icons"
import type { CreationItem, Lang } from '@shared-types'
import { PALETTES } from '../shared/palettes'

export const CREATIONS_CONTENT: Record<Lang, {
  sectionLabel: string
  heading: string
  intro: string
  railLabel: string
  railIntro: string
  highlights: string
  tools: string
  explore: string
}> = {
  fr: {
    sectionLabel: 'Création',
    heading: 'Des créations plus libres, entre interfaces et univers de jeu',
    intro: 'Une partie plus expérimentale de mon travail, où je construis des maps Source, des GUIs in-game et un projet de jeu vidéo avec la même exigence de rythme, de lisibilité et d\'ambiance.',
    railLabel: 'Exploration',
    railIntro: 'Une partie plus libre, plus monde, plus interface, plus ambiance.',
    highlights: 'Points clés',
    tools: 'Outils et terrain de jeu',
    explore: 'Explorer',
  },
  en: {
    sectionLabel: 'Creation',
    heading: 'More open creative work, between interfaces and game worlds',
    intro: 'A more experimental part of my work, where I build Source maps, in-game GUIs, and a video game project with the same attention to pacing, readability, and atmosphere.',
    railLabel: 'Exploration',
    railIntro: 'A freer space for worldbuilding, interface direction, and atmosphere.',
    highlights: 'Key points',
    tools: 'Tools and playground',
    explore: 'Explore',
  },
}

export const CREATIONS: CreationItem[] = [
  {
    id: 'source-maps',
    title: 'SOURCE_MAPS',
    titleDisplay: {
      fr: 'Maps Source',
      en: 'Source Maps',
    },
    category: {
      fr: 'Level design',
      en: 'Level design',
    },
    tagline: {
      fr: 'Des cartes pensées pour le rythme, la lecture et l ambiance.',
      en: 'Maps shaped around pacing, readability, and atmosphere.',
    },
    description: {
      fr: 'Je conçois des maps pour le moteur Source avec une attention forte portée au flow, aux points de repère visuels et à la sensation d exploration.',
      en: 'I build maps for the Source engine with a strong focus on flow, visual landmarks, and the feeling of exploration.',
    },
    details: {
      fr: 'Chaque environnement est pensé comme un espace jouable et lisible: circulation, contrastes, composition et ambiance servent autant le gameplay que la mise en scène.',
      en: 'Each environment is built as a playable, readable space where circulation, contrast, composition, and atmosphere support both gameplay and staging.',
    },
    highlights: [
      { fr: 'Blockout, composition et circulation', en: 'Blockout, composition, and circulation' },
      { fr: 'Ambiance visuelle et points de repère', en: 'Visual atmosphere and landmarks' },
      { fr: 'Lecture claire des volumes et des zones', en: 'Clear readability of volumes and areas' },
    ],
    tools: ['Hammer Editor', 'Source Engine', 'Level Design'],
    outputs: [
      { fr: 'Maps jouables', en: 'Playable maps' },
      { fr: 'Prototypes d environnements', en: 'Environment prototypes' },
      { fr: 'Scènes atmosphériques', en: 'Atmospheric scenes' },
    ],
    link: 'https://gamebanana.com/members/1448278',
    year: '2024',
    status: {
      fr: 'Travaux créatifs',
      en: 'Creative work',
    },
    palette: PALETTES.green,
    visual: '/images/creations/css-maps.webp',
  },
  {
    id: 'source-guis',
    title: 'SOURCE_GUIS',
    titleDisplay: {
      fr: 'GUIs Source',
      en: 'Source GUIs',
    },
    category: {
      fr: 'Interface in-game',
      en: 'In-game interface',
    },
    tagline: {
      fr: 'Des interfaces Source plus lisibles, plus cohérentes et plus immersives.',
      en: 'Source interfaces made clearer, more cohesive, and more immersive.',
    },
    description: {
      fr: 'Je crée des GUIs pour le moteur Source en travaillant la hiérarchie, la lisibilité et l intégration visuelle avec l univers du jeu.',
      en: 'I design GUIs for the Source engine by focusing on hierarchy, readability, and visual integration with the game universe.',
    },
    details: {
      fr: 'L objectif est de produire des interfaces utiles sans casser l immersion: meilleurs repères, structure plus nette et équilibre entre style et fonctionnalité.',
      en: 'The goal is to deliver useful interfaces without breaking immersion: stronger cues, clearer structure, and a better balance between style and function.',
    },
    highlights: [
      { fr: 'HUD et menus plus clairs', en: 'Clearer HUDs and menus' },
      { fr: 'Intégration visuelle dans le jeu', en: 'Visual integration into the game' },
      { fr: 'Direction UI adaptée au contexte', en: 'UI direction tailored to the context' },
    ],
    tools: ['VGUI', 'Photoshop', 'UI Design'],
    outputs: [
      { fr: 'HUDs', en: 'HUDs' },
      { fr: 'Menus', en: 'Menus' },
      { fr: 'Éléments d interface', en: 'Interface elements' },
    ],
    link: 'https://gamebanana.com/members/1448278',
    year: '2024',
    status: {
      fr: 'UI créative',
      en: 'Creative UI',
    },
    palette: PALETTES.blue,
    visual: '/images/creations/css-guis.webp',
  },
  {
    id: 'video-game',
    title: 'VIDEO_GAME',
    titleDisplay: {
      fr: 'Jeu vidéo',
      en: 'Video Game',
    },
    category: {
      fr: 'Game project',
      en: 'Game project',
    },
    tagline: {
      fr: 'Un projet de jeu pensé comme une extension naturelle de mon travail créatif.',
      en: 'A game project shaped as a natural extension of my creative work.',
    },
    description: {
      fr: 'Je développe aussi un jeu vidéo, avec la même attention portée au ressenti, au rythme et à la cohérence entre direction visuelle et expérience.',
      en: 'I am also building a video game, with the same focus on feel, pacing, and consistency between visual direction and player experience.',
    },
    details: {
      fr: 'Ce travail prolonge mon intérêt pour les environnements interactifs: construire une expérience, poser une ambiance et faire dialoguer interface, espace et intention.',
      en: 'This work extends my interest for interactive environments: building an experience, setting an atmosphere, and making interface, space, and intention work together.',
    },
    highlights: [
      { fr: 'Direction créative globale', en: 'Overall creative direction' },
      { fr: 'Sens du rythme et du ressenti', en: 'Attention to pacing and feel' },
      { fr: 'Lien fort entre interface et monde', en: 'Strong link between interface and world' },
    ],
    tools: ['Game Design', 'UI', 'Worldbuilding'],
    outputs: [
      { fr: 'Prototype jouable', en: 'Playable prototype' },
      { fr: 'Direction visuelle', en: 'Visual direction' },
      { fr: 'Système d expérience', en: 'Experience system' },
    ],
    link: 'https://iej-nouvelles-images.itch.io/rezan',
    year: '2025',
    status: {
      fr: 'Projet en cours',
      en: 'Work in progress',
    },
    palette: PALETTES.gold,
    visual: '/images/creations/itch-game.webp',
  },
]

export const CREATION_ICON_BY_ID: Record<string, IconName> = {
  "source-maps": "source",
  "source-guis": "gui",
  "video-game": "game",
}

export const CREATION_TOOL_ICON_BY_LABEL: Record<string, IconName> = {
  "hammer editor": "hammer",
  "source engine": "source",
  "level design": "unity",
  vgui: "gui",
  photoshop: "photoshop",
  "ui design": "figma",
  "game design": "unity",
  ui: "figma",
  worldbuilding: "unity",
}