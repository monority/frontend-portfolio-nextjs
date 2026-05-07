'use client'

import { AnimatePresence } from "framer-motion"
import { PROJECTS_CONTENT } from "./data"
import type { Project } from "@shared-types"
import ProjectGalleryModal from "./ProjectGalleryModal"
import ProjectGalleryStage from "./ProjectGalleryStage"
import { useProjectGallery } from "./useProjectGallery"

export default function ProjectVisual({ project, locale }: { project: Project; locale: "fr" | "en" }) {
    const content = PROJECTS_CONTENT[locale]
    const {
        activeImage,
        boundedActiveSlide,
        clampZoom,
        closeFullscreen,
        gallery,
        goToNext,
        goToPrevious,
        hasMultiple,
        isCompactSlide,
        isFullscreenOpen,
        maxZoom,
        minZoom,
        openFullscreen,
        setActiveSlide,
        setZoom,
        zoom,
        zoomStep,
    } = useProjectGallery(project)

    const zoomLabel = "Zoom"
    const fullscreenLabel = content.openFullscreenGallery
    const resetZoomLabel = content.resetZoom
    const closeLabel = content.closeModal

    return (
        <div className="project-bento__visual">
            <ProjectGalleryStage
                activeImage={activeImage}
                boundedActiveSlide={boundedActiveSlide}
                gallery={gallery}
                goToNext={goToNext}
                goToPrevious={goToPrevious}
                hasMultiple={hasMultiple}
                isCompactSlide={isCompactSlide}
                onOpenFullscreen={openFullscreen}
                onSelectSlide={setActiveSlide}
                project={project}
                fullscreenCtaLabel={content.fullscreen}
                fullscreenOpenLabel={fullscreenLabel}
                nextImageLabel={content.nextImage}
                previousImageLabel={content.previousImage}
                viewImageLabel={content.viewImage}
            />

            <AnimatePresence>
                {isFullscreenOpen && <ProjectGalleryModal
                    activeImage={activeImage}
                    boundedActiveSlide={boundedActiveSlide}
                    clampZoom={clampZoom}
                    closeLabel={closeLabel}
                    gallery={gallery}
                    goToNext={goToNext}
                    goToPrevious={goToPrevious}
                    hasMultiple={hasMultiple}
                    isCompactSlide={isCompactSlide}
                    nextImageLabel={content.nextImage}
                    onClose={closeFullscreen}
                    onSelectSlide={setActiveSlide}
                    project={project}
                    previousImageLabel={content.previousImage}
                    resetZoomLabel={resetZoomLabel}
                    setZoom={setZoom}
                    showImageLabel={content.showImage}
                    zoom={zoom}
                    zoomInLabel={content.zoomIn}
                    zoomLabel={zoomLabel}
                    zoomOutLabel={content.zoomOut}
                    zoomStep={zoomStep}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                />}
            </AnimatePresence>
        </div>
    )
}
