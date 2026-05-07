import { useEffect, useState } from "react"
import type { Project } from "@shared-types"

const MIN_ZOOM = 1
const MAX_ZOOM = 3.2
const ZOOM_STEP = 0.2
const COMPACT_GALLERY_IMAGES = new Set([
    "/images/projects/dashboard/dashboard-3.webp",
    "/images/projects/dashboard/dashboard-4.webp",
])

function clampZoom(value: number) {
    return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))))
}

function isCompactGalleryImage(projectId: string, imagePath: string) {
    return projectId === "dashboard-rch" && COMPACT_GALLERY_IMAGES.has(imagePath)
}

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)

        const updateMatches = () => setMatches(mediaQuery.matches)
        updateMatches()

        mediaQuery.addEventListener("change", updateMatches)

        return () => mediaQuery.removeEventListener("change", updateMatches)
    }, [query])

    return matches
}

export function useProjectGallery(project: Project) {
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const gallery = (isDesktop ? project.galleryDesktop : undefined) ?? project.gallery ?? [project.visual]
    const hasMultiple = gallery.length >= 2
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
    const [zoom, setZoom] = useState(MIN_ZOOM)
    const boundedActiveSlide = gallery.length === 0 ? 0 : Math.min(activeSlide, gallery.length - 1)
    const activeImage = gallery[boundedActiveSlide]
    const isCompactSlide = isCompactGalleryImage(project.id, activeImage)

    useEffect(() => {
        if (!isFullscreenOpen) return undefined

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [isFullscreenOpen])

    useEffect(() => {
        if (!isFullscreenOpen) return undefined

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsFullscreenOpen(false)
            if (hasMultiple && event.key === "ArrowLeft") {
                event.preventDefault()
                setActiveSlide((current) => (current === 0 ? gallery.length - 1 : current - 1))
            }
            if (hasMultiple && event.key === "ArrowRight") {
                event.preventDefault()
                setActiveSlide((current) => (current === gallery.length - 1 ? 0 : current + 1))
            }
            if (event.key === "+" || event.key === "=") {
                event.preventDefault()
                setZoom((current) => clampZoom(current + ZOOM_STEP))
            }
            if (event.key === "-") {
                event.preventDefault()
                setZoom((current) => clampZoom(current - ZOOM_STEP))
            }
            if (event.key === "0") {
                event.preventDefault()
                setZoom(MIN_ZOOM)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [gallery.length, hasMultiple, isFullscreenOpen])

    const goToPrevious = () => setActiveSlide((current) => {
        const safeCurrent = Math.min(current, gallery.length - 1)
        return safeCurrent === 0 ? gallery.length - 1 : safeCurrent - 1
    })

    const goToNext = () => setActiveSlide((current) => {
        const safeCurrent = Math.min(current, gallery.length - 1)
        return safeCurrent === gallery.length - 1 ? 0 : safeCurrent + 1
    })

    const openFullscreen = () => {
        setIsFullscreenOpen(true)
        setZoom(MIN_ZOOM)
    }

    const closeFullscreen = () => setIsFullscreenOpen(false)

    return {
        activeImage,
        boundedActiveSlide,
        closeFullscreen,
        gallery,
        goToNext,
        goToPrevious,
        hasMultiple,
        isCompactSlide,
        isFullscreenOpen,
        openFullscreen,
        setActiveSlide,
        setZoom,
        zoom,
        minZoom: MIN_ZOOM,
        maxZoom: MAX_ZOOM,
        zoomStep: ZOOM_STEP,
        clampZoom,
    }
}