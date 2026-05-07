import type { ProjectPalettes, Theme } from "@shared-types"

type ThemedPanelItem = {
    palette?: ProjectPalettes
}

type SectionThemeAlias = "module"

type SectionThemeOptions = {
    resolvedTheme: Theme
    aliases?: SectionThemeAlias[]
}

function getSectionTheme(item: ThemedPanelItem, resolvedTheme: Theme) {
    const palette =
        resolvedTheme === "light"
            ? item.palette?.light ?? item.palette?.dark
            : item.palette?.dark ?? item.palette?.light

    return {
        accent: palette?.accent ?? "var(--foreground)",
        bg: palette?.bg ?? "var(--background)",
        surface: palette?.surface ?? "var(--card)",
        fg: palette?.fg ?? "var(--foreground)",
    }
}

export function getSectionThemeStyle(
    item: ThemedPanelItem,
    { resolvedTheme, aliases = [] }: SectionThemeOptions,
): React.CSSProperties {
    const theme = getSectionTheme(item, resolvedTheme)
    const isLight = resolvedTheme === "light"
    const accentSoft = `color-mix(in srgb, ${theme.accent} ${isLight ? "18%" : "10%"}, transparent)`
    const accentStrong = `color-mix(in srgb, ${theme.accent} ${isLight ? "72%" : "58%"}, white ${isLight ? "28%" : "42%"})`
    const accentBorder = `color-mix(in srgb, ${theme.accent} ${isLight ? "18%" : "8%"}, var(--border))`
    const accentBorderStrong = `color-mix(in srgb, ${theme.accent} ${isLight ? "34%" : "14%"}, var(--border))`
    const accentWash = `color-mix(in srgb, ${theme.accent} ${isLight ? "16%" : "8%"}, transparent)`
    const accentGlow = `color-mix(in srgb, ${theme.accent} ${isLight ? "12%" : "6%"}, transparent)`
    const surfaceFill = isLight
        ? `color-mix(in srgb, ${theme.surface} 92%, ${theme.accent} 8%)`
        : `color-mix(in srgb, ${theme.surface} 96%, transparent)`

    const aliasVars = aliases.reduce<Record<string, string>>((accumulator, alias) => {
        accumulator[`--${alias}-accent`] = theme.accent
        accumulator[`--${alias}-bg`] = theme.bg
        accumulator[`--${alias}-surface`] = theme.surface
        accumulator[`--${alias}-fg`] = theme.fg
        accumulator[`--${alias}-accent-soft`] = accentSoft
        accumulator[`--${alias}-accent-strong`] = accentStrong
        accumulator[`--${alias}-accent-border`] = accentBorder
        accumulator[`--${alias}-accent-border-strong`] = accentBorderStrong
        accumulator[`--${alias}-accent-wash`] = accentWash
        accumulator[`--${alias}-accent-glow`] = accentGlow
        accumulator[`--${alias}-surface-fill`] = surfaceFill

        return accumulator
    }, {})

    return {
        "--section-accent": theme.accent,
        "--section-bg": theme.bg,
        "--section-surface": theme.surface,
        "--section-fg": theme.fg,
        "--section-accent-soft": accentSoft,
        "--section-accent-strong": accentStrong,
        "--section-accent-border": accentBorder,
        "--section-accent-border-strong": accentBorderStrong,
        "--section-accent-wash": accentWash,
        "--section-accent-glow": accentGlow,
        "--section-surface-fill": surfaceFill,
        ...aliasVars,
    } as React.CSSProperties
}