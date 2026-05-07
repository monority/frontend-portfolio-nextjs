import './section.css'

type SectionSubheaderProps = {
    label: string
    className?: string
    textClassName?: string
    lineClassName?: string
}

export default function SectionSubheader({
    label,
    className = '',
    textClassName = '',
    lineClassName = '',
}: SectionSubheaderProps) {
    const rootClasses = ['section-subheader', className].filter(Boolean).join(' ')
    const textClasses = ['section-subheader__text', textClassName].filter(Boolean).join(' ')
    const lineClasses = ['section-subheader__line', lineClassName].filter(Boolean).join(' ')

    return (
        <div className={rootClasses}>
            <span className={textClasses}>{label}</span>
            <span className={lineClasses} aria-hidden="true" />
        </div>
    )
}