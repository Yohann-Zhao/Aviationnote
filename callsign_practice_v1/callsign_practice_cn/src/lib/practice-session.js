import { PRACTICE_SESSION_COPY } from "./copy-zh.js";

export const DEFAULT_SESSION_TARGET = 10;
export const STREAK_MILESTONES = [3, 5, 8];
export const PROGRESS_MILESTONES = [5, 10, 15];

function clampSessionTarget(value) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_SESSION_TARGET;
  }

  return Math.min(50, Math.max(1, Math.round(parsed)));
}

function calculateAccuracy(correctCount, completedCount) {
  if (!completedCount) {
    return 0;
  }

  return Math.round((correctCount / completedCount) * 100);
}

export function createPracticeSession(options = {}) {
  const targetCount = clampSessionTarget(options.targetCount);

  return {
    targetCount,
    completedCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    currentStreak: 0,
    bestStreak: 0,
    accuracy: 0
  };
}

export function applyAnswerResult(session, isCorrect) {
  const completedCount = session.completedCount + 1;
  const correctCount = session.correctCount + (isCorrect ? 1 : 0);
  const incorrectCount = session.incorrectCount + (isCorrect ? 0 : 1);
  const currentStreak = isCorrect ? session.currentStreak + 1 : 0;
  const bestStreak = Math.max(session.bestStreak, currentStreak);
  const accuracy = calculateAccuracy(correctCount, completedCount);

  const nextSession = {
    ...session,
    completedCount,
    correctCount,
    incorrectCount,
    currentStreak,
    bestStreak,
    accuracy
  };

  return {
    session: nextSession,
    milestones: {
      streak: STREAK_MILESTONES.filter((value) => value === currentStreak),
      progress: PROGRESS_MILESTONES.filter((value) => value === completedCount)
    }
  };
}

export function isSessionComplete(session) {
  return session.completedCount >= session.targetCount;
}

export function getSessionProgressText(session) {
  return `${session.completedCount} / ${session.targetCount}`;
}

export function buildSessionSummary(session, modeLabel) {
  return {
    completedLabel: `${PRACTICE_SESSION_COPY.completedLabel} ${session.completedCount} 个航呼`,
    accuracyLabel: `${PRACTICE_SESSION_COPY.accuracyLabel} ${session.accuracy}%`,
    streakLabel: `${PRACTICE_SESSION_COPY.bestStreakLabel} ${session.bestStreak}`,
    encouragement:
      session.accuracy >= 85
        ? PRACTICE_SESSION_COPY.encouragementHigh.replace("{mode}", modeLabel)
        : session.accuracy >= 65
          ? PRACTICE_SESSION_COPY.encouragementMid.replace("{mode}", modeLabel)
          : PRACTICE_SESSION_COPY.encouragementLow.replace("{mode}", modeLabel)
  };
}
