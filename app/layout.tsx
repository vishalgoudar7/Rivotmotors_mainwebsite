import type { Metadata } from "next";
import Script from "next/script";
import { SiteChrome } from "@/components/SiteChrome";
import { ThemeFavicon } from "@/components/ThemeFavicon";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIVOT Motors | Electric Mobility Reimagined",
  description: "RIVOT Motors electric mobility.",
  icons: {
    icon: [{ url: "/favicon-light.svg", type: "image/svg+xml", sizes: "any" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-rivot-theme="light" data-theme="light" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeFavicon />
        <Script id="rivot-theme-init" strategy="beforeInteractive">
          {`
              (function () {
                try {
                  var saved = localStorage.getItem("rivot-theme-mode");
                  var theme = saved === "dark" || saved === "light"
                    ? saved
                    : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
                  document.documentElement.dataset.rivotTheme = theme;
                  document.documentElement.dataset.theme = theme;
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `}
        </Script>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
