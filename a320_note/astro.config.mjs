// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: {
				en: 'A320 CBT Notes',
				'zh-CN': 'A320 CBT 笔记',//这里要大写CN
			},
			// Set English as the default language for this site.
			defaultLocale: 'root',
			locales: {
				// English docs in `src/content/docs/`
				root: {
					label: 'English',
					lang: 'en',
				},
				// zh-CN docs in `src/content/docs/zh-CN/`
				'zh-cn': { //这里要小写cn
					label: '简体中文',
					lang: 'zh-CN', //这里要大写CN
				},
			},
			sidebar: [
				{
					label: 'Aircraft General Presentation',
					translations: {
						'zh-cn': '飞机总体介绍',
					},
					autogenerate: { directory: 'aircraft_general_presentation' },
				},
			],
		}),
	],
});
