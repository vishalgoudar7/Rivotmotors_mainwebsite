import type { Metadata } from "next";
import Script from "next/script";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIVOT Motors | Electric Mobility Reimagined",
  description: "RIVOT Motors electric mobility.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-rivot-theme="light" data-theme="light" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script src="/rivot-theme-init.js" strategy="beforeInteractive" />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
