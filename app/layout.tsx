import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
