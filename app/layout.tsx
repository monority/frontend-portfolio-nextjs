import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GradientBackground } from "@/components/GradientBackground";
import { AnimationProvider } from "@/components/animations/AnimationProvider";
import { CustomCursor } from "@/components/ui/cursor/CustomCursor";
import "./styles/index.css";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ronan Chenu — Front-end Developer",
  description: "Front-end developer based in Lille, building fast, clean and maintainable web interfaces with React and Next.js.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: { url: "/apple-touch-icon.png" },
  },
  openGraph: {
    title: "Ronan Chenu — Front-end Developer",
    description: "Front-end developer based in Lille, building fast, clean and maintainable web interfaces with React and Next.js.",
    siteName: "Ronan Chenu",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ronan Chenu — Front-end Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronan Chenu — Front-end Developer",
    description: "Front-end developer based in Lille, building fast, clean and maintainable web interfaces with React and Next.js.",
    images: ["/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${geist.variable} ${jetMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <CustomCursor />
        <GradientBackground />
        <ThemeProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
