<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  position: relative;

  min-height: 100vh;

  margin: 0;
  padding: 0;

  color: var(--text-color);

  --theme-color: #2676D8;

  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
}

@font-face {
  font-family: 'Inter';
  src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2');
}

html {
  background: #f6f6f6;

  --major-color: #ffffff;
  --major-color-light: #eeeeee75;
  --major-color-lighter: #eeeeee50;
  --major-color-lightest: #eeeeee25;

  --text-color: #000;
  --text-color-light: #000000A5;
}

html.dark {
  background: #111111;

  --major-color: #000000;
  --major-color-light: #00000075;
  --major-color-lighter: #00000050;
  --major-color-lightest: #00000025;

  --text-color: #fff;
  --text-color-light: #ffffffA5;
}

.waiting::before {
  content: "";
  position: absolute;

  width: 5%;
  min-width: 2rem;
  height: 100%;

  top: 0;
  left: -20%;

  filter: invert(1);
  border-radius: 8px;
  transform: skewX(-40deg);
  background-color: var(--major-color-lightest);
  animation: waiting 1s infinite;
}

.waiting {
  position: relative;
  display: block;

  width: 100%;
  height: 4rem;

  overflow: hidden;
  border-radius: 8px;
  background-color: var(--major-color-lighter);
}

@keyframes waiting {
  to {
    left: 120%;
  }
}

@media (min-width: 768px) {
  .only-pe-display {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .only-pc-display {
    display: none !important;
  }
}
</style>
