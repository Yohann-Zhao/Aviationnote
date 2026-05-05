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
					label: 'APPI AIRBUS',
					translations: {
						'zh-CN': 'APPI AIRBUS',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'APPI', translations: { 'zh-CN': 'APPI' }, badge: { text: 'Incomplete', variant: 'caution' },link: '/appi/appi' },
					],
				},
				{
					label: 'Aircraft General',
					translations: {
						'zh-CN': '飞机总体介绍',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Aircraft General', translations: { 'zh-CN': '飞机总体介绍' }, link: '/aircraft_general/aircraft_general' },
					],
				},
				{
					label: 'EIS ECAM',
					translations: {
						'zh-CN': 'EIS ECAM',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'EIS', translations: { 'zh-CN': 'EIS' }, link: '/eis_ecam/eis' },
						{ label: 'ECAM System', translations: { 'zh-CN': 'ECAM 系统' },  link: '/eis_ecam/ecam_system' },
						{ label: 'ECAM Operation', translations: { 'zh-CN': 'ECAM 操作' },  link: '/eis_ecam/ecam_operation' },
						{ label: 'ECAM Failure Cases', translations: { 'zh-CN': 'ECAM 故障案例' },  link: '/eis_ecam/ecam_failure_cases' },
					],
				},
				{
					label: 'EFIS',
					translations: {
						'zh-CN': '电子飞行仪表系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'EFIS System', translations: { 'zh-CN': '电子飞行仪表系统' }, link: '/efis/efis_system' },
						{ label: 'EFIS PFD', translations: { 'zh-CN': '主飞行显示' }, link: '/efis/efis_pfd' },
						{ label: 'EFIS ND', translations: { 'zh-CN': '导航显示' }, link: '/efis/efis_nd' },
					],
				},
				{
					label: 'Pneumatic',
					translations: {
						'zh-CN': '气动系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Pneumatic System', translations: { 'zh-CN': '气动系统' }, link: '/pneumatic/pneumatic_system' },
						{ label: 'Pneumatic Failure', translations: { 'zh-CN': '气动故障' }, link: '/pneumatic/pneumatic_failure_cases' },
					],
				},
				{
					label: 'Air Conditioning',
					translations: {
						'zh-CN': '空调系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Air Conditioning System', translations: { 'zh-CN': '空调系统' }, link: '/air_conditioning/air_conditioning_system' },
						{ label: 'Air Conditioning Operation', translations: { 'zh-CN': '空调操作' }, link: '/air_conditioning/air_conditioning_operation' },
						{ label: 'Air Conditioning Failure Cases', translations: { 'zh-CN': '空调故障案例' }, link: '/air_conditioning/air_conditioning_failure_cases' },
						{ label: 'Air Conditioning Cargo System Presentation', translations: { 'zh-CN': '空调货舱系统介绍' }, link: '/air_conditioning/air_conditioning_cargo_system_presentation' },
					],
				},
				{
					label: 'Pressurization & Ventilation',
					translations: {
						'zh-CN': '增压与通风',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Pressurization System', translations: { 'zh-CN': '增压系统' }, link: '/pressurization/pressurization_system' },
						{ label: 'Ventilation System', translations: { 'zh-CN': '通风系统' }, link: '/ventilation/ventilation_system' },
					],
				},
				{
					label: 'APU',
					translations: {
						'zh-CN': 'APU',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'APU System', translations: { 'zh-CN': 'APU系统' }, link: '/apu/apu_system' },
					],
				},
				{
					label: 'Electrical',
					translations: {
						'zh-CN': '电气系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Electrical System', translations: { 'zh-CN': '电气系统' }, link: '/electrical/electrical_system' },
						{ label: 'Electrical Operation', translations: { 'zh-CN': '电气操作' }, link: '/electrical/electrical_operation' },
						{ label: 'Electrical Failure Cases', translations: { 'zh-CN': '电气故障案例' }, link: '/electrical/electrical_failure_cases' },
					],
				},
				{
					label: 'Auto Flight',
					translations: {
						'zh-CN': '自动飞行',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Auto Flight System', translations: { 'zh-CN': '自动飞行系统' }, link: '/auto_flight/auto_flight_system' },
						{ label: 'Flight Control Unit (FCU)', translations: { 'zh-CN': '飞行控制单元' }, link: '/auto_flight/fcu' },
						{ label: 'Flight Mode Annunciator', translations: { 'zh-CN': '飞行模式指示器' }, link: '/auto_flight/flight_mode_annunciator' },
						{ label: 'Flight Director Autopilot', translations: { 'zh-CN': '飞行指引自动飞行' }, link: '/auto_flight/flight_director_autopilot' },
						{ label: 'Auto Thrust', translations: { 'zh-CN': '自动推力' }, link: '/auto_flight/autothrust' },
						{ label: 'Flight Management', translations: { 'zh-CN': '飞行管理' }, link: '/auto_flight/flight_management' },
						{ label: 'Rules Regarding FM Navigation & F-PLN', translations: { 'zh-CN': '关于FM导航和飞行计划的规则' }, link: '/auto_flight/rules_regarding_fm_navigation_and_fpln' },
						{ label: 'Auto Flight Guidance Principles', translations: { 'zh-CN': '自动飞行引导原理' }, link: '/auto_flight/auto_flight_guidance_principles' },
						{ label: 'Auto Flight Protections', translations: { 'zh-CN': '自动飞行保护' }, link: '/auto_flight/auto_flight_protections' },
						{ label: 'Auto Flight Failure Cases', translations: { 'zh-CN': '自动飞行故障案例' }, link: '/auto_flight/auto_flight_failure_cases' },
					],
				},
				{
					label: 'Flight Controls',
					translations: {
						'zh-CN': '飞行控制',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Flight Controls System', translations: { 'zh-CN': '飞行控制系统' }, link: '/flight_controls/flight_controls_system' },
						{ label: 'Flight Controls Side Sticks', translations: { 'zh-CN': '飞行控制侧杆' }, link: '/flight_controls/flight_controls_side_sticks' },
						{ label: 'Flight Controls Normal Law & Protections', translations: { 'zh-CN': '飞行控制正常律和保护' }, link: '/flight_controls/flight_controls_normal_law_and_protections' },
						{ label: 'Flight Controls Reconfiguration Laws', translations: { 'zh-CN': '飞行控制重构律' }, link: '/flight_controls/flight_controls_reconfiguration_laws' },
						{ label: 'Flight Controls Failure Cases', translations: { 'zh-CN': '飞行控制故障案例' }, link: '/flight_controls/flight_controls_failure_cases' },
					],
				},
				{
					label: 'Hydraulic',
					translations: {
						'zh-CN': '液压系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Hydraulic System', translations: { 'zh-CN': '液压系统' }, link: '/hydraulic/hydraulic_system' },
					],
				},
				{
					label: 'Landing Gear',
					translations: {
						'zh-CN': '起落架',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Landing Gear System', translations: { 'zh-CN': '起落架系统' }, link: '/landing_gear/landing_gear_system' },
						{ label: 'Landing Gear Failure Cases', translations: { 'zh-CN': '起落架故障案例' }, link: '/landing_gear/landing_gear_failure_cases' },
					],
				},
				{
					label: 'Navigation',
					translations: {
						'zh-CN': '导航',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Navigation System', translations: { 'zh-CN': '导航系统' }, link: '/navigation/navigation_system' },
						{ label: 'Navigation ADIRS', translations: { 'zh-CN': '导航ADIRS' }, link: '/navigation/navigation_adirs' },
						{ label: 'Navigation MSU', translations: { 'zh-CN': '导航MSU' }, link: '/navigation/navigation_msu' },
						{ label: 'Radio Navigation', translations: { 'zh-CN': '无线电导航' }, link: '/navigation/radio_navigation' },
						{ label: 'Navigation GPWS', translations: { 'zh-CN': '导航GPWS' }, link: '/navigation/navigation_gpws' },
						{ label: 'Navigation Radio Altimeter', translations: { 'zh-CN': '导航无线电高度表' }, link: '/navigation/navigation_radio_altimeter' },
						{ label: 'Navigation ATC/TCAS', translations: { 'zh-CN': '导航ATC/TCAS' }, link: '/navigation/navigation_atc_tcas' },
						{ label: 'Navigation Weather Radar', translations: { 'zh-CN': '导航天气雷达' }, link: '/navigation/navigation_weather_radar' },
						{ label: 'Navigation ISIS and Standby Compass', translations: { 'zh-CN': '导航ISIS和备用磁罗盘' }, link: '/navigation/navigation_isis_and_standby_compass' },
						{ label: 'Navigation Operation', translations: { 'zh-CN': '导航操作' }, link: '/navigation/navigation_operation' },
					],
				},
				{
					label: 'Fuel',
					translations: {
						'zh-CN': '燃油系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Fuel System', translations: { 'zh-CN': '燃油系统' }, link: '/fuel/fuel_system' },
						{ label: 'Fuel Operation', translations: { 'zh-CN': '燃油操作' }, link: '/fuel/fuel_operation' },
						{ label: 'Fuel Failure Cases', translations: { 'zh-CN': '燃油故障案例' }, link: '/fuel/fuel_failure_cases' },
					],
				},
				{
					label: 'Power Plant',
					translations: {
						'zh-CN': '动力装置',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Power Plant(IAE) System', translations: { 'zh-CN': '动力装置(IAE)系统' }, link: '/power_plant/power_plant_iae_system' },
						{ label: 'Power Plant(IAE) Operation(A)', translations: { 'zh-CN': '动力装置(IAE)操作(A)' }, link: '/power_plant/power_plant_iae_operation_a' },
						{ label: 'Power Plant(IAE) Operation(B)', translations: { 'zh-CN': '动力装置(IAE)操作(B)' }, link: '/power_plant/power_plant_iae_operation_b' },
						{ label: 'Power Plant(IAE) Failure Cases(A)', translations: { 'zh-CN': '动力装置(IAE)故障案例(A)' }, link: '/power_plant/power_plant_iae_failure_cases_a' },
						{ label: 'Power Plant(IAE) Failure Cases(B)', translations: { 'zh-CN': '动力装置(IAE)故障案例(B)' }, link: '/power_plant/power_plant_iae_failure_cases_b' },
					],
				},
				{
					label: 'Lights',
					translations: {
						'zh-CN': '灯光系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Lights System', translations: { 'zh-CN': '灯光系统' }, link: '/lights/lights_system' },
						{ label: 'Lights Operation', translations: { 'zh-CN': '灯光操作' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/lights/lights_operation' },
					],
				},
				{
					label: 'Ice & Rain Protection',
					translations: {
						'zh-CN': '防冰与防雨系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Ice & Rain Protection System', translations: { 'zh-CN': '防冰与防雨系统' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/ice_and_rain_protection/ice_and_rain_protection_system' },
					],
				},
				{
					label: 'Communications',
					translations: {
						'zh-CN': '通信',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Communications System', translations: { 'zh-CN': '通信系统' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/communications/communications_system' },
						{ label: 'Communications Operation', translations: { 'zh-CN': '通信操作' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/communications/communications_operation' },
					],
				},
				{
					label: 'Cabin Systems',
					translations: {
						'zh-CN': '客舱系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Cabin Systems', translations: { 'zh-CN': '客舱系统' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/cabin/cabin_systems' },
						{ label: 'Cabin System Operation', translations: { 'zh-CN': '客舱系统操作' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/cabin/cabin_system_operation' },
					],
				},
				{
					label: 'Flight Recorders',
					translations: {
						'zh-CN': '飞行记录器',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Flight Recorders System', translations: { 'zh-CN': '飞行记录器系统' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/flight_recorders/flight_recorders_system' },
					],
				},
				{
					label: 'Oxygen',
					translations: {
						'zh-CN': '氧气系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Oxygen System', translations: { 'zh-CN': '氧气系统' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/oxygen/oxygen_system' },
						{ label: 'Oxygen Operation', translations: { 'zh-CN': '氧气操作' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/oxygen/oxygen_operation' },
					],
				},
				{
					label: 'Fire Protection',
					translations: {
						'zh-CN': '防火系统',//这里要大写CN
					},
					collapsed: true,// 默认折叠
					items: [
						{ label: 'Fire Protection System', translations: { 'zh-CN': '防火系统' }, badge: { text: 'Incomplete', variant: 'caution' }, link: '/fire_protection/fire_protection_system' },
					],
				}
			],
		}),
	],
});
