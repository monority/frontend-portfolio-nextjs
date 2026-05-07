'use client'

import { motion, type Transition, type Variants, type ViewportOptions } from 'framer-motion'
import type { ReactNode } from 'react'
import { sectionFadeUp, sectionIntroTransition, sectionViewport } from './motion'
import SectionEyebrow from './SectionEyebrow'
import SectionHeader from './SectionHeader'

type SectionIntroProps = {
    number: string
    label: string
    title?: string
    intro?: string
    className?: string
    eyebrowClassName?: string
    headerClassName?: string
    titleClassName?: string
    introClassName?: string
    headingLevel?: 'h1' | 'h2' | 'h3'
    variants?: Variants
    viewport?: ViewportOptions
    transition?: Transition
    children?: ReactNode
}

export default function SectionIntro({
    number,
    label,
    title,
    intro,
    className = '',
    eyebrowClassName = '',
    headerClassName = '',
    titleClassName = '',
    introClassName = '',
    headingLevel = 'h2',
    variants = sectionFadeUp,
    viewport = sectionViewport,
    transition = sectionIntroTransition,
    children,
}: SectionIntroProps) {
    const rootClasses = ['section-intro', className].filter(Boolean).join(' ')

    return (
        <motion.div
            className={rootClasses}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            transition={transition}
        >
            <SectionEyebrow number={number} label={label} className={eyebrowClassName} />
            {title ? (
                <SectionHeader
                    title={title}
                    intro={intro}
                    className={headerClassName}
                    titleClassName={titleClassName}
                    introClassName={introClassName}
                    headingLevel={headingLevel}
                />
            ) : null}
            {children}
        </motion.div>
    )
}