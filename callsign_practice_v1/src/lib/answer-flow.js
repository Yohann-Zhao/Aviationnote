import { normalizeAnswerInput } from "./callsign.js";

export const QUESTION_STATES = {
  IDLE: "idle",
  PREPARING: "preparing",
  LISTENING: "listening",
  ANSWERING: "answering",
  CHECKING: "checking",
  RESOLVED: "resolved",
  SESSION_COMPLETE: "sessionComplete"
};

export function isMultipleChoiceMode(answerMode) {
  return answerMode === "multipleChoice";
}

export function canSubmitTypedAnswer(value) {
  return normalizeAnswerInput(value).length > 0;
}

export function canSubmitChoice(value) {
  return Boolean(normalizeAnswerInput(value));
}

export function canSubmitAnswer(answerMode, typedAnswer, selectedChoice) {
  return isMultipleChoiceMode(answerMode)
    ? canSubmitChoice(selectedChoice)
    : canSubmitTypedAnswer(typedAnswer);
}

export function resolveRoundAnswer(sample, options = {}) {
  const answerMode = options.answerMode || "typed";
  const submittedValue = isMultipleChoiceMode(answerMode) ? options.selectedChoice : options.typedAnswer;
  const normalizedSubmittedValue = normalizeAnswerInput(submittedValue);
  const isCorrect =
    normalizedSubmittedValue.length > 0 &&
    sample.acceptedAnswersNormalized.includes(normalizedSubmittedValue);

  return {
    answerMode,
    submittedValue: String(submittedValue ?? ""),
    normalizedSubmittedValue,
    isCorrect,
    correctAnswer: sample.answer,
    revealAnswer: sample.revealAnswer,
    correctNormalizedAnswer: sample.answerNormalized
  };
}

export function getChoiceState(choiceValue, resolution) {
  if (!resolution) {
    return "idle";
  }

  if (choiceValue === resolution.correctNormalizedAnswer) {
    return "correct";
  }

  if (!resolution.isCorrect && choiceValue === resolution.normalizedSubmittedValue) {
    return "incorrect";
  }

  return "idle";
}

export function getPrimaryActionLabel(questionState) {
  switch (questionState) {
    case QUESTION_STATES.PREPARING:
      return "Preparing transmission...";
    case QUESTION_STATES.LISTENING:
      return "Listening...";
    case QUESTION_STATES.CHECKING:
      return "Checking...";
    case QUESTION_STATES.RESOLVED:
      return "Next Callsign";
    case QUESTION_STATES.SESSION_COMPLETE:
      return "Start Another Round";
    default:
      return "Check";
  }
}
