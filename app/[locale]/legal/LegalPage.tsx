import { Footer, Header } from "@/features/layout";

export type LegalSection = {
  title: string;
  paragraphs: string;
};

type LegalPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="legal-page">
        <div className="legal-page__shell">
          <p className="legal-page__eyebrow">Ronan Chenu</p>
          <h1 className="legal-page__title">{title}</h1>
          <p className="legal-page__intro">{intro}</p>

          <div className="legal-page__content">
            {sections.map((section) => (
              <section className="legal-page__section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.split("\n\n").map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}