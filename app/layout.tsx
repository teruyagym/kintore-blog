import type { Metadata } from "next";
import { IBM_Plex_Sans_JP, IBM_Plex_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const plexJP = IBM_Plex_Sans_JP({
  variable: "--font-plex-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kintore-blog.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "筋トレ科学ラボ ブログ",
    template: "%s｜筋トレ科学ラボ",
  },
  description: "筋トレ・栄養・体の仕組みを、科学的根拠から解説するブログです。",
  verification: {
    google: "PFmPfjytuqTecbzFsiKrXFMx0l_T08hRhhjaqKD2ql0",
  },
  openGraph: {
    siteName: "筋トレ科学ラボ ブログ",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${plexJP.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <Header />
        {children}
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-LJ1SK7ZR3R" />
    </html>
  );
}
