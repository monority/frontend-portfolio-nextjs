"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icon";
import { sectionFadeUp, sectionViewport } from "@/components/ui/section/motion";

const SOCIAL_LINKS = [
  { icon: "github" as const, label: "GitHub", href: "https://github.com/monority" },
  { icon: "linkedin" as const, label: "LinkedIn", href: "https://linkedin.com/in/ronanchenu" },
  { icon: "email" as const, label: "Email", href: "mailto:chenu.pro@gmail.com" },
] as const;

const NAV_LINKS = [
  { href: "#about", key: "about" },
  { href: "#projects", key: "projects" },
  { href: "#profile", key: "profile" },
] as const;

const year = new Date().getFullYear();

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-rule" aria-hidden="true" />

        <motion.div
          className="footer-grid"
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ ...sectionViewport, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="footer-brand">
            <span className="footer-brand__name">ronan.</span>
            <p className="footer-brand__tagline">{t("tagline")}</p>
            <div className="footer-availability">
              <span className="footer-availability__dot" aria-hidden="true" />
              <span className="footer-availability__text">{t("availability")}</span>
            </div>
          </div>

          <nav className="footer-nav" aria-label={t("navLabel")}>
            <span className="footer-nav__heading">{t("navHeading")}</span>
            <ul className="footer-nav__list">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <a href={href} className="footer-nav__link">
                    {t(`nav.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-social">
            <span className="footer-nav__heading">{t("socialHeading")}</span>
            <ul className="footer-social__list">
              {SOCIAL_LINKS.map(({ icon, label, href }) => (
                <li key={icon}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social__link"
                    aria-label={label}
                  >
                    <Icon name={icon} sizeClass="icon-sm" aria-hidden="true" />
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <span className="footer-bottom__copy">© {year} Ronan Chenu</span>
          <span className="footer-bottom__built">{t("builtWith")}</span>
        </div>
      </div>
    </footer>
  );
}