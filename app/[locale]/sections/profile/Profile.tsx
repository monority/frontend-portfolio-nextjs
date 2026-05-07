'use client'

import { motion } from "framer-motion";
import { SectionEyebrow, SectionHeader, SectionShell, SectionSubheader } from "@/components/ui/section";
import {
    sectionFadeLeft,
    sectionFadeUp,
    sectionStagger,
    sectionViewport,
} from "@/components/ui/section/motion";
import { QUALITIES } from "./data";
import { useTranslations } from "next-intl";

import "./profile.css";

const QUALITY_KEYS = ["screens", "components", "backend", "finish"] as const;
const METHOD_KEYS = ["understand", "usage", "foundation", "finish"] as const;

export default function Profile() {
    const t = useTranslations("profile");

    const qualityCards = QUALITY_KEYS.map((key, index) => ({
        number: QUALITIES[index].number,
        title: t(`qualities.${key}.title`),
        desc: t(`qualities.${key}.desc`),
        context: t(`qualities.${key}.context`),
    }));

    const methodSteps = METHOD_KEYS.map((key, index) => ({
        number: `${index + 1}`.padStart(2, "0"),
        title: t(`method.${key}.title`),
        desc: t(`method.${key}.desc`),
    }));

    return (
        <SectionShell id="profile" className="profile">
            <motion.div variants={sectionFadeLeft} initial="hidden" whileInView="visible" viewport={sectionViewport} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <SectionEyebrow number="04" label={t("sectionLabel")} />
            </motion.div>
            <div className="profile-container">
                <motion.div variants={sectionFadeUp} initial="hidden" whileInView="visible" viewport={sectionViewport} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    <SectionHeader
                        title={t("heading")}
                        intro={t("intro")}
                    />
                </motion.div>

                <motion.div className="profile-qualities" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={sectionViewport}>
                    {qualityCards.map((card, index) => (
                        <motion.article key={card.number} className="profile-quality" variants={sectionFadeUp} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}>
                            <div className="profile-quality__top">
                                <span className="profile-quality__number">{card.number}</span>
                            </div>
                            <h3 className="profile-quality__title">{card.title}</h3>
                            <p className="profile-quality__desc">{card.desc}</p>
                            <div className="profile-quality__footer">
                                <span className="profile-quality__context">{card.context}</span>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                <div className="profile-method">
                    <motion.div className="profile-method__header" variants={sectionFadeLeft} initial="hidden" whileInView="visible" viewport={sectionViewport} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                        <SectionSubheader label={t("method.sectionLabel")} />
                        <SectionHeader title={t("method.heading")} />
                    </motion.div>

                    <motion.div className="profile-method__steps" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={sectionViewport}>
                        {methodSteps.map((step, index) => (
                            <motion.div key={step.number} className="profile-method__step" variants={sectionFadeUp} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}>
                                <span className="profile-method__step-number">{step.number}</span>
                                <h3 className="profile-method__step-title">{step.title}</h3>
                                <p className="profile-method__step-desc">{step.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </SectionShell>
    );
}
