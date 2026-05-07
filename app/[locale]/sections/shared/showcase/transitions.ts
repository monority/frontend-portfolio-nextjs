import type { Transition } from "framer-motion"

const showcaseEase: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const showcasePanelTransition: Transition = {
    duration: 0.35,
    ease: showcaseEase,
}

export function getShowcasePickerTransition(index: number): Transition {
    return {
        duration: 0.45,
        ease: showcaseEase,
        delay: index * 0.05,
    }
}