import type { ReactNode } from "react"
import Badge from "@/components/ui/badge"

type ShowcaseListCardProps = {
    label: string
    items: Array<{
        key: string
        content: ReactNode
    }>
    className?: string
    bulletClassName?: string
}

type ShowcaseTechCardProps = {
    label: string
    items: string[]
    className?: string
    renderIcon?: (item: string) => ReactNode
}

export function ShowcaseListCard({
    label,
    items,
    className = "",
    bulletClassName = "",
}: ShowcaseListCardProps) {
    const rootClassName = [className, "panel-card"].filter(Boolean).join(" ")
    const bulletClasses = ["panel-list-bullet", bulletClassName].filter(Boolean).join(" ")

    return (
        <article className={rootClassName}>
            <span className="panel-label">{label}</span>
            <ul className="panel-list">
                {items.map((item) => (
                    <li key={item.key} className="panel-list-item">
                        <span className={bulletClasses} aria-hidden="true" />
                        <span>{item.content}</span>
                    </li>
                ))}
            </ul>
        </article>
    )
}

export function ShowcaseTechCard({
    label,
    items,
    className = "",
    renderIcon,
}: ShowcaseTechCardProps) {
    const rootClassName = [className, "panel-card"].filter(Boolean).join(" ")

    return (
        <article className={rootClassName}>
            <span className="panel-label">{label}</span>
            <div className="panel-tech">
                {items.map((item) => (
                    <Badge
                        key={item}
                        variant="outline"
                        size="sm"
                        icon={renderIcon ? renderIcon(item) : undefined}
                    >
                        {item}
                    </Badge>
                ))}
            </div>
        </article>
    )
}