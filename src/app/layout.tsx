import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/site/Analytics";
import { FloatingCta } from "@/components/site/FloatingCta";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { SiteHeader } from "@/components/site/SiteHeader";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { MotionProvider } from "@/components/motion";
import { site } from "@/content/product";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.brandName} · Aura Pro`,
  description:
    "Aura Pro — adaptive ANC, titanium drivers, 40-hour battery. Pre-order with free worldwide shipping.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="site-atmosphere min-h-full text-[color:var(--text)]">
        <MotionProvider preset="studio">
          <ScrollProgress />
          <CustomCursor />
          <SiteHeader />
          <FloatingCta />
          <WhatsAppFab />
          {children}
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
