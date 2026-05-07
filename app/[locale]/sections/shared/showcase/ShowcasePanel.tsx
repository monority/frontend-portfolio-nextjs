'use client'

import { AnimatePresence, motion } from "framer-motion"
import type { CSSProperties, ReactNode } from "react"
import { showcasePanelTransition } from "./transitions"

type ShowcasePanelProps = {
    panelKey: string
    className: string
    style: CSSProperties
    children: ReactNode
}

export function ShowcasePanel({
    panelKey,
    className,
    style,
    children,
}: ShowcasePanelProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={panelKey}
                className={className}
                style={style}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={showcasePanelTransition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}