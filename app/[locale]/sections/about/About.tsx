'use client'

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icon";
import { SectionEyebrow, SectionShell } from "@/components/ui/section";
import {
    sectionFadeLeft,
    sectionFadeUp,
    sectionStagger,
    sectionViewport,
} from "@/components/ui/section/motion";
import { TECH_BENTO_GROUPS, MARQUEE_ITEMS } from "./data";
import type { TechItem } from "./data";

import "./about.css";

const TECH_BENTO_CONTAINER = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

function TechChip({ item }: { item: TechItem }) {
    const sizeClass = item.level === 'primary' ? 'icon-md' : 'icon-sm'
    return (
        <div className={`tech-chip tech-chip--${item.level}`}>
            <Icon name={item.id} sizeClass={sizeClass} aria-hidden="true" />
            <span>{item.label}</span>
        </div>
    )
}

export default function About() {
    const t = useTranslations("about");
    const viewport = { ...sectionViewport, amount: 0.2 } as const;

    const stats = [
        { value: t("stats.years"), label: t("stats.yearsLabel") },
        { value: t("stats.projects"), label: t("stats.projectsLabel") },
        { value: t("stats.location"), label: t("stats.locationLabel") },
    ] as const;

    const groupTitle = (id: string) =>
        id === 'frontend' ? 'Front-end' : t(`tech.${id}`)

    return (
        <SectionShell id="about" className="about">
            <motion.div variants={sectionFadeLeft} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <SectionEyebrow number="01" label={t("title")} />
            </motion.div>

            <div className="about-content">
                <div className="about-left">
                    <div className="about-stats">
                        {stats.map((stat, index) => (
                            <motion.div key={stat.label} className="about-stat" variants={sectionFadeUp} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}>
                                <span className="about-stat__value">{stat.value}</span>
                                <span className="about-stat__label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className="about-available" variants={sectionFadeUp} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
                        <span className="about-available__dot" aria-hidden="true" />
                        <span className="about-available__text">{t("availability")}</span>
                    </motion.div>
                </div>

                <motion.p className="about-bio" variants={sectionFadeUp} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    {t("description")}
                </motion.p>
            </div>

            <div className="about-marquee" aria-hidden="true">
                <ul className="about-marquee__track">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                        <li key={`${item.label}-${index}`} className="about-marquee__item">
                            <Icon name={item.icon} sizeClass="icon-sm" />
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <motion.div
                className="about-tech-bento"
                variants={TECH_BENTO_CONTAINER}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
            >
                {TECH_BENTO_GROUPS.map((group) => (
                    <motion.div
                        key={group.id}
                        className={`about-bento-tile about-bento-tile--${group.id}`}
                        variants={sectionFadeUp}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="about-bento-tile__title">{groupTitle(group.id)}</p>
                        <motion.ul
                            className="about-bento-tile__list"
                            variants={sectionStagger}
                        >
                            {group.items.map((item) => (
                                <li key={item.id}>
                                    <TechChip item={item} />
                                </li>
                            ))}
                        </motion.ul>
                    </motion.div>
                ))}
            </motion.div>
        </SectionShell>
    );
}