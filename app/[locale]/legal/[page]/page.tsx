import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { LegalPage, type LegalSection } from "../LegalPage";

type LegalPageKey = "legalNotice" | "privacy" | "cookies";
const PAGE_SLUGS = {
  en: { "legal-notice": "legalNotice", privacy: "privacy", cookies: "cookies" },
  fr: { "mentions-legales": "legalNotice", confidentialite: "privacy", cookies: "cookies" },
} as const;

function getPageKey(locale: string, slug: string): LegalPageKey | null {
  const pageKey = PAGE_SLUGS[locale as keyof typeof PAGE_SLUGS]?.[slug as never];
  return pageKey ?? null;
}

export async function generateStaticParams() {
  return ["en", "fr"].flatMap((locale) =>
    Object.keys(PAGE_SLUGS[locale as keyof typeof PAGE_SLUGS]).map((page) => ({ locale, page })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
  const { locale, page } = await params;
  const pageKey = getPageKey(locale, page);

  if (!pageKey) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: `${t(`${pageKey}.title`)} — Ronan Chenu` };
}

export default async function LegalRoute({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await params;
  const pageKey = getPageKey(locale, page);

  if (!pageKey) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "legal" });
  const sectionMap = t.raw(`${pageKey}.sections`) as Record<string, LegalSection>;
  const sections = Object.values(sectionMap);

  return (
    <LegalPage
      title={t(`${pageKey}.title`)}
      intro={t(`${pageKey}.intro`)}
      sections={sections}
    />
  );
}