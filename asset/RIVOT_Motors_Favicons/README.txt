RIVOT MOTORS — WEBSITE FAVICON PACK
====================================

Default/favicon files are in the ROOT of this folder:
- favicon.ico                  Multi-size browser favicon (16, 24, 32, 48, 64, 128, 256)
- favicon-16x16.png            Small browser tabs
- favicon-32x32.png            Standard browser tabs
- favicon-48x48.png            Larger browser icons
- apple-touch-icon.png         iPhone/iPad home screen, 180x180
- android-chrome-192x192.png   Android icons, 192x192
- android-chrome-512x512.png   Android icons, 512x512
- icon.png                     High-resolution app icon, 512x512
- site.webmanifest             Optional PWA manifest

STYLE OPTIONS
-------------
Root:                                   White mark on BLACK background (recommended)
alternatives/transparent-white-logo/:  White mark on TRANSPARENT background
alternatives/light-black-logo/:        Black mark on WHITE background

The two uploaded logo files are pixel-identical. Both are included in
uploaded-sources/; first used for the main icon set, second for alternatives.

TO INSTALL ON NEXT.JS APP ROUTER (RIVOT website)
------------------------------------------------
1. Copy root favicon.ico to app/favicon.ico
2. Copy root icon.png to app/icon.png
3. Copy root apple-touch-icon.png to app/apple-icon.png
Next.js App Router automatically adds favicon, icon and Apple icon metadata.

If app/favicon.ico already exists, replace it. Restart/rebuild and clear
browser favicon cache or try in an incognito tab if an old icon remains.

TO INSTALL ON HTML OR NEXT.JS public/ FOLDER
-------------------------------------------
Copy all files from this folder's ROOT into public/ (not the alternatives folder).
Use these tags in your HTML <head> when configuring manually:

<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

For another style, use files from a specific alternatives/ folder instead.
