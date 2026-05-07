'use client'

import { AnimatePresence, motion } from "framer-motion"
import { PROJECTS, PROJECTS_CONTENT } from "./data"
import { useLocale } from "next-intl"
import type { Project } from "@shared-types"
import ProjectPicker from "./ProjectPicker"
import ProjectVisual from "./ProjectVisual"
import ProjectBentoDetails from "./ProjectBentoDetails"
import { SectionIntro, SectionShell } from "@/components/ui/section"
import { getSectionThemeStyle } from "../shared/panelTheme"
import { useActiveShowcaseItem } from "../shared/showcase"

function getProjectThemeStyle(project: Project): React.CSSProperties {
    return getSectionThemeStyle(project, {
        resolvedTheme: "dark",
    })
}

export default function Projects() {
    const locale = useLocale() as "fr" | "en"
    const { activeId, setActiveId, activeItem: activeProject } = useActiveShowcaseItem(PROJECTS)
    const content = PROJECTS_CONTENT[locale]

    return (
        <SectionShell id="projects" className="projects">
            <SectionIntro
                number="02"
                label={content.sectionLabel}
                title={content.heading}
                intro={content.intro}
            />

            <ProjectPicker activeId={activeId} content={content} onSelect={setActiveId} projects={PROJECTS} />

            <AnimatePresence mode="wait">
                <ProjectBento key={activeProject.id} project={activeProject} locale={locale} content={content} />
            </AnimatePresence>
        </SectionShell>
    )
}

function ProjectBento({ project, locale, content }: { project: Project; locale: "fr" | "en"; content: (typeof PROJECTS_CONTENT)["fr"] }) {
    return (
        <motion.div className="project-bento" style={getProjectThemeStyle(project)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <ProjectVisual project={project} locale={locale} />
            <ProjectBentoDetails project={project} locale={locale} content={content} />
        </motion.div>
    )
}