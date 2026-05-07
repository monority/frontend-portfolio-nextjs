'use client'

import { useState } from "react"
import { PROJECT_TECH_ICON_BY_LABEL, PROJECTS_CONTENT } from "./data"
import Icon from "@/components/ui/icon/Icon"
import type { IconName } from "@shared-types/icons"
import Badge from "@/components/ui/badge"
import Button from "@/components/ui/button"
import type { Project } from "@shared-types"
import { openExternalUrl } from "../shared/openExternalUrl"

type ProjectPaletteMode = "dark" | "light"

function getProjectPalette(project: Project, mode: ProjectPaletteMode) {
    if (mode === "light" && project.palette?.light) {
        return project.palette.light
    }

    return project.palette?.dark ?? project.palette?.light ?? null
}

function getTechIcon(tech: string): IconName | null {
    return PROJECT_TECH_ICON_BY_LABEL[tech.trim().toLowerCase()] ?? null
}

function getProjectPaletteSwatches(project: Project, mode: ProjectPaletteMode) {
    const palette = getProjectPalette(project, mode)
    if (!palette) return []

    return [
        { label: "Accent", color: palette.accent },
        { label: "BG", color: palette.bg },
        { label: "Surface", color: palette.surface },
        { label: "FG", color: palette.fg },
    ]
}

function formatColor(color: string) {
    return color.startsWith("#") ? color.toUpperCase() : color
}

type ProjectBentoDetailsProps = {
    project: Project
    locale: "fr" | "en"
    content: (typeof PROJECTS_CONTENT)["fr"]
}

export default function ProjectBentoDetails({ project, locale, content }: ProjectBentoDetailsProps) {
    const [paletteMode, setPaletteMode] = useState<ProjectPaletteMode>("dark")
    const hasLightPalette = Boolean(project.palette?.light)
    const palette = getProjectPaletteSwatches(project, paletteMode)
    const openLiveProject = () => openExternalUrl(project.live)
    const openGithubProject = () => openExternalUrl(project.github)

    return (
        <>
            <div className="project-bento__card project-bento__palette">
                <div className="project-bento__card-head">
                    <span className="project-bento__card-label">{content.paletteLabel}</span>
                    {hasLightPalette && (
                        <button
                            type="button"
                            className="project-bento__palette-toggle"
                            onClick={() => setPaletteMode((current) => (current === "dark" ? "light" : "dark"))}
                            aria-pressed={paletteMode === "light"}
                        >
                            {paletteMode === "light" ? content.lightMode : content.darkMode}
                        </button>
                    )}
                </div>
                <div className="project-bento__swatches">
                    {palette.map((swatch) => (
                        <div
                            key={swatch.label}
                            className="project-bento__swatch"
                            style={
                                {
                                    "--swatch-color": swatch.color,
                                    "--swatch-border": `color-mix(in srgb, ${swatch.color} 58%, var(--foreground) 42%)`,
                                    "--swatch-border-soft": `color-mix(in srgb, ${swatch.color} 22%, var(--background) 78%)`,
                                } as React.CSSProperties
                            }
                        >
                            <span className="project-bento__swatch-block" aria-hidden="true" />
                            <div className="project-bento__swatch-meta">
                                <span className="project-bento__swatch-name">{swatch.label}</span>
                                <span className="project-bento__swatch-code">{formatColor(swatch.color)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="project-bento__card project-bento__scope">
                <span className="project-bento__card-label">{content.scopeLabel}</span>
                <ul className="project-bento__scope-list">
                    {project.tags.map((tag) => (
                        <li key={tag[locale]} className="project-bento__scope-item">
                            <Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" focusable="false" />
                            {tag[locale]}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="project-bento__card project-bento__title-card">
                <div className="project-bento__title-main">
                    <h3 className="project-bento__title">{project.titleDisplay}</h3>
                    <p className="project-bento__tagline">{project.tagline[locale]}</p>
                    <p className="project-bento__description">{project.description[locale]}</p>
                </div>
                <div className="project-bento__ctas">
                    {project.live && (
                        <Button
                            onClick={openLiveProject}
                            leftIcon={<Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" focusable="false" />}
                        >
                            {content.liveSite}
                        </Button>
                    )}
                    {project.github && (
                        <Button
                            variant="ghost"
                            onClick={openGithubProject}
                            leftIcon={<Icon name="github" sizeClass="icon-sm" aria-hidden="true" focusable="false" />}
                        >
                            {content.github}
                        </Button>
                    )}
                </div>
            </div>

            <div className="project-bento__card project-bento__tech">
                <span className="project-bento__card-label">{content.techStack}</span>
                <div className="project-bento__tech-list">
                    {project.tech.map((tech) => {
                        const techIcon = getTechIcon(tech)

                        return (
                            <Badge
                                key={tech}
                                variant="outline"
                                size="sm"
                                icon={techIcon ? <Icon name={techIcon} sizeClass="icon-sm" aria-hidden="true" /> : undefined}
                            >
                                {tech}
                            </Badge>
                        )
                    })}
                </div>
            </div>
        </>
    )
}