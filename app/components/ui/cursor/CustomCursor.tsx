"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./cursor.css";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

export function CustomCursor() {
    const mouseX = useMotionValue(-120);
    const mouseY = useMotionValue(-120);

    // Dot: near-instant
    const dotX = useSpring(mouseX, { stiffness: 3000, damping: 100, mass: 0.05 });
    const dotY = useSpring(mouseY, { stiffness: 3000, damping: 100, mass: 0.05 });

    // Ring: trailing lag
    const ringX = useSpring(mouseX, { stiffness: 190, damping: 22, mass: 0.4 });
    const ringY = useSpring(mouseY, { stiffness: 190, damping: 22, mass: 0.4 });

    useEffect(() => {
        const dot = document.querySelector<HTMLElement>(".cursor__dot");
        const ring = document.querySelector<HTMLElement>(".cursor__ring");

        const onMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const onOver = (e: MouseEvent) => {
            if ((e.target as Element | null)?.closest(INTERACTIVE)) {
                dot?.classList.add("is-hover");
                ring?.classList.add("is-hover");
            }
        };

        const onOut = (e: MouseEvent) => {
            if ((e.target as Element | null)?.closest(INTERACTIVE)) {
                dot?.classList.remove("is-hover");
                ring?.classList.remove("is-hover");
            }
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onOver);
        document.addEventListener("mouseout", onOut);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseout", onOut);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            <motion.div
                className="cursor__dot"
                style={{ x: dotX, y: dotY }}
                aria-hidden="true"
            />
            <motion.div
                className="cursor__ring"
                style={{ x: ringX, y: ringY }}
                aria-hidden="true"
            />
        </>
    );
}
