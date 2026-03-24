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
					lang: 'en',//这里要小写cn
				},
				// zh-CN docs in `src/content/docs/zh-CN/`
				'zh-cn': { //这里要小写cn
					label: '简体中文',
					lang: 'zh-CN', //这里要大写CN
				},
			},
			sidebar: [
				{
					label: 'Aircraft General',
					translations: {
						'zh-CN': '飞机总体介绍',//这里要大写CN
					},
					items: [
						{ label: 'Aircraft General', translations: { 'zh-CN': '飞机总体介绍' }, link: '/aircraft_general/aircraft_general' },
					],
				},
				{
					label: 'Navigation System',
					translations: {
						'zh-CN': '导航系统',//这里要大写CN
					},
					items: [
						{ label: 'Navigation ADIRS', translations: { 'zh-CN': '导航ADIRS' }, link: '/navigation_system/navigation_adirs' },
						{ label: 'Navigation MSU', translations: { 'zh-CN': '导航MSU' }, link: '/navigation_system/navigation_msu' },
					],
				},
				{
					label: 'EIS ECAM',
					translations: {
						'zh-CN': 'EIS ECAM',//这里要大写CN
					},
					items: [
						{ label: 'EIS', translations: { 'zh-CN': 'EIS' }, link: '/eis_ecam/eis' },
						{ label: 'ECAM System', translations: { 'zh-CN': 'ECAM 系统' },  badge: { text: 'In Progress', variant: 'caution' }, link: '/eis_ecam/ecam_system' },
						{ label: 'ECAM Operation', translations: { 'zh-CN': 'ECAM 操作' },  badge: { text: 'In Progress', variant: 'caution' }, link: '/eis_ecam/ecam_operation' },
						{ label: 'ECAM Failure Cases', translations: { 'zh-CN': 'ECAM 故障案例' },  badge: { text: 'In Progress', variant: 'caution' }, link: '/eis_ecam/ecam_failure_cases' },
					],
				},
				{
					label: 'Pneumatic',
					translations: {
						'zh-CN': '气动系统',//这里要大写CN
					},
					items: [
						{ label: 'Pneumatic System', translations: { 'zh-CN': '气动系统' }, badge: { text: 'In Progress', variant: 'caution' }, link: '/pneumatic/pneumatic_system' },
						{ label: 'Pneumatic Failure', translations: { 'zh-CN': '气动故障' }, badge: { text: 'In Progress', variant: 'caution' }, link: '/pneumatic/pneumatic_failure_cases' },
					],
				},
				{
					label: 'Air Conditioning',
					translations: {
						'zh-CN': '空调系统',//这里要大写CN
					},
					items: [
						{ label: 'Air Conditioning System', translations: { 'zh-CN': '空调系统' }, badge: { text: 'In Progress', variant: 'caution' }, link: '/air_conditioning/air_conditioning_system' },
						{ label: 'Air Conditioning Operation', translations: { 'zh-CN': '空调操作' }, badge: { text: 'In Progress', variant: 'caution' }, link: '/air_conditioning/air_conditioning_operation' },
					],
				},
			],
		}),
	],
});
