import {
  FEEDBACK_COPY,
  formatAccuracy,
  formatBestStreak,
  formatCompletedCallsigns
} from "./copy-zh.js";

export const FEEDBACK_STATES = Object.freeze({
  IDLE: "idle",
  PREPARING: "preparing",
  LISTENING: "listening",
  CHECKING: "checking",
  CORRECT: "correct",
  INCORRECT: "incorrect",
  SESSION_COMPLETE: "sessionComplete"
});

export const FEEDBACK_TONES = Object.freeze({
  NEUTRAL: "neutral",
  POSITIVE: "positive",
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error"
});

export const STREAK_MILESTONES = Object.freeze([3, 5, 8]);
export const PROGRESS_MILESTONES = Object.freeze([5, 10, 15]);

function cleanText(value) {
  return String(value ?? "").trim();
}

function buildCorrectDetail(correctAnswer) {
  const answer = cleanText(correctAnswer);
  return answer ? `${FEEDBACK_COPY.correctAnswerPrefix}${answer}` : FEEDBACK_COPY.correctAnswerFallback;
}

function buildIncorrectDetail(correctAnswer) {
  const answer = cleanText(correctAnswer);
  return answer ? `${FEEDBACK_COPY.correctAnswerPrefix}${answer}` : FEEDBACK_COPY.incorrectFallback;
}

export function buildFeedbackViewModel({
  state = FEEDBACK_STATES.IDLE,
  isCorrect = null,
  correctAnswer = "",
  headline = "",
  detail = "",
  sessionSummary = ""
} = {}) {
  const validStates = Object.values(FEEDBACK_STATES);
  const resolvedState = validStates.includes(state) ? state : FEEDBACK_STATES.IDLE;

  if (resolvedState === FEEDBACK_STATES.SESSION_COMPLETE) {
    return {
      state: resolvedState,
      tone: FEEDBACK_TONES.NEUTRAL,
      headline: cleanText(headline) || FEEDBACK_COPY.sessionCompleteHeadline,
      detail: cleanText(detail) || cleanText(sessionSummary) || FEEDBACK_COPY.sessionCompleteDetail
    };
  }

  if (resolvedState === FEEDBACK_STATES.CORRECT || isCorrect === true) {
    return {
      state: FEEDBACK_STATES.CORRECT,
      tone: FEEDBACK_TONES.SUCCESS,
      headline: cleanText(headline) || FEEDBACK_COPY.correctHeadline,
      detail: cleanText(detail) || buildCorrectDetail(correctAnswer)
    };
  }

  if (resolvedState === FEEDBACK_STATES.INCORRECT || isCorrect === false) {
    return {
      state: FEEDBACK_STATES.INCORRECT,
      tone: FEEDBACK_TONES.ERROR,
      headline: cleanText(headline) || FEEDBACK_COPY.incorrectHeadline,
      detail: cleanText(detail) || buildIncorrectDetail(correctAnswer)
    };
  }

  if (resolvedState === FEEDBACK_STATES.CHECKING) {
    return {
      state: resolvedState,
      tone: FEEDBACK_TONES.NEUTRAL,
      headline: cleanText(headline) || FEEDBACK_COPY.checkingHeadline,
      detail: cleanText(detail) || FEEDBACK_COPY.checkingDetail
    };
  }

  if (resolvedState === FEEDBACK_STATES.LISTENING) {
    return {
      state: resolvedState,
      tone: FEEDBACK_TONES.NEUTRAL,
      headline: cleanText(headline) || FEEDBACK_COPY.listeningHeadline,
      detail: cleanText(detail) || FEEDBACK_COPY.listeningDetail
    };
  }

  if (resolvedState === FEEDBACK_STATES.PREPARING) {
    return {
      state: resolvedState,
      tone: FEEDBACK_TONES.NEUTRAL,
      headline: cleanText(headline) || FEEDBACK_COPY.preparingHeadline,
      detail: cleanText(detail) || FEEDBACK_COPY.preparingDetail
    };
  }

  return {
    state: FEEDBACK_STATES.IDLE,
    tone: FEEDBACK_TONES.NEUTRAL,
    headline: cleanText(headline) || FEEDBACK_COPY.readyHeadline,
    detail: cleanText(detail) || FEEDBACK_COPY.readyDetail
  };
}

export function getStreakMilestoneMessage(streak) {
  const value = Number(streak) || 0;

  if (value === 3) {
    return FEEDBACK_COPY.streak3;
  }

  if (value === 5) {
    return FEEDBACK_COPY.streak5;
  }

  if (value === 8) {
    return FEEDBACK_COPY.streak8;
  }

  return "";
}

export function getProgressMilestoneMessage(completedCount) {
  const value = Number(completedCount) || 0;

  if (value === 5) {
    return FEEDBACK_COPY.progress5;
  }

  if (value === 10) {
    return FEEDBACK_COPY.progress10;
  }

  if (value === 15) {
    return FEEDBACK_COPY.progress15;
  }

  return "";
}

export function buildSessionCompleteViewModel({
  completedCount = 0,
  accuracy = 0,
  bestStreak = 0,
  detail = ""
} = {}) {
  const completed = Number(completedCount) || 0;
  const percent = Number(accuracy) || 0;
  const streak = Number(bestStreak) || 0;
  const lines = [
    formatCompletedCallsigns(completed),
    formatAccuracy(percent),
    streak > 0 ? formatBestStreak(streak) : "",
    cleanText(detail)
  ].filter(Boolean);

  return buildFeedbackViewModel({
    state: FEEDBACK_STATES.SESSION_COMPLETE,
    headline: FEEDBACK_COPY.sessionCompleteHeadline,
    detail: lines.join(" | ")
  });
}
