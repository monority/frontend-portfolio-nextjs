'use client'

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import Image from "next/image"
import { CREATION_ICON_BY_ID, CREATION_TOOL_ICON_BY_LABEL, CREATIONS, CREATIONS_CONTENT } from "./data"
import type { CreationItem } from "@shared-types"
import type { IconName } from "@shared-types/icons"
import { SectionIntro, SectionShell } from "@/components/ui/section"
import { sectionStagger, sectionViewport } from "@/components/ui/section/motion"
import { useTheme } from "@/components/ThemeProvider"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon/Icon"
import { openExternalUrl } from "../shared/openExternalUrl"
import { getSectionThemeStyle } from "../shared/panelTheme"
import { ShowcaseListCard, ShowcasePanel, ShowcasePickerItem, ShowcaseTechCard, useActiveShowcaseItem } from "../shared/showcase"

import "./creation.css"

function getCreationIcon(id: string): IconName {
    return CREATION_ICON_BY_ID[id] ?? "arrowRight"
}

function getToolIcon(tool: string): IconName | null {
    return CREATION_TOOL_ICON_BY_LABEL[tool.trim().toLowerCase()] ?? null
}

export default function Creation() {
    const locale = useLocale() as "fr" | "en"
    const { resolvedTheme } = useTheme()
    const { activeId, setActiveId, activeItem: activeCreation } = useActiveShowcaseItem(CREATIONS)
    const content = CREATIONS_CONTENT[locale]

    return (
        <SectionShell id="creation" className="creation">
            <SectionIntro
                number="03"
                label={content.sectionLabel}
                title={content.heading}
                intro={content.intro}
            />

            <div className="creation-stage">
                <motion.aside
                    className="creation-rail"
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionStagger}
                >
                    <div className="creation-rail__intro">
                        <span className="creation-rail__eyebrow">{content.railLabel}</span>
                        <p className="creation-rail__copy">{content.railIntro}</p>
                    </div>

                    <div className="creation-picker">
                        {CREATIONS.map((item, index) => {
                            const iconName = getCreationIcon(item.id)

                            return (
                                <ShowcasePickerItem key={item.id} index={index}>
                                    <Button
                                        variant={activeId === item.id ? "primary" : "outline"}
                                        className={`creation-picker__item${activeId === item.id ? " creation-picker__item--active" : ""}`}
                                        onClick={() => setActiveId(item.id)}
                                        aria-pressed={activeId === item.id}
                                        style={activeId === item.id ? getSectionThemeStyle(item, { resolvedTheme }) : undefined}
                                        leftIcon={<Icon name={iconName} sizeClass="icon-sm" aria-hidden="true" />}
                                    >
                                        <span className="creation-picker__index">{String(index + 1).padStart(2, "0")}</span>
                                        <span className="creation-picker__content">
                                            <span className="creation-picker__label">{item.titleDisplay[locale]}</span>
                                            <span className="creation-picker__meta">{item.category[locale]}</span>
                                        </span>
                                    </Button>
                                </ShowcasePickerItem>
                            )
                        })}
                    </div>
                </motion.aside>

                <CreationPanel creation={activeCreation} locale={locale} content={content} resolvedTheme={resolvedTheme} />
            </div>
        </SectionShell>
    )
}

function CreationPanel({
    creation,
    locale,
    content,
    resolvedTheme,
}: {
    creation: CreationItem
    locale: "fr" | "en"
    content: (typeof CREATIONS_CONTENT)["fr"]
    resolvedTheme: "light" | "dark"
}) {
    return (
        <ShowcasePanel
            panelKey={creation.id}
            className="creation-panel panel-container"
            style={getSectionThemeStyle(creation, { resolvedTheme })}
        >
            <div className="panel-ambient" aria-hidden="true" />

            <article className="creation-panel__hero panel-card">
                <div className="panel-hero-top">
                    <div className="panel-hero-copy">
                        <div className="panel-badges">
                            <Badge variant="premium" size="sm">{creation.category[locale]}</Badge>
                            <Badge variant="outline" size="sm">{creation.status[locale]}</Badge>
                        </div>
                        <h3 className="panel-title creation-panel__title">{creation.titleDisplay[locale]}</h3>
                        <p className="panel-tagline">{creation.tagline[locale]}</p>
                    </div>
                    <div className="panel-meta">
                        <span>{creation.year}</span>
                        <span className="panel-meta-dot" aria-hidden="true" />
                        <span>{creation.title}</span>
                    </div>
                </div>

                <p className="panel-description">{creation.description[locale]}</p>
                <p className="panel-details">{creation.details[locale]}</p>

                <div className="creation-panel__hero-footer">
                    <div className="panel-outputs-list creation-panel__outputs-list--hero">
                        {creation.outputs.map((output) => (
                            <Badge key={output[locale]} variant="info" size="sm">
                                {output[locale]}
                            </Badge>
                        ))}
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => openExternalUrl(creation.link)}
                        rightIcon={<Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" />}
                    >
                        {content.explore}
                    </Button>
                </div>
            </article>

            <ShowcaseListCard
                className="creation-panel__card--stacked"
                label={content.highlights}
                items={creation.highlights.map((highlight) => ({
                    key: highlight[locale],
                    content: highlight[locale],
                }))}
            />

            <ShowcaseTechCard
                className="creation-panel__card--accent"
                label={content.tools}
                items={creation.tools}
                renderIcon={(tool) => {
                    const iconName = getToolIcon(tool)

                    return iconName ? <Icon name={iconName} sizeClass="icon-sm" aria-hidden="true" /> : undefined
                }}
            />

            {creation.visual && (
                <article className="creation-panel__card--visual panel-card panel-card--visual">
                    <div className="panel-visual-frame">
                        <Image
                            src={creation.visual}
                            alt={creation.titleDisplay[locale]}
                            fill
                            className="panel-visual-img"
                            sizes="(max-width: 768px) 100vw, 400px"
                        />
                    </div>
                </article>
            )}
        </ShowcasePanel>
    )
}
