"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Icon } from "@/components/ui/icon";
import MessagingModal from "@/features/messaging/components/MessagingModal";

const GITHUB_PROFILE_URL = "https://github.com/monority";

function MobileMenu({
  isOpen,
  onClose,
  isMessagingEnabled,
  onOpenMessaging,
}: {
  isOpen: boolean;
  onClose: () => void;
  isMessagingEnabled: boolean;
  onOpenMessaging: () => void;
}) {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "fr" ? "en" : "fr";
  const localizedPath = pathname?.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`) || `/${nextLocale}`;

  const items: Array<{
    key: string;
    icon: "message" | "github" | "language" | "theme";
    label: string;
    isButton?: boolean;
    link?: string;
    isToggle?: boolean;
    isAction?: boolean;
  }> = [
      { key: "message", icon: "message", label: t("message"), isAction: isMessagingEnabled },
      { key: "github", icon: "github", label: t("github"), isButton: true },
      { key: "language", icon: "language", label: t("languageSwitchTo"), link: localizedPath },
      { key: "theme", icon: "theme", label: t("themeToggle"), isToggle: true },
    ];

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
              {items.map((item, index) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                >
                  {item.isToggle ? (
                    <div className="mobile-menu__item" onClick={onClose}>
                      <DarkModeToggle ariaLabel={item.label} />
                      <span>{item.label}</span>
                    </div>
                  ) : item.isAction ? (
                    <button
                      type="button"
                      className="mobile-menu__item"
                      onClick={() => {
                        onClose();
                        onOpenMessaging();
                      }}
                    >
                      <Icon name={item.icon} title={item.label} sizeClass="icon-sm" />
                      <span>{item.label}</span>
                    </button>
                  ) : item.isButton ? (
                    <Link
                      href={GITHUB_PROFILE_URL}
                      className="btn btn-primary"
                      aria-label={item.label}
                      target="_blank"
                      rel="noreferrer"
                      onClick={onClose}
                    >
                      <Icon name={item.icon} title={item.label} sizeClass="icon-sm" />
                    </Link>
                  ) : item.link ? (
                    <Link href={item.link} className="mobile-menu__item" onClick={onClose}>
                      <Icon name={item.icon} title={item.label} sizeClass="icon-sm" />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <div className="mobile-menu__item">
                      <Icon name={item.icon} title={item.label} sizeClass="icon-sm" />
                      <span>{item.label}</span>
                    </div>
                  )}
                </motion.li>
              ))}
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

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
              <div className="header-network">
                <ul className="header-network__list">
                  <li className="header-network__item">
                    {messagingEnabled ? (
                      <button
                        type="button"
                        className="header-network__trigger"
                        onClick={() => setIsMessagingOpen(true)}
                        aria-label={t("message")}
                      >
                        <Icon name="message" title="Message" sizeClass="icon-sm" className="header-network__icon" />
                        <span className="header-network__user-active">{t("message")}</span>
                      </button>
                    ) : (
                      <>
                        <Icon name="message" title="Message" sizeClass="icon-sm" className="header-network__icon" />
                        <span className="header-network__user-active">{t("message")}</span>
                      </>
                    )}
                  </li>
                  <li className="header-network__item">
                    <DarkModeToggle ariaLabel={t("themeToggle")} />
                  </li>
                  <li className="header-network__item">
                    <Link
                      href={GITHUB_PROFILE_URL}
                      className="btn btn-primary"
                      aria-label={t("github")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name="github" title={t("github")} sizeClass="icon-sm" className="header-network__icon" />
                    </Link>
                  </li>
                  <li className="header-network__item">
                    <Link href={localizedPath} className="btn btn-primary" aria-label={t("languageSwitchTo")}>
                      <Icon name="language" title={t("language")} sizeClass="icon-sm" className="header-network__icon" />
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            <button type="button" className="hamburger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
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
      />
      <MessagingModal isOpen={isMessagingOpen} onClose={() => setIsMessagingOpen(false)} />
    </>
  );
}