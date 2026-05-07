'use client'

import Image from "next/image"
import { useLocale } from "next-intl"
import type { Module } from "@shared-types"
import type { IconName } from "@shared-types/icons"
import { SectionIntro, SectionShell } from "@/components/ui/section"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon/Icon"
import { MODULES, MODULES_CONTENT, MODULE_TECH_ICON_BY_LABEL } from "./data"
import { useTheme } from "@/components/ThemeProvider"
import { openExternalUrl } from "../shared/openExternalUrl"
import { getSectionThemeStyle } from "../shared/panelTheme"
import { ShowcaseListCard, ShowcasePanel, ShowcasePicker, ShowcasePickerItem, ShowcaseTechCard, useActiveShowcaseItem } from "../shared/showcase"

import "./modules.css"

function getTechIcon(tech: string): IconName | null {
    return MODULE_TECH_ICON_BY_LABEL[tech.trim().toLowerCase()] ?? null
}

export default function Modules() {
    const locale = useLocale() as "fr" | "en"
    const { resolvedTheme } = useTheme()
    const { activeId, setActiveId, activeItem: activeModule } = useActiveShowcaseItem(MODULES)
    const content = MODULES_CONTENT[locale]

    return (
        <SectionShell id="modules" className="modules">
            <SectionIntro
                number="04"
                label={content.sectionLabel}
                title={content.heading}
                intro={content.intro}
            />

            <ShowcasePicker className="modules-picker">
                {MODULES.map((module, index) => (
                    <ShowcasePickerItem key={module.id} index={index}>
                        <button
                            type="button"
                            className={`modules-picker__item${activeId === module.id ? " modules-picker__item--active" : ""}`}
                            onClick={() => setActiveId(module.id)}
                            aria-pressed={activeId === module.id}
                            aria-label={module.titleDisplay}
                            style={activeId === module.id ? getSectionThemeStyle(module, { resolvedTheme }) : undefined}
                        >
                            <Image
                                className="modules-picker__image"
                                src={`/images/modules/${module.id}.svg`}
                                alt=""
                                width={96}
                                height={96}
                                aria-hidden="true"
                            />
                            <span className="modules-picker__copy">
                                <span className="modules-picker__name">{module.titleDisplay}</span>
                                <span className="modules-picker__meta">{module.category[locale]}</span>
                            </span>
                        </button>
                    </ShowcasePickerItem>
                ))}
            </ShowcasePicker>

            <ModulePanel module={activeModule} locale={locale} content={content} resolvedTheme={resolvedTheme} />
        </SectionShell>
    )
}

function ModulePanel({
    module,
    locale,
    content,
    resolvedTheme,
}: {
    module: Module
    locale: "fr" | "en"
    content: (typeof MODULES_CONTENT)["fr"]
    resolvedTheme: "light" | "dark"
}) {
    return (
        <ShowcasePanel
            panelKey={module.id}
            className="module-panel panel-container"
            style={getSectionThemeStyle(module, { resolvedTheme })}
        >
            <div className="panel-ambient" aria-hidden="true" />

            <article className="module-panel__hero panel-card">
                <div className="panel-hero-top">
                    <div className="panel-hero-copy">
                        <span className="module-panel__kicker">{module.category[locale]}</span>
                        <h3 className="panel-title module-panel__title">{module.titleDisplay}</h3>
                        <p className="panel-tagline module-panel__tagline">{module.tagline[locale]}</p>
                    </div>
                    <div className="panel-meta">
                        <span>{module.year}</span>
                        <span className="panel-meta-dot" aria-hidden="true" />
                        <span>{content.miniLabel}</span>
                    </div>
                </div>

                <p className="panel-description">{module.description[locale]}</p>
                <p className="panel-details">{module.details[locale]}</p>

                {(module.live || module.github || module.npm) && (
                    <div className="panel-actions">
                        {module.live && (
                            <Button
                                variant="primary"
                                onClick={() => openExternalUrl(module.live)}
                                rightIcon={<Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" />}
                            >
                                {content.live}
                            </Button>
                        )}
                        {module.github && (
                            <Button
                                variant="primary"
                                onClick={() => openExternalUrl(module.github)}
                                leftIcon={<Icon name="github" sizeClass="icon-sm" aria-hidden="true" />}
                            >
                                {content.github}
                            </Button>
                        )}
                        {module.npm && (
                            <Button
                                variant="secondary"
                                onClick={() => openExternalUrl(module.npm)}
                                leftIcon={<Icon name="npm" sizeClass="icon-sm" aria-hidden="true" />}
                            >
                                {content.npm}
                            </Button>
                        )}
                    </div>
                )}
            </article>

            <ShowcaseListCard
                label={content.highlights}
                items={module.highlights.map((highlight) => ({
                    key: highlight[locale],
                    content: highlight[locale],
                }))}
            />

            <ShowcaseTechCard
                label={content.stack}
                items={module.tech}
                renderIcon={(tech) => {
                    const techIcon = getTechIcon(tech)

                    return techIcon ? <Icon name={techIcon} sizeClass="icon-sm" aria-hidden="true" /> : undefined
                }}
            />
        </ShowcasePanel>
    )
}
