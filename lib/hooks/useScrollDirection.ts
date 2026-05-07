"use client";

import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

const THRESHOLD = 8;

export function useScrollDirection(): ScrollDirection {
    const [direction, setDirection] = useState<ScrollDirection>("up");
    const lastY = useRef(0);

    useEffect(() => {
        const controller = new AbortController();

        const handleScroll = () => {
            const y = window.scrollY;
            const delta = y - lastY.current;

            if (Math.abs(delta) < THRESHOLD) return;

            setDirection(delta > 0 ? "down" : "up");
            lastY.current = y;
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
            signal: controller.signal,
        });

        return () => controller.abort();
    }, []);

    return direction;
}