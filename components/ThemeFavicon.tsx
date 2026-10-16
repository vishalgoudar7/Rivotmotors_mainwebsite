"use client";

import { useEffect } from "react";

export function ThemeFavicon() {
  useEffect(() => {
    const syncFavicon = () => {
      const theme = document.documentElement.dataset.rivotTheme;
      const href = theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";
      let icon = document.querySelector<HTMLLinkElement>('link[rel="icon"][type="image/svg+xml"]');

      if (!icon) {
        icon = document.createElement("link");
        icon.rel = "icon";
        icon.type = "image/svg+xml";
        icon.sizes.add("any");
        document.head.appendChild(icon);
      }

      if (icon.getAttribute("href") !== href) icon.href = href;
    };

    syncFavicon();
    const observer = new MutationObserver(syncFavicon);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-rivot-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
