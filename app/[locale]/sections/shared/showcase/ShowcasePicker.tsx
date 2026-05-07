'use client'

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { sectionFadeUp, sectionStagger, sectionViewport } from "@/components/ui/section/motion"
import { getShowcasePickerTransition } from "./transitions"

type ShowcasePickerProps = {
    className: string
    children: ReactNode
}

type ShowcasePickerItemProps = {
    index: number
    className?: string
    children: ReactNode
}

export function ShowcasePicker({ className, children }: ShowcasePickerProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            variants={sectionStagger}
        >
            {children}
        </motion.div>
    )
}

export function ShowcasePickerItem({ index, className, children }: ShowcasePickerItemProps) {
    return (
        <motion.div
            className={className}
            variants={sectionFadeUp}
            transition={getShowcasePickerTransition(index)}
        >
            {children}
        </motion.div>
    )
}