// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: {
				'zh-CN': '我的文档',
				en: 'My Docs',
			},
			// Set English as the default language for this site.
			defaultLocale: 'root',
			locales: {
				// English docs in `src/content/docs/en/`
				en: {
				label: 'English',
				},
				// Simplified Chinese docs in `src/content/docs/zh-cn/`
				root: {
				label: '简体中文',
				lang: 'zh-CN',
				},
			},
			sidebar: [
				{
					label: '单元 1',
					translations: {
						en: 'Unit 1',
					},
					autogenerate: { directory: 'Unit1' },
				},
				{
					label: '单元 2',
					translations: {
						en: 'Unit 2',
					},
					autogenerate: { directory: 'Unit2' },
				},
			],
		}),
	],
});
