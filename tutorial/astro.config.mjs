// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://flourishing-unicorn-8134ad.netlify.app/",
  integrations: [preact()]
});