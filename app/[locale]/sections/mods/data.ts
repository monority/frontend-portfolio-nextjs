import type { IconName } from "@shared-types/icons"
import type { Lang, Module } from "@shared-types"
import { PALETTES } from "../shared/palettes"

export const MODS_CONTENT: Record<Lang, {
    sectionLabel: string
    heading: string
    intro: string
    highlights: string
    stack: string
    live: string
    miniLabel: string
}> = {
    fr: {
        sectionLabel: "Mods de jeux",
        heading: "Des expériences pensées pour prolonger les jeux",
        intro: "Une sélection de mods et d'expérimentations de jeu : nouvelles mécaniques, interfaces et contenus conçus avec la même attention portée à l'usage.",
        highlights: "Ce que le mod apporte",
        stack: "Technologies",
        live: "Voir sur Steam Workshop",
        miniLabel: "Mod de jeu",
    },
    en: {
        sectionLabel: "Game mods",
        heading: "Experiences designed to extend games",
        intro: "A selection of game mods and experiments: new mechanics, interfaces, and content built with the same attention to how people use them.",
        highlights: "What the mod adds",
        stack: "Technologies",
        live: "View on Steam Workshop",
        miniLabel: "Game mod",
    },
}

export const MODS: Module[] = [
    {
        id: "plasma-cutter-durability",
        titleDisplay: "Plasma Cutter Durability",
        tagline: {
            fr: "Garder le Multicutter opérationnel plus longtemps.",
            en: "Keep the Multicutter operational for longer.",
        },
        description: {
            fr: "Un mod Palworld qui augmente ou bloque la durabilité du Plasma Multicutter, avec une résistance maximale configurable.",
            en: "A Palworld mod that increases or freezes the Plasma Multicutter durability, with a configurable maximum resistance.",
        },
        details: {
            fr: "Une amélioration ciblée pour réduire les interruptions liées à l'usure de l'outil tout en gardant le comportement du jeu sous contrôle.",
            en: "A focused quality-of-life improvement that reduces tool downtime while keeping the game's behavior under control.",
        },
        highlights: [
            { fr: "Durabilité configurable", en: "Configurable durability" },
            { fr: "Option de durabilité infinie", en: "Infinite durability option" },
            { fr: "Ajustement ciblé du Multicutter", en: "Focused Multicutter tweak" },
        ],
        tech: ["Lua", "UE4SS"],
        year: "2026",
        category: { fr: "Amélioration Palworld", en: "Palworld tweak" },
        live: "https://steamcommunity.com/sharedfiles/filedetails/?id=3778065447",
        palette: PALETTES.gold,
    },
    {
        id: "crossbasecrafting",
        titleDisplay: "CrossBaseCrafting",
        tagline: {
            fr: "Fabriquer depuis n'importe laquelle de ses bases.",
            en: "Craft from any of your bases.",
        },
        description: {
            fr: "Un mod Palworld qui rend les coffres et boîtes de nourriture accessibles depuis toutes les bases pour les stations de fabrication.",
            en: "A Palworld mod that makes chests and food boxes accessible from every base for all crafting stations.",
        },
        details: {
            fr: "Le mod réduit les déplacements répétitifs entre les bases en centralisant l'accès aux ingrédients pendant la cuisine, la fabrication et la production.",
            en: "The mod reduces repetitive travel between bases by centralizing ingredient access for cooking, crafting, and production.",
        },
        highlights: [
            { fr: "Accès inter-bases", en: "Cross-base access" },
            { fr: "Compatible avec les stations de craft", en: "Crafting-station support" },
            { fr: "Moins d'allers-retours", en: "Less back-and-forth" },
        ],
        tech: ["C++", "UE4SS"],
        year: "2026",
        category: { fr: "Qualité de vie", en: "Quality of life" },
        live: "https://steamcommunity.com/sharedfiles/filedetails/?id=3777415700",
        palette: PALETTES.blue,
    },
    {
        id: "disable-camera-diplomacy-focus",
        titleDisplay: "Disable Camera diplomacy focus",
        tagline: {
            fr: "Garder le contrôle de la caméra pendant la diplomatie.",
            en: "Keep control of the camera during diplomacy.",
        },
        description: {
            fr: "Un mod Total War: WARHAMMER III qui désactive la mise au point automatique de la caméra lors de l'ouverture et de la navigation dans le menu de diplomatie.",
            en: "A Total War: WARHAMMER III mod that disables the camera's automatic focus when opening and navigating the diplomacy menu.",
        },
        details: {
            fr: "Une modification discrète qui évite de perdre la vue de la carte à chaque interaction diplomatique et conserve une lecture stable de la campagne.",
            en: "A subtle change that prevents the campaign view from jumping during diplomacy interactions and keeps the map readable.",
        },
        highlights: [
            { fr: "Caméra stabilisée", en: "Stable camera" },
            { fr: "Navigation diplomatique plus fluide", en: "Smoother diplomacy navigation" },
            { fr: "Compatible avec la campagne", en: "Campaign-friendly" },
        ],
        tech: ["Lua", "Total War: WARHAMMER III"],
        year: "2026",
        category: { fr: "Interface de campagne", en: "Campaign interface" },
        live: "https://steamcommunity.com/sharedfiles/filedetails/?id=3620673720",
        palette: PALETTES.orange,
    },
]

export const MOD_TECH_ICON_BY_LABEL: Record<string, IconName> = {
    lua: "lua",
    "c++": "cpp",
    ue4ss: "ue4ss",
    "total war: warhammer iii": "game",
}
