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
  return answer ? `Correct answer: ${answer}` : "Correct answer revealed.";
}

function buildIncorrectDetail(correctAnswer) {
  const answer = cleanText(correctAnswer);
  return answer ? `Correct answer: ${answer}` : "Try the next one.";
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
      headline: cleanText(headline) || "Session complete",
      detail: cleanText(detail) || cleanText(sessionSummary) || "Nice work. You can start another round."
    };
  }

  if (resolvedState === FEEDBACK_STATES.CORRECT || isCorrect === true) {
    return {
      state: FEEDBACK_STATES.CORRECT,
      tone: FEEDBACK_TONES.SUCCESS,
      headline: cleanText(headline) || "Correct",
      detail: cleanText(detail) || buildCorrectDetail(correctAnswer)
    };
  }

  if (resolvedState === FEEDBACK_STATES.INCORRECT || isCorrect === false) {
    return {
      state: FEEDBACK_STATES.INCORRECT,
      tone: FEEDBACK_TONES.ERROR,
      headline: cleanText(headline) || "Not quite",
      detail: cleanText(detail) || buildIncorrectDetail(correctAnswer)
    };
  }

  if (resolvedState === FEEDBACK_STATES.CHECKING) {
    return {
      state: resolvedState,
      tone: FEEDBACK_TONES.NEUTRAL,
      headline: cleanText(headline) || "Checking",
      detail: cleanText(detail) || "Checking your answer..."
    };
  }

  if (resolvedState === FEEDBACK_STATES.LISTENING) {
    return {
      state: resolvedState,
      tone: FEEDBACK_TONES.NEUTRAL,
      headline: cleanText(headline) || "Listening",
      detail: cleanText(detail) || "Listen first, then answer."
    };
  }

  if (resolvedState === FEEDBACK_STATES.PREPARING) {
    return {
      state: resolvedState,
      tone: FEEDBACK_TONES.NEUTRAL,
      headline: cleanText(headline) || "Preparing transmission",
      detail: cleanText(detail) || "Getting the next callsign ready."
    };
  }

  return {
    state: FEEDBACK_STATES.IDLE,
    tone: FEEDBACK_TONES.NEUTRAL,
    headline: cleanText(headline) || "Ready",
    detail: cleanText(detail) || "Ready for your first callsign."
  };
}

export function getStreakMilestoneMessage(streak) {
  const value = Number(streak) || 0;

  if (value === 3) {
    return "3 streak";
  }

  if (value === 5) {
    return "5 clean copies";
  }

  if (value === 8) {
    return "8 in a row";
  }

  return "";
}

export function getProgressMilestoneMessage(completedCount) {
  const value = Number(completedCount) || 0;

  if (value === 5) {
    return "Warm-up complete";
  }

  if (value === 10) {
    return "Good rhythm";
  }

  if (value === 15) {
    return "Strong session";
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
    `${completed} callsigns completed`,
    `Accuracy: ${Math.round(percent)}%`,
    streak > 0 ? `Best streak: ${streak}` : "",
    cleanText(detail)
  ].filter(Boolean);

  return buildFeedbackViewModel({
    state: FEEDBACK_STATES.SESSION_COMPLETE,
    headline: "Session complete",
    detail: lines.join(" | ")
  });
}
