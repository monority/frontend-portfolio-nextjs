'use client'

import { useState } from "react"

type ShowcaseItem = {
    id: string
}

export function useActiveShowcaseItem<T extends ShowcaseItem>(items: readonly T[]) {
    const initialItem = items[0]

    if (!initialItem) {
        throw new Error("useActiveShowcaseItem requires at least one item")
    }

    const [activeId, setActiveId] = useState<string>(initialItem.id)
    const activeItem = items.find((item) => item.id === activeId) ?? initialItem

    return {
        activeId,
        setActiveId,
        activeItem,
    }
}