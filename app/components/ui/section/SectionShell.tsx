import type { ReactNode } from 'react'

type SectionShellProps = {
    id: string
    className?: string
    shellClassName?: string
    children: ReactNode
}

export default function SectionShell({
    id,
    className = '',
    shellClassName = '',
    children,
}: SectionShellProps) {
    const sectionClasses = className.trim() || undefined
    const shellClasses = ['section-shell', 'shell', shellClassName].filter(Boolean).join(' ')

    return (
        <section className={sectionClasses} id={id}>
            <div className={shellClasses}>{children}</div>
        </section>
    )
}