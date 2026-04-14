---
title: 航空呼号听力练习工具 V1.0 — 用户操作手册
version: 1.0
date: 2026-04-14
language: zh-CN
---

# 航空呼号听力练习工具 V1.0 — 用户操作手册

版本: 1.0

发布日期: 2026-04-14

作者: 本地开发团队

摘要: 本手册面向终端用户与管理员，描述本项目（本地优先的航空呼号听写训练工具）的功能、安装、运行、主要界面和典型操作流程、后端 API 合约、数据规范、常见故障排查与维护要点。本文件为软件说明文档，适用于提交软件著作权（软著）申请时作为用户操作与功能说明材料。

--

目录

- 概述
- 主要功能清单
- 系统需求与依赖
- 安装与本地运行（开发/生产）
- 快速入门（典型使用流程）
- 界面与交互详解
- 练习模式与答题规则（输入规范）
- 后端 API（/api/tts）说明与示例
- 文件与模块位置说明
- 常见问题与故障排查
- 维护与扩展说明
- 附录：答案规范、数字发音规则与示例

--

**一、概述**

航空呼号听力练习工具（以下简称“本工具”）是一个本地优先的网页应用，旨在为航空呼号听写训练提供可配置的练习模式、可调语速与口音、选项式无线电音效后处理，以及会话统计和即时反馈。前端由 Astro 构建，后端使用 Netlify Functions 提供 `/api/tts` 文字转语音服务。应用设计为单页交互，适用于个人训练及教学演示。

目标用户：飞行员学员、空管学员、航空英语学习者以及培训管理员。

设计原则：本地优先、可配置、轻量、可复现（可在本机离线或混合云环境下运行）。

**二、主要功能清单**

- 练习会话：默认 10 轮练习，会话结束显示准确率与连胜统计。
- 多种练习模式：混合、运输（航空公司+航班号）、通用航空（飞机类型+后缀）、仅数字、自定义字母池。
- 两种答题模式：文本输入（显式“检查”）与多选（点击即判分）。
- 语音设置：口音预设（mixed/american/british/australian/indian）、播放速度（0.25x–2.0x）、无线电音效后处理开关。
- TTS 后端：`POST /api/tts`，支持 Google Cloud TTS（若配置）或本地回退 WAV 生成。
- 音频缓存：前端缓存 Blob URL，配合可选的浏览器端后处理（OfflineAudioContext）。
- UI 反馈：正确/错误音效、振动 (若设备支持)、动画反馈。

**三、系统需求与依赖**

- 操作系统：Windows / macOS / Linux（支持现代浏览器）。
- Node.js：14.x 或更高（开发运行时）。
- 浏览器：支持 Web Audio API 的现代浏览器（Chrome/Edge/Firefox/Safari）。
- 可选：Google Cloud TTS API Key（用于启用真实云 TTS）。

主要依赖（package.json 中列出）：

- Astro（前端构建）
- netlify-cli / netlify dev（本地模拟 Netlify Functions）

**四、安装与本地运行**

1. 克隆或复制项目到本地工作目录。
2. 安装依赖：

```bash
npm install
```

3. 启动开发服务（包含 Netlify Functions）:

```bash
npm run dev     # 启动 netlify dev + astro
# 或者单独启动 astro（不包含 /api/tts）
npm run dev:astro
```

说明：本仓库在本地使用 `netlify dev` 对 Functions 进行本地调试，站点默认通过 `http://127.0.0.1:8888` 提供服务；Astro 开发服务通常在 `4321` 端口作为后端。

4. 生产构建（生成静态站点）：

```bash
npm run build
```

**五、快速入门（典型使用流程）**

1. 打开浏览器并访问本地开发地址（例如 `http://127.0.0.1:8888/`）。
2. 页面加载后，主界面顶部为“轮卡”，中间为“答题面板”，底部和模态为设置与帮助。
3. 选择练习模式与语音设置：打开设置模态 -> 模式、口音、语速、无线电音效。
4. 点击“播放呼号”开始当前轮次。播放结束后进入答题状态。
5. 在文本模式下输入答案并点击“检查”或按 Enter；多选时点击选项即判分。
6. 查看即时反馈（颜色高亮、音效、振动），继续下一轮直至 10 轮完成。

**六、界面与交互详解**

- 轮卡（Round Card）：显示当前轮次、模式、口音与状态（idle/preparing/listening/answering/checking/resolved/sessionComplete）。
- 答题面板：
  - 文本输入模式：提供输入框与“检查”按钮；输入会被 `normalize` 处理（见附录）。
  - 多选模式：生成 4 个选项（包括干扰项），点击立即判分。
- 设置模态：可切换练习模式、口音、语速、无线电音效、声音与振动反馈、自定义字母池。

交互细节：页面使用隐藏 `<select>` 作为单一真实状态来源，UI 按钮会更新该 `<select>` 的值并触发 `change` 事件，保证状态一致。

**七、练习模式与答题规则（输入规范）**

练习模式摘要：

- mixed：随机在 `transport` 和 `generalAviation` 间切换。
- transport（运输航班）：格式为 `IATA代码 + 3-4 位数字`（例如 `CA123`, `MU2486`）。接受完整呼号或仅数字（`123`）作为正确答案。
- generalAviation（通用航空）：播放包含制造商与后缀，期望答案为后缀（例如页面听到“Cessna DXF”，答案为 `DXF`）。
- numeric（仅数字）：独立数字序列，采用 ICAO 风格读数（详见附录）。
- letters（自定义字母）：从自定义字母池按配置长度生成序列。

答案规范化规则（前端 `callsign.js` 中 `normalizeAnswerInput()` 的行为）：

- 将用户输入转换为大写。
- 移除所有非字母数字字符（空格、连字符、下划线、标点）。
举例：`ca 123` -> `CA123`；`N-5429` -> `N5429`。

多选干扰项策略：从正确答案派生 1–2 个字符的变体，应用数字/字母混淆规则与相邻数字交换以制造高度迷惑的选项。

**八、后端 API：`POST /api/tts`**

用途：为给定文本生成语音音频（返回 `audio/mpeg` 或 `audio/wav`）。

请求（JSON）：

```json
{
  "text": "Air China one two tree",
  "accent": "mixed",
  "speakingRate": 1.2
}
```

字段说明：

- text: 要合成的文本，必须为非空字符串。
- accent: 口音预设（`mixed`/`american`/`british`/`australian`/`indian`）。
- speakingRate: 合成语速（float，通常 0.25–2.0），前端会进行合理范围约束。

响应：

- 成功：HTTP 200，Content-Type 为 `audio/mpeg` 或 `audio/wav`，返回二进制音频内容。
- 失败：当配置了 `TTS_API_KEY` 且调用云服务失败时返回 HTTP 502；当无 `TTS_API_KEY` 时函数返回本地生成的 WAV（回退路径）。

注意事项：

- `TTS_API_KEY` 应仅部署在服务器端环境变量中，不能暴露给前端。
- API 合约（请求字段名与含义）为前端与后端之间的稳定契约，修改需同时更新前端代码。

示例：使用 `curl` 发起请求（开发用）

```bash
curl -X POST http://127.0.0.1:8888/.netlify/functions/tts \
  -H "Content-Type: application/json" \
  -d '{"text":"Air China one two tree","accent":"mixed","speakingRate":1.2}' --output sample.mp3
```

**九、文件与模块位置说明（关键文件）**

- 项目根：`package.json`, `netlify.toml`, `astro.config.mjs`。
- 后端函数：`netlify/functions/tts.js` —— TTS 接口实现。
- 前端页面：`src/pages/index.astro` —— 主界面与会话逻辑。
- 帮助文档：`src/content/help/getting-started_zh.md`。
- 主要 JS 模块：
  - `src/lib/callsign.js`：呼号生成与答案规范化。
  - `src/lib/practice-session.js`：会话统计模型（targetCount、completedCount 等）。
  - `src/lib/answer-flow.js`：状态机与流程常量（idle、preparing、listening、answering、checking、resolved、sessionComplete）。
  - `src/lib/tts-client.js`：前端的 TTS 缓存与请求逻辑。
  - `src/lib/ui-audio.js`, `ui-animations.js`, `ui-feedback.js`：反馈、音频与动画支持。

**十、常见问题与故障排查**

问题：未听到音频
- 检查系统音量与浏览器标签是否被静音。
- 确认 `netlify dev` 服务正在运行并且 `/api/tts` 返回 200。
- 若启用了无线电音效，尝试暂时关闭以排除后处理问题。

问题：多选选项未出现或滞后
- 页面可能仍在从后端获取音频或在生成干扰项，稍等 <1s 或点击“再播放一次”。

问题：`Check` 按钮在输入模式下禁用
- 请至少输入一个字符；输入会被规范化后判断是否允许提交。

**十一、维护与扩展说明**

- 若要增加新口音或语音参数：更新 `netlify/functions/tts.js` 的映射与 `src/lib/tts-client.js` 的缓存键策略。
- 增加持久化设置（本地保存）：可在 `src/lib` 添加 `settings-storage.js`，使用 `localStorage` 保存当前用户设置并在页面加载时恢复。
- 若要支持后端缓存：可在 Netlify 函数层或外部缓存（Redis、Cloud Storage）缓存合成音频以节省云调用费用。

版本控制建议：提交本手册文件并把关键配置（如 `netlify/functions/tts.js` 变更）包含在单独的功能分支中，便于审计。

**十二、附录 — 答案规范与数字发音规则（用于软著说明）**

答案规范化（正式规则）:

1. 所有用户输入统一转换为大写。
2. 删除所有非字母数字字符。
3. 对运输模式，正确答案集合包含：完整呼号（如 `CA123`）与仅数字（如 `123`）。

ICAO 数字拼音映射（关键例外项加粗）:

- 0 -> zero
- 1 -> one
- 2 -> two
- 3 -> tree
- 4 -> fower
- 5 -> fife
- 6 -> six
- 7 -> seven
- 8 -> eight
- 9 -> niner

数字分组规则（用于朗读 / 生成语音）：

- 3 位数字：按 `1 + 2` 分组（例如 `123` 朗读为 `one two-three`）。
- 4 位数字：按 `2 + 2` 分组（例如 `1234` 朗读为 `twelve thirty-four`）。
- 5 位数字：按 `1 + 2 + 2` 分组（例如 `12345` 朗读为 `one twenty-three forty-five`）。

实例（输入 -> 规范化 -> 接受）：

- `Air China one two tree` -> 期望 `CA123` 或 `123`。
- `Cessna Delta X-ray Foxtrot` -> 期望 `DXF`。

--

、