"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

type ContactKind = "email" | "phone";
type LoadState = "idle" | "loading" | "ready" | "error" | "copied";

const contactKinds: ContactKind[] = ["email", "phone"];

function getCssVar(name: string, fallback: string) {
    if (typeof window === "undefined") {
        return fallback;
    }

    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function drawContactCanvas(canvas: HTMLCanvasElement, value: string) {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const width = Math.max(158, rect.width);
    const height = Math.max(28, rect.height);
    const foreground = getCssVar("--foreground", "#111111");

    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return;
    }

    ctx.scale(ratio, ratio);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = foreground;
    const fontFamily = getCssVar("--font-family-sans", "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace");
    ctx.font = `500 13px ${fontFamily}`;
    ctx.textBaseline = "middle";

    const maxWidth = width - 4;
    let displayValue = value;

    while (ctx.measureText(displayValue).width > maxWidth && displayValue.length > 4) {
        displayValue = `${displayValue.slice(0, -5)}...`;
    }

    ctx.fillText(displayValue, 2, height / 2);
}

function ContactPill({ kind }: { kind: ContactKind }) {
    const t = useTranslations("hero.contact");
    const pillRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const copyResetTimeoutRef = useRef<number | null>(null);
    const [value, setValue] = useState("");
    const [loadState, setLoadState] = useState<LoadState>("idle");
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const isRevealed = Boolean(value);
    const isPopoverVisible = isRevealed && isPopoverOpen;

    const drawCurrentValue = useCallback(() => {
        if (!canvasRef.current || !value) {
            return;
        }

        drawContactCanvas(canvasRef.current, value);
    }, [value]);

    useEffect(() => {
        drawCurrentValue();

        if (!canvasRef.current || typeof ResizeObserver === "undefined") {
            return;
        }

        const observer = new ResizeObserver(drawCurrentValue);
        observer.observe(canvasRef.current);

        return () => observer.disconnect();
    }, [drawCurrentValue, isPopoverVisible]);

    useEffect(() => {
        function handlePointerDown(event: PointerEvent) {
            if (!pillRef.current || !pillRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false);
            }
        }

        document.addEventListener("pointerdown", handlePointerDown);

        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, []);

    useEffect(() => {
        if (loadState !== "copied") {
            return;
        }

        copyResetTimeoutRef.current = window.setTimeout(() => {
            setLoadState("ready");
            copyResetTimeoutRef.current = null;
        }, 2000);

        return () => {
            if (copyResetTimeoutRef.current !== null) {
                window.clearTimeout(copyResetTimeoutRef.current);
                copyResetTimeoutRef.current = null;
            }
        };
    }, [loadState]);

    async function revealContact() {
        if (isRevealed) {
            setIsPopoverOpen(true);
            return;
        }

        setLoadState("loading");

        try {
            const response = await fetch(`/api/contact?type=${kind}`, { cache: "no-store" });

            if (!response.ok) {
                throw new Error("Contact unavailable");
            }

            const data = (await response.json()) as { value?: string };

            if (!data.value) {
                throw new Error("Contact unavailable");
            }

            setValue(data.value);
            setLoadState("ready");
            setIsPopoverOpen(true);
        } catch {
            setValue("");
            setLoadState("error");
        }
    }

    async function copyContact() {
        if (!value) {
            return;
        }

        if (copyResetTimeoutRef.current !== null) {
            window.clearTimeout(copyResetTimeoutRef.current);
            copyResetTimeoutRef.current = null;
        }

        await navigator.clipboard.writeText(value);
        setLoadState("copied");
    }

    return (
        <div ref={pillRef} className="hero-contact__pill" data-state={loadState} data-revealed={isRevealed}>
            <Button
                className="hero-contact__trigger hero-contact__btn"
                onClick={revealContact}
                disabled={loadState === "loading"}
                aria-expanded={isPopoverVisible}
                aria-label={loadState === "error" ? t("error") : isRevealed ? t(`${kind}.canvasLabel`) : t(`${kind}.button`)}
                variant="primary"
                size="lg"
                rightIcon={<Icon name={kind === "email" ? "email" : "phone"} sizeClass="icon-md" aria-hidden="true" />}
            >
            </Button>
            {isPopoverVisible ? (
                <div className="hero-contact__popover" role="status">
                    <canvas
                        ref={canvasRef}
                        className="hero-contact__canvas"
                        aria-label={t("canvasAria")}
                    />
                    <Button
                        className="hero-contact__copy"
                        onClick={copyContact}
                        aria-label={loadState === "copied" ? t("copied") : t("copy")}
                        title={loadState === "copied" ? t("copied") : t("copy")}
                        variant="primary"
                        size="sm"
                    >
                        <Icon
                            name={loadState === "copied" ? "check" : "copy"}
                            sizeClass="icon-md"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}

export default function ContactReveal() {
    const t = useTranslations("hero.contact");

    return (
        <motion.div
            className="hero-contact"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            aria-label={t("actionsLabel")}
        >
            {contactKinds.map((kind) => (
                <ContactPill key={kind} kind={kind} />
            ))}
        </motion.div>
    );
}
