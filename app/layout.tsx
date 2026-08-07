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

export const metadata: Metadata = {
  title: {
    default: "筋トレ科学ラボ ブログ",
    template: "%s｜筋トレ科学ラボ",
  },
  description: "筋トレ・栄養・体の仕組みを、科学的根拠から解説するブログです。",
  verification: {
    google: "PFmPfjytuqTecbzFsiKrXFMx0l_T08hRhhjaqKD2ql0",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
