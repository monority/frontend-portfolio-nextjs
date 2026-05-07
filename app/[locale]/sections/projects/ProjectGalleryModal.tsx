'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import type { Project } from "@shared-types"

type ProjectGalleryModalProps = {
    activeImage: string
    boundedActiveSlide: number
    clampZoom: (value: number) => number
    closeLabel: string
    gallery: string[]
    goToNext: () => void
    goToPrevious: () => void
    hasMultiple: boolean
    isCompactSlide: boolean
    nextImageLabel: string
    onClose: () => void
    onSelectSlide: (index: number) => void
    project: Project
    previousImageLabel: string
    resetZoomLabel: string
    setZoom: React.Dispatch<React.SetStateAction<number>>
    showImageLabel: (index: number) => string
    zoom: number
    zoomInLabel: string
    zoomLabel: string
    zoomOutLabel: string
    zoomStep: number
    minZoom: number
    maxZoom: number
}

function formatSlideCount(activeIndex: number, total: number) {
    return `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`
}

export default function ProjectGalleryModal({
    activeImage,
    boundedActiveSlide,
    clampZoom,
    closeLabel,
    gallery,
    goToNext,
    goToPrevious,
    hasMultiple,
    isCompactSlide,
    nextImageLabel,
    onClose,
    onSelectSlide,
    project,
    previousImageLabel,
    resetZoomLabel,
    setZoom,
    showImageLabel,
    zoom,
    zoomInLabel,
    zoomLabel,
    zoomOutLabel,
    zoomStep,
    minZoom,
    maxZoom,
}: ProjectGalleryModalProps) {
    return (
        <motion.div className="project-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div className="project-modal__surface" initial={{ opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${project.titleDisplay} gallery`}>
                <div className="project-modal__toolbar">
                    <div className="project-modal__heading">
                        <span className="project-modal__eyebrow">{project.titleDisplay}</span>
                        <span className="project-modal__count">{formatSlideCount(boundedActiveSlide, gallery.length)}</span>
                    </div>

                    <div className="project-modal__zoom-group">
                        <button type="button" className="project-modal__tool-btn" onClick={() => setZoom((current) => clampZoom(current - zoomStep))} aria-label={zoomOutLabel}>-</button>
                        <label className="project-modal__zoom-slider-wrap">
                            <span className="project-modal__zoom-label">{zoomLabel}</span>
                            <input type="range" min={minZoom} max={maxZoom} step={zoomStep} value={zoom} onChange={(event) => setZoom(clampZoom(Number(event.target.value)))} className="project-modal__zoom-slider" aria-label={zoomLabel} />
                            <span className="project-modal__zoom-value">{zoom.toFixed(1)}x</span>
                        </label>
                        <button type="button" className="project-modal__tool-btn" onClick={() => setZoom((current) => clampZoom(current + zoomStep))} aria-label={zoomInLabel}>+</button>
                        <button type="button" className="project-modal__tool-btn project-modal__tool-btn--text" onClick={() => setZoom(minZoom)} aria-label={resetZoomLabel}>1x</button>
                    </div>

                    <button type="button" className="project-modal__close-btn" onClick={onClose} aria-label={closeLabel}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                </div>

                <div className="project-modal__body">
                    {hasMultiple && <button type="button" className="project-modal__nav" onClick={goToPrevious} aria-label={previousImageLabel}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M10.75 4.5L6.25 9L10.75 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>}

                    <div className="project-modal__viewport">
                        <div className="project-modal__image-shell">
                            <motion.div key={`${project.id}-modal-${boundedActiveSlide}`} className={`project-modal__image-zoom${isCompactSlide ? " project-modal__image-zoom--compact" : ""}`} animate={{ scale: zoom }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}>
                                <Image src={activeImage} alt={`${project.titleDisplay} — ${boundedActiveSlide + 1}`} fill sizes="100vw" className={`project-modal__image${isCompactSlide ? " project-modal__image--compact" : ""}`} priority />
                            </motion.div>
                        </div>
                    </div>

                    {hasMultiple && <button type="button" className="project-modal__nav" onClick={goToNext} aria-label={nextImageLabel}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M7.25 4.5L11.75 9L7.25 13.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>}
                </div>

                {hasMultiple && <div className="project-modal__filmstrip">{gallery.map((image, index) => <button key={`${project.id}-modal-thumb-${index}`} type="button" className={`project-modal__thumb${index === boundedActiveSlide ? " project-modal__thumb--active" : ""}`} onClick={() => onSelectSlide(index)} aria-label={showImageLabel(index + 1)} aria-pressed={index === boundedActiveSlide}><span className="project-modal__thumb-image"><Image src={image} alt="" fill sizes="72px" className="project-bento__gallery-img" /></span></button>)}</div>}
            </motion.div>
        </motion.div>
    )
}