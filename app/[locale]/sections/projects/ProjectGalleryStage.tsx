'use client'

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import type { Project } from "@shared-types"

type ProjectGalleryStageProps = {
    activeImage: string
    boundedActiveSlide: number
    gallery: string[]
    goToNext: () => void
    goToPrevious: () => void
    hasMultiple: boolean
    isCompactSlide: boolean
    onOpenFullscreen: () => void
    onSelectSlide: (index: number) => void
    project: Project
    fullscreenCtaLabel: string
    fullscreenOpenLabel: string
    nextImageLabel: string
    previousImageLabel: string
    viewImageLabel: (index: number) => string
}

function formatSlideCount(activeIndex: number, total: number) {
    return `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
}

export default function ProjectGalleryStage({
    activeImage,
    boundedActiveSlide,
    gallery,
    goToNext,
    goToPrevious,
    hasMultiple,
    isCompactSlide,
    onOpenFullscreen,
    onSelectSlide,
    project,
    fullscreenCtaLabel,
    fullscreenOpenLabel,
    nextImageLabel,
    previousImageLabel,
    viewImageLabel,
}: ProjectGalleryStageProps) {
    return (
        <div className="project-bento__gallery">
            <div className="project-bento__gallery-main">
                <button type="button" className="project-bento__gallery-stage" onClick={onOpenFullscreen} aria-label={fullscreenOpenLabel}>
                    <AnimatePresence mode="wait">
                        <motion.div key={`${project.id}-${boundedActiveSlide}`} className={`project-bento__gallery-slide${isCompactSlide ? " project-bento__gallery-slide--compact" : ""}`} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.985 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                            <Image src={activeImage} alt={`${project.titleDisplay} — ${boundedActiveSlide + 1}`} fill sizes="(max-width: 900px) 100vw, 66vw" className="project-bento__gallery-img project-bento__gallery-img--main" priority />
                        </motion.div>
                    </AnimatePresence>
                </button>

                <div className="project-bento__gallery-topbar">
                    <button type="button" className="project-bento__fullscreen-btn" onClick={onOpenFullscreen} aria-label={fullscreenOpenLabel}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M5.25 1.75H1.75V5.25M9.75 1.75H13.25V5.25M13.25 9.75V13.25H9.75M1.75 9.75V13.25H5.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span>{fullscreenCtaLabel}</span>
                    </button>
                </div>

                {hasMultiple && <>
                    <div className="project-bento__gallery-controls">
                        <button type="button" className="project-bento__gallery-nav" onClick={goToPrevious} aria-label={previousImageLabel}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M9.5 3.5L5 8L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                        <button type="button" className="project-bento__gallery-nav" onClick={goToNext} aria-label={nextImageLabel}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6.5 3.5L11 8L6.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                    </div>

                    <div className="project-bento__gallery-footer">
                        <div className="project-bento__gallery-progress" aria-hidden="true">
                            {gallery.map((_, index) => <span key={`${project.id}-dot-${index}`} className={`project-bento__gallery-dot${index === boundedActiveSlide ? " project-bento__gallery-dot--active" : ""}`} />)}
                        </div>
                        <span className="project-bento__gallery-count">{formatSlideCount(boundedActiveSlide, gallery.length)}</span>
                    </div>

                    <div className="project-bento__gallery-rail">
                        {gallery.map((image, index) => <button key={`${project.id}-thumb-${index}`} type="button" className={`project-bento__gallery-rail-item${index === boundedActiveSlide ? " project-bento__gallery-rail-item--active" : ""}`} onClick={() => onSelectSlide(index)} aria-label={viewImageLabel(index + 1)} aria-pressed={index === boundedActiveSlide}><span className="project-bento__gallery-rail-image"><Image src={image} alt="" fill sizes="64px" className="project-bento__gallery-img" /></span></button>)}
                    </div>
                </>}
            </div>
        </div>
    )
}