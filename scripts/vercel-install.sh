#!/usr/bin/env bash
# Vercel build image is Amazon Linux 2023 (dnf). Playwright's --with-deps uses apt and fails here.
# Keep Chromium system deps out of vercel.json: installCommand is limited to 256 characters.
set -euo pipefail
dnf install -y \
  libXcomposite libXcursor libXdamage libXext libXi libXtst cups-libs \
  libXScrnSaver libXrandr gtk3 pango alsa-lib atk at-spi2-atk at-spi2-core libdrm \
  libxkbcommon nss nspr xorg-x11-server-Xvfb mesa-libgbm
npm install
npx playwright install chromium
