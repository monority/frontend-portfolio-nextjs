"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Icon } from "@/components/ui/icon";
import ActionLink from "@/components/ui/action-link";
import DarkModeToggle from "@/components/DarkModeToggle";
import MessagingModal from "@/features/messaging/components/MessagingModal";
import Button from "@/components/ui/button";
import { openExternalUrl } from "@/[locale]/sections/shared/openExternalUrl";

const GITHUB_URL = "https://github.com/monority";
const LINKEDIN_URL = "https://linkedin.com/in/ronanchenu";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  isMessagingEnabled: boolean;
  onOpenMessaging: () => void;
  localizedPath: string;
};

function MobileMenu({ isOpen, onClose, isMessagingEnabled, onOpenMessaging, localizedPath }: MobileMenuProps) {
  const t = useTranslations("header");
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.3 }}
          />
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul className="mobile-menu__list">
              {isMessagingEnabled && (
                <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
                  <button
                    type="button"
                    className="mobile-menu__item"
                    onClick={() => { onClose(); onOpenMessaging(); }}
                  >
                    <Icon name="message" title={t("message")} sizeClass="icon-sm" />
                    <span>{t("message")}</span>
                  </button>
                </motion.li>
              )}
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.3 }}>
                <Link href={GITHUB_URL} className="mobile-menu__item" onClick={onClose}>
                  <Icon name="github" title={t("github")} sizeClass="icon-sm" />
                  <span>{t("github")}</span>
                </Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.3 }}>
                <Link href={LINKEDIN_URL} className="mobile-menu__item" onClick={onClose}>
                  <Icon name="linkedin" title={t("linkedin")} sizeClass="icon-sm" />
                  <span>{t("linkedin")}</span>
                </Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25, duration: 0.3 }}>
                <Link href={localizedPath} className="mobile-menu__item" onClick={onClose}>
                  <Icon name="language" title={t("languageSwitchTo")} sizeClass="icon-sm" />
                  <span>{t("languageSwitchTo")}</span>
                </Link>
              </motion.li>
              <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.3 }}>
                <button
                  type="button"
                  className="mobile-menu__item"
                  onClick={() => { toggleTheme(); onClose(); }}
                >
                  <Icon name={resolvedTheme === "dark" ? "lightMode" : "darkMode"} title={t("themeToggle")} sizeClass="icon-sm" />
                  <span>{t("themeToggle")}</span>
                </button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("header");
  const messagingEnabled = process.env.NEXT_PUBLIC_ENABLE_MESSAGING === "true";
  const nextLocale = locale === "fr" ? "en" : "fr";
  const localizedPath = pathname?.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`) || `/${nextLocale}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        <motion.header
          className={`header-shell ${isScrolled ? "scrolled" : ""}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <motion.div
            className="header-layout"
            animate={{
              paddingTop: isScrolled ? "var(--space-xs)" : "var(--space-sm)",
              paddingBottom: isScrolled ? "var(--space-xs)" : "var(--space-sm)",
            }}
          >
            <div className="header-title">
              <Link href={`/${locale}`} className="header-title__link" aria-label={t("brand.homeLabel")}>
                <div className="header-title__text">
                  <h3>{t("brand.name")}</h3>
                </div>
              </Link>
            </div>

            <nav id="header-nav" className="header-nav">
              <ul className="header-network__list">
                {messagingEnabled && (
                  <li className="header-network__item">
                    <button
                      type="button"
                      className="header-network__trigger"
                      onClick={() => setIsMessagingOpen(true)}
                      aria-label={t("message")}
                    >
                      <Icon name="message" title={t("message")} sizeClass="icon-sm" className="header-network__icon" />
                      <span className="header-network__user-active">{t("message")}</span>
                    </button>
                  </li>
                )}
                <li className="header-network__item">
                  <DarkModeToggle ariaLabel={t("themeToggle")} />
                </li>
                <li className="header-network__item">
                  <Button
                    variant="primary"
                    onClick={() => openExternalUrl(GITHUB_URL)}
                    rightIcon={<Icon name="github" sizeClass="icon-sm" aria-hidden="true" />}
                  >
                  </Button>
                </li>
                <li className="header-network__item">
                  <Button
                    variant="primary"
                    onClick={() => openExternalUrl(LINKEDIN_URL)}
                    rightIcon={<Icon name="linkedin" sizeClass="icon-sm" aria-hidden="true" />}
                  >
                  </Button>
                </li>
                <li className="header-network__item">
                  <Link href={localizedPath} className="btn btn-primary btn-sm" aria-label={t("languageSwitchTo")}>
                    <Icon name="language" title={t("language")} sizeClass="icon-sm" className="header-network__icon" />
                  </Link>
                </li>
              </ul>
            </nav>

            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={isMobileMenuOpen ? "hamburger-line open" : "hamburger-line"} />
              <span className={isMobileMenuOpen ? "hamburger-line open" : "hamburger-line"} />
              <span className={isMobileMenuOpen ? "hamburger-line open" : "hamburger-line"} />
            </button>
          </motion.div>
        </motion.header>
      </AnimatePresence>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isMessagingEnabled={messagingEnabled}
        onOpenMessaging={() => setIsMessagingOpen(true)}
        localizedPath={localizedPath}
      />
      <MessagingModal isOpen={isMessagingOpen} onClose={() => setIsMessagingOpen(false)} />
    </>
  );
}