import type { ProjectPalettes } from '@shared-types'

export const PALETTES: Record<string, ProjectPalettes> = {
    green: {
        dark: {
            accent: '#739b8a',
            bg: '#0a0c0b',
            surface: '#151816',
            fg: '#e8f0ec',
        },
        light: {
            accent: '#7ea792',
            bg: '#fcfdfc',
            surface: '#f5f7f5',
            fg: '#171b18',
        },
    },
    blue: {
        dark: {
            accent: '#8bb9d1',
            bg: '#0b0c0d',
            surface: '#121417',
            fg: '#e8edf1',
        },
        light: {
            accent: '#94adc0',
            bg: '#fdfdfd',
            surface: '#f7f8f9',
            fg: '#17191c',
        },
    },
    gold: {
        dark: {
            accent: '#c8a16b',
            bg: '#0c0c0b',
            surface: '#151412',
            fg: '#f0ebe3',
        },
        light: {
            accent: '#b69367',
            bg: '#fefdfb',
            surface: '#f8f6f2',
            fg: '#1d1a16',
        },
    },
    orange: {
        dark: {
            accent: '#d99262',
            bg: '#0d0b0a',
            surface: '#181411',
            fg: '#f3ece5',
        },
        light: {
            accent: '#cc8b61',
            bg: '#fffdfa',
            surface: '#faf5f0',
            fg: '#211914',
        },
    },
}