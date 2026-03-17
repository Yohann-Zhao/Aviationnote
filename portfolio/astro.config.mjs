// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  base: '/portfolio/',  // 这里填子目录，例如：如果你的站点部署在 https://example.com/subdir/，则 base 应该设置为 '/subdir/'。
  i18n: {
    locales: ["zh-CN"],
    defaultLocale: "zh-CN",
  }
})

