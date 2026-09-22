'use client'

import { useLocale } from "next-intl"
import type { Module } from "@shared-types"
import type { IconName } from "@shared-types/icons"
import { SectionIntro, SectionShell } from "@/components/ui/section"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon/Icon"
import { useTheme } from "@/components/ThemeProvider"
import { openExternalUrl } from "../shared/openExternalUrl"
import { getSectionThemeStyle } from "../shared/panelTheme"
import { ShowcaseListCard, ShowcasePanel, ShowcasePicker, ShowcasePickerItem, ShowcaseTechCard, useActiveShowcaseItem } from "../shared/showcase"
import { MODS, MODS_CONTENT, MOD_TECH_ICON_BY_LABEL } from "./data"

import "./mods.css"

function getTechIcon(tech: string): IconName | null {
    return MOD_TECH_ICON_BY_LABEL[tech.trim().toLowerCase()] ?? null
}

export default function Mods() {
    const locale = useLocale() as "fr" | "en"
    const { resolvedTheme } = useTheme()
    const { activeId, setActiveId, activeItem: activeMod } = useActiveShowcaseItem(MODS)
    const content = MODS_CONTENT[locale]

    return (
        <SectionShell id="mods" className="mods">
            <SectionIntro number="03" label={content.sectionLabel} title={content.heading} intro={content.intro} />

            <ShowcasePicker className="mods-picker">
                {MODS.map((mod, index) => (
                    <ShowcasePickerItem key={mod.id} index={index}>
                        <button
                            type="button"
                            className={`mods-picker__item${activeId === mod.id ? " mods-picker__item--active" : ""}`}
                            onClick={() => setActiveId(mod.id)}
                            aria-pressed={activeId === mod.id}
                            style={activeId === mod.id ? getSectionThemeStyle(mod, { resolvedTheme }) : undefined}
                        >
                            <span className="mods-picker__index">{String(index + 1).padStart(2, "0")}</span>
                            <span className="mods-picker__copy">
                                <span className="mods-picker__name">{mod.titleDisplay}</span>
                                <span className="mods-picker__meta">{mod.category[locale]}</span>
                            </span>
                        </button>
                    </ShowcasePickerItem>
                ))}
            </ShowcasePicker>

            <ModPanel mod={activeMod} locale={locale} content={content} resolvedTheme={resolvedTheme} />
        </SectionShell>
    )
}

function ModPanel({
    mod,
    locale,
    content,
    resolvedTheme,
}: {
    mod: Module
    locale: "fr" | "en"
    content: (typeof MODS_CONTENT)["fr"]
    resolvedTheme: "light" | "dark"
}) {
    return (
        <ShowcasePanel panelKey={mod.id} className="mods-panel panel-container" style={getSectionThemeStyle(mod, { resolvedTheme })}>
            <div className="panel-ambient" aria-hidden="true" />
            <article className="mods-panel__hero panel-card">
                <div className="panel-hero-top">
                    <div className="panel-hero-copy">
                        <span className="mods-panel__kicker">{mod.category[locale]}</span>
                        <h3 className="panel-title mods-panel__title">{mod.titleDisplay}</h3>
                        <p className="panel-tagline">{mod.tagline[locale]}</p>
                    </div>
                    <div className="panel-meta">
                        <span>{mod.year}</span>
                        <span className="panel-meta-dot" aria-hidden="true" />
                        <span>{content.miniLabel}</span>
                    </div>
                </div>
                        <p className="panel-description">{mod.description[locale]}</p>
                        <p className="panel-details">{mod.details[locale]}</p>
                        {mod.live && (
                            <div className="panel-actions">
                                <Button
                                    variant="primary"
                                    onClick={() => openExternalUrl(mod.live)}
                                    rightIcon={<Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" />}
                                >
                                    {content.live}
                                </Button>
                            </div>
                        )}
                    </article>

            <ShowcaseListCard label={content.highlights} items={mod.highlights.map((highlight) => ({ key: highlight[locale], content: highlight[locale] }))} />
            <ShowcaseTechCard
                label={content.stack}
                items={mod.tech}
                renderIcon={(tech) => {
                    const techIcon = getTechIcon(tech)

                    return techIcon ? <Icon name={techIcon} sizeClass="icon-sm" aria-hidden="true" /> : undefined
                }}
            />
        </ShowcasePanel>
    )
}
