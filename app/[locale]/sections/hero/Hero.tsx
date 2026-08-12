"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ActionLink from "@/components/ui/action-link";
import { Icon } from "@/components/ui/icon";
import GitHubContributions from "@/components/GitHubContributions";
import { sectionFadeUp, sectionStagger } from "@/components/ui/section/motion";
import ContactReveal from "./ContactReveal";

gsap.registerPlugin(ScrollTrigger);

const heroEase = [0.16, 1, 0.3, 1] as const;

// Option A: per-character animation variants
const charVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const wordContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

function AnimatedTitle({ text }: { text: string }) {
    const words = text.split(" ");
    return (
        <h1 className="hero-header__job heading-title" aria-label={text}>
            {words.map((word, wi) => (
                <span key={wi} style={{ display: "block" }}>
                    <motion.span
                        variants={wordContainer}
                        initial="hidden"
                        animate="visible"
                        aria-hidden="true"
                        style={{ display: "inline-block", whiteSpace: "nowrap" }}
                    >
                        {word.split("").map((char, ci) => (
                            <motion.span
                                key={ci}
                                className="hero-title__char"
                                variants={charVariants}
                                transition={{ duration: 0.45, ease: heroEase }}
                                style={{ display: "inline-block" }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.span>
                </span>
            ))}
        </h1>
    );
}

export default function Hero() {
    const t = useTranslations("hero");
    const avatarParallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(avatarParallaxRef.current, {
                y: -40,
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <section
            className="hero"
            id="hero"
        >
            <div className="hero-shell" style={{ position: "relative", zIndex: 1 }}>
                <motion.div
                    className="hero-layout"
                    variants={sectionStagger}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        className="hero-header"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.7, ease: heroEase }}
                    >
                        <div className="hero-header__titles">
                            <AnimatedTitle text={t("role")} />
                        </div>
                        <div className="hero-header__legend">
                            <div ref={avatarParallaxRef}>
                                <motion.div
                                    className="hero-header__avatar"
                                    initial={{ clipPath: "inset(100% 0 0 0 round 1.2rem)" }}
                                    animate={{ clipPath: "inset(0% 0 0 0 round 1.2rem)" }}
                                    transition={{ duration: 0.9, ease: heroEase, delay: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <Image
                                        src="/images/avatar.webp"
                                        alt={t("imageAlt")}
                                        width={720}
                                        height={960}
                                        className="hero-header__image"
                                        loading="eager"
                                        fetchPriority="high"
                                    />
                                </motion.div>
                            </div>
                            <span className="hero-header__caption">{t("avatarCaption")}</span>
                            <div className="hero-header__github">
                                <GitHubContributions username="monority" year={2026} />
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="hero__description"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.65, ease: heroEase }}
                    >
                        <h2>{t("name")}</h2>
                        <p className="hero__description-text">{t("description")}</p>
                    </motion.div>
                    <motion.div
                        className="hero__city"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.6, ease: heroEase }}
                    >
                        <Icon name="location" sizeClass="icon-sm" />
                        <span className="hero__text-muted">{t("city")}</span>
                    </motion.div>
                    <motion.div
                        className="hero__availability"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.6, ease: heroEase }}
                    >
                        <span className="hero__availability-dot" aria-hidden="true" />
                        <p className="hero__text-muted">{t("availability")}</p>
                    </motion.div>
                    <motion.div
                        className="hero__cta"
                        variants={sectionFadeUp}
                        transition={{ duration: 0.55, ease: heroEase }}
                    >
                        <ActionLink href="#projects" label={t("cta")} variant="solid" size="md" />
                    </motion.div>
                    <ContactReveal />
                </motion.div>
            </div>
        </section>
    );
}
