'use client'

import Image from "next/image"
import { PROJECT_ICON_BY_ID, PROJECTS_CONTENT } from "./data"
import Icon from "@/components/ui/icon/Icon"
import type { IconName } from "@shared-types/icons"
import { ShowcasePicker, ShowcasePickerItem } from "../shared/showcase"
import type { Project } from "@shared-types"

function getProjectAccentColor(project: Project) {
    return project.palette?.dark.accent ?? project.palette?.light?.accent ?? "var(--foreground)"
}

function getProjectIcon(project: Project): IconName {
    return PROJECT_ICON_BY_ID[project.id] ?? "arrowRight"
}

type ProjectPickerProps = {
    activeId: string
    content: (typeof PROJECTS_CONTENT)["fr"]
    onSelect: (id: string) => void
    projects: Project[]
}

export default function ProjectPicker({ activeId, content, onSelect, projects }: ProjectPickerProps) {
    return (
        <ShowcasePicker className="projects-picker">
            <span className="projects-picker__label">{content.pickerLabel}</span>
            <div className="projects-picker__list">
                {projects.map((project, index) => {
                    const accentColor = getProjectAccentColor(project)

                    return (
                        <ShowcasePickerItem key={project.id} index={index}>
                            <button
                                className={`projects-picker__item${activeId === project.id ? " projects-picker__item--active" : ""}`}
                                onClick={() => onSelect(project.id)}
                                style={activeId === project.id ? ({ "--section-accent": accentColor } as React.CSSProperties) : undefined}
                                aria-label={project.titleDisplay}
                                aria-pressed={activeId === project.id}
                            >
                                <div className="projects-picker__thumb">
                                    <Image src={project.visual} alt={project.titleDisplay} fill sizes="72px" className="projects-picker__thumb-img" />
                                    <span className="projects-picker__thumb-badge" aria-hidden="true">
                                        <Icon name={getProjectIcon(project)} sizeClass="icon-sm" className="projects-picker__thumb-icon" />
                                    </span>
                                </div>
                                <span className="projects-picker__meta">
                                    <span className="projects-picker__name">{project.titleDisplay}</span>
                                </span>
                            </button>
                        </ShowcasePickerItem>
                    )
                })}
            </div>
        </ShowcasePicker>
    )
}