'use client'

import Icon from "@/components/ui/icon/Icon"
import { useLocale } from "next-intl"

const ONGOING_PROJECTS = [
    {
        id: "lumen",
        name: "Lumen",
        accent: "#7dd3fc",
        href: "https://lumen.vercel.app",
        description: {
            fr: "Un site pour visualiser l'espace, ses volumes et ses ambiances.",
            en: "A site for visualising space, its volumes and its atmospheres.",
        },
        action: {
            fr: "Explorer Lumen",
            en: "Explore Lumen",
        },
    },
    {
        id: "gym-empire",
        name: "Gym Empire",
        accent: "#bef264",
        href: "https://gymempire.vercel.app",
        description: {
            fr: "Une application de musculation pensée pour structurer chaque séance.",
            en: "A strength-training app designed to structure every workout.",
        },
        action: {
            fr: "Ouvrir Gym Empire",
            en: "Open Gym Empire",
        },
    },
] as const

export default function OngoingProjects() {
    const locale = useLocale() as "fr" | "en"
    const copy = locale === "fr"
        ? { eyebrow: "En cours", title: "Les prochains projets prennent forme.", status: "Construction active" }
        : { eyebrow: "In progress", title: "The next projects are taking shape.", status: "Active build" }

    return (
        <section className="projects-ongoing" aria-labelledby="projects-ongoing-title">
            <div className="projects-ongoing__header">
                <span className="projects-ongoing__eyebrow">{copy.eyebrow}</span>
                <h2 id="projects-ongoing-title">{copy.title}</h2>
            </div>

            <div className="projects-ongoing__grid">
                {ONGOING_PROJECTS.map((project) => (
                    <article key={project.id} className="projects-ongoing__card" style={{ "--ongoing-accent": project.accent } as React.CSSProperties}>
                        <div className="projects-ongoing__card-content">
                            <div className="projects-ongoing__card-topline">
                                <span className="projects-ongoing__status"><span aria-hidden="true" />{copy.status}</span>
                                <span className="projects-ongoing__index">0{ONGOING_PROJECTS.indexOf(project) + 1}</span>
                            </div>
                            <h3>{project.name}</h3>
                            <p>{project.description[locale]}</p>
                            <a href={project.href} target="_blank" rel="noreferrer" className="projects-ongoing__link">
                                {project.action[locale]}
                                <Icon name="arrowRight" sizeClass="icon-sm" aria-hidden="true" focusable="false" />
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
