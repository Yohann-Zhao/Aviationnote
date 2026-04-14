import { normalizeAnswerInput } from "./callsign.js";
import { ANSWER_FLOW_COPY } from "./copy-zh.js";

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
      return ANSWER_FLOW_COPY.preparing;
    case QUESTION_STATES.LISTENING:
      return ANSWER_FLOW_COPY.listening;
    case QUESTION_STATES.CHECKING:
      return ANSWER_FLOW_COPY.checking;
    case QUESTION_STATES.RESOLVED:
      return ANSWER_FLOW_COPY.next;
    case QUESTION_STATES.SESSION_COMPLETE:
      return ANSWER_FLOW_COPY.restart;
    default:
      return ANSWER_FLOW_COPY.check;
  }
}
