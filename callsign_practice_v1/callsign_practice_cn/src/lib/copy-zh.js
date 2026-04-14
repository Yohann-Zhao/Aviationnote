export const PRACTICE_MODE_COPY = Object.freeze({
  mixed: {
    label: "运输航空 + 通航",
    summary: "航空公司 IATA + 数字，或机型 + 后缀。",
    instruction: "听航空公司航呼，或机型加后缀。",
    shortLabel: "运输 / 通航",
    metaLabel: "航空公司 IATA + 数字 / 机型 + 后缀"
  },
  transport: {
    label: "运输航空",
    summary: "IATA 代码 + 3 到 4 位航班号。",
    instruction: "可输入完整 IATA 航呼，或只输入数字部分。",
    shortLabel: "运输航空",
    metaLabel: "航空公司 IATA + 数字"
  },
  generalAviation: {
    label: "通用航空",
    summary: "机型 + 字母或字母数字混合后缀。",
    instruction: "请输入机型后的后缀。",
    shortLabel: "通用航空",
    metaLabel: "机型 + 后缀"
  },
  numeric: {
    label: "纯数字",
    summary: "独立的分组数字航呼。",
    instruction: "请输入完整数字航呼。",
    shortLabel: "数字",
    metaLabel: "仅数字"
  },
  letters: {
    label: "自定义字母",
    summary: "使用自定义字母池和可配置长度。",
    instruction: "请输入完整字母组。",
    shortLabel: "字母",
    metaLabel: "自定义字母组"
  }
});

export const ACCENT_OPTIONS_ZH = Object.freeze([
  { value: "mixed", label: "混合英语" },
  { value: "american", label: "美式英语" },
  { value: "british", label: "英式英语" },
  { value: "australian", label: "澳式英语" },
  { value: "indian", label: "印度英语" }
]);

export const ANSWER_MODES_ZH = Object.freeze([
  { value: "typed", label: "输入", toggleLabel: "输入" },
  { value: "multipleChoice", label: "四选一", toggleLabel: "选择" }
]);

export const HOME_COPY = Object.freeze({
  pageTitle: "航呼练习",
  hiddenLabels: {
    practiceMode: "航呼模式",
    answerMode: "作答方式",
    accent: "口音"
  },
  roundLabel: "题目",
  aboutLink: "帮助",
  readyEyebrow: "就绪",
  readyHeading: "准备好开始第一题了吗？",
  readyStatus: "准备好后即可开始。",
  primaryButtons: {
    play: "播放航呼",
    replay: "再播一次",
    customLetters: "自定义字母",
    showAnswer: "显示答案",
    hideAnswer: "隐藏答案",
    next: "下一题",
    restart: "开始新一轮",
    chooseOption: "请选择选项",
    typeToCheck: "输入后检查",
    check: "检查",
    preparing: "正在准备播报...",
    listening: "收听中...",
    checking: "正在检查..."
  },
  answerPanel: {
    eyebrow: "你的答案",
    typedHeading: "输入你听到的内容。",
    choiceHeading: "选择最接近的答案。",
    completeHeading: "本轮结束",
    modeAriaLabel: "作答方式",
    inputLabel: "输入航呼答案",
    inputPlaceholder: "输入答案",
    choiceListAriaLabel: "答案选项"
  },
  summaryPanel: {
    eyebrow: "本轮总结",
    heading: "本轮完成",
    completedLabel: "已完成",
    completedValue: "已完成 10 个航呼",
    accuracyLabel: "正确率",
    accuracyValue: "正确率 0%",
    bestStreakLabel: "最佳连对",
    bestStreakValue: "0",
    encouragement: "想练一组新的航呼时，再开始下一轮。"
  },
  settings: {
    eyebrow: "练习设置",
    title: "调整下一次播报。",
    copy: "展开任意分区即可查看全部选项和当前设置。",
    close: "关闭",
    sections: {
      mode: "航呼模式",
      voice: "语音",
      other: "其他",
      customLetters: "自定义字母"
    },
    voice: {
      accentLabel: "口音",
      accentNote: "选择用于合成的英语口音预设。",
      speakingRateLabel: "语速",
      speakingRateRange: "Google TTS 范围：0.25x 到 2.00x",
      radioToneLabel: "无线电效果",
      radioToneNote: "在合成后模拟航空无线电音色。",
      radioOn: "无线电已开",
      radioOff: "原始音频"
    },
    other: {
      feedbackOn: "反馈已开",
      feedbackOff: "反馈已关",
      soundOn: "声音开",
      soundOff: "声音关",
      vibrationOn: "振动开",
      vibrationOff: "振动关",
      soundLabel: "界面声音反馈",
      soundNote: "播放轻量的正确、错误和里程碑提示音。",
      vibrationLabel: "振动反馈",
      vibrationNote: "在支持的设备上使用振动反馈。"
    },
    customLetters: {
      defaultValue: "A-Z / 4 个字母",
      label: "自定义字母",
      placeholder: "例如：ABCXYZ",
      note: "输入自定义字母池。重复和无效字符会被移除。",
      lengthLabel: "字母长度",
      lengthNote: "仅用于“自定义字母”模式。",
      defaultPool: "A-Z",
      defaultSummary: "调整字母类航呼使用的字母池和输出长度。",
      activeSummary: "当前“自定义字母”轮次会使用此设置。",
      gaSummary: "通航模式生成字母类后缀时也会使用此设置。",
      mixedSummary: "混合模式生成通航航呼时也会使用此设置。"
    }
  },
  state: {
    correct: "正确",
    incorrect: "不完全正确",
    answerRevealed: "已显示答案",
    preparing: "准备中",
    listening: "收听中",
    checking: "检查中",
    sessionComplete: "本轮完成",
    yourTurn: "轮到你了"
  },
  headings: {
    correct: "抄收正确",
    incorrect: "查看正确航呼",
    answerRevealed: "查看航呼",
    preparing: "正在准备下一条航呼",
    listening: "请听航呼",
    checking: "正在检查你的答案",
    sessionComplete: "本轮完成"
  },
  status: {
    preparing: "正在生成音频并加载播放。",
    sessionCompletePrefix: "已完成",
    sessionCompleteAccuracy: "正确率",
    sessionCompleteBestStreak: "最佳连对",
    multipleChoice: "选择最接近的答案后会立即判题。",
    typed: "输入答案后点击“检查”。"
  },
  reveal: {
    acceptedPrefix: "可接受答案：",
    expectedPrefix: "标准答案：",
    pronunciationPrefix: "发音：",
    submittedPrefix: "你的答案："
  },
  transientFeedback: {
    audioIssueHeadline: "音频异常",
    audioIssueDetail: "音频播放失败。",
    prepareHeadline: "无法准备航呼",
    prepareDetail: "题目生成失败。",
    answerFirstHeadline: "请先作答",
    answerFirstChoice: "请先选择一个选项。",
    answerFirstTyped: "请先输入答案。"
  }
});

export const HELP_PAGE_COPY = Object.freeze({
  pageTitle: "航呼练习使用说明",
  eyebrow: "帮助",
  backLink: "返回练习"
});

export const PRACTICE_SESSION_COPY = Object.freeze({
  completedLabel: "已完成",
  accuracyLabel: "正确率",
  bestStreakLabel: "最佳连对",
  encouragementHigh: "在“{mode}”模式下状态很好，继续保持这个节奏。",
  encouragementMid: "在“{mode}”模式下进步不错，再来一轮会更稳。",
  encouragementLow: "在“{mode}”模式下热身完成，再来一轮会更顺。"
});

export const FEEDBACK_COPY = Object.freeze({
  correctAnswerPrefix: "正确答案：",
  correctAnswerFallback: "已显示正确答案。",
  incorrectFallback: "继续下一题吧。",
  sessionCompleteHeadline: "本轮完成",
  sessionCompleteDetail: "做得不错。你可以开始新一轮。",
  correctHeadline: "正确",
  incorrectHeadline: "不完全正确",
  checkingHeadline: "检查中",
  checkingDetail: "正在检查你的答案...",
  listeningHeadline: "收听中",
  listeningDetail: "请先听播报，再作答。",
  preparingHeadline: "准备播报",
  preparingDetail: "正在准备下一条航呼。",
  readyHeadline: "就绪",
  readyDetail: "准备好开始第一题。",
  streak3: "连续答对 3 题",
  streak5: "连续抄收 5 题",
  streak8: "连续答对 8 题",
  progress5: "热身完成",
  progress10: "节奏不错",
  progress15: "状态很好",
  completedFormat: "{count} 个航呼已完成",
  accuracyFormat: "正确率：{percent}%",
  bestStreakFormat: "最佳连对：{streak}"
});

export const ANSWER_FLOW_COPY = Object.freeze({
  preparing: "正在准备播报...",
  listening: "收听中...",
  checking: "正在检查...",
  next: "下一题",
  restart: "开始新一轮",
  check: "检查"
});

export function getModeDisplayValue(modeId) {
  return PRACTICE_MODE_COPY[modeId]?.shortLabel ?? PRACTICE_MODE_COPY.mixed.shortLabel;
}

export function getModeMetaLabel(modeId) {
  return PRACTICE_MODE_COPY[modeId]?.metaLabel ?? PRACTICE_MODE_COPY.mixed.metaLabel;
}

export function formatVoiceMetaLabel(speakingRate, radioTone) {
  const audioToneLabel = radioTone ? HOME_COPY.settings.voice.radioOn : HOME_COPY.settings.voice.radioOff;
  return `${speakingRate.toFixed(2)}x / ${audioToneLabel}`;
}

export function formatOtherPrimaryLabel(soundEnabled, vibrationEnabled) {
  return soundEnabled || vibrationEnabled
    ? HOME_COPY.settings.other.feedbackOn
    : HOME_COPY.settings.other.feedbackOff;
}

export function formatOtherMetaLabel(soundEnabled, vibrationEnabled) {
  const soundLabel = soundEnabled ? HOME_COPY.settings.other.soundOn : HOME_COPY.settings.other.soundOff;
  const vibrationLabel = vibrationEnabled
    ? HOME_COPY.settings.other.vibrationOn
    : HOME_COPY.settings.other.vibrationOff;
  return `${soundLabel} / ${vibrationLabel}`;
}

export function formatCustomLettersPrimaryLabel(customLetters, letterLength) {
  return `${customLetters} / ${letterLength} 个字母`;
}

export function getCustomLettersSummaryCopy(modeId) {
  if (modeId === "letters") {
    return HOME_COPY.settings.customLetters.activeSummary;
  }

  if (modeId === "generalAviation") {
    return HOME_COPY.settings.customLetters.gaSummary;
  }

  if (modeId === "mixed") {
    return HOME_COPY.settings.customLetters.mixedSummary;
  }

  return HOME_COPY.settings.customLetters.defaultSummary;
}

export function formatAcceptedInputCopy(sample) {
  if (!sample) {
    return "";
  }

  if (sample.mode === "transport") {
    return `${HOME_COPY.reveal.acceptedPrefix}${sample.answer} / ${sample.callsign}`;
  }

  if (sample.answer !== sample.callsign) {
    return `${HOME_COPY.reveal.expectedPrefix}${sample.answer}`;
  }

  return sample.instruction;
}

export function formatPronunciationCopy(spokenPhrase) {
  return `${HOME_COPY.reveal.pronunciationPrefix}${spokenPhrase}`;
}

export function formatSubmittedAnswerCopy(submittedValue) {
  return `${HOME_COPY.reveal.submittedPrefix}${submittedValue}`;
}

export function formatSessionCompleteStatus(session) {
  return `${HOME_COPY.status.sessionCompletePrefix} ${session.completedCount} 题。${HOME_COPY.status.sessionCompleteAccuracy} ${session.accuracy}%。${HOME_COPY.status.sessionCompleteBestStreak} ${session.bestStreak}。`;
}

export function formatCompletedCallsigns(count) {
  return FEEDBACK_COPY.completedFormat.replace("{count}", String(count));
}

export function formatAccuracy(percent) {
  return FEEDBACK_COPY.accuracyFormat.replace("{percent}", String(Math.round(percent)));
}

export function formatBestStreak(streak) {
  return FEEDBACK_COPY.bestStreakFormat.replace("{streak}", String(streak));
}
