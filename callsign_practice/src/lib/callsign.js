const LEGACY_MANUFACTURERS = [
  "Cessna",
  "Piper",
  "Beechcraft",
  "Diamond",
  "Cirrus",
  "Boeing",
  "Airbus",
  "Embraer"
];

const TRANSPORT_AIRLINES = [
  { code: "CA", spokenName: "Air China" },
  { code: "MU", spokenName: "China Eastern" },
  { code: "CZ", spokenName: "China Southern" },
  { code: "AA", spokenName: "American" },
  { code: "BA", spokenName: "British Airways" },
  { code: "DL", spokenName: "Delta" },
  { code: "UA", spokenName: "United" },
  { code: "QF", spokenName: "Qantas" },
  { code: "SQ", spokenName: "Singapore" },
  { code: "CX", spokenName: "Cathay Pacific" },
  { code: "AF", spokenName: "Air France" },
  { code: "LH", spokenName: "Lufthansa" }
];

const GENERAL_AVIATION_TYPES = [
  "Cessna",
  "Piper",
  "Beechcraft",
  "Diamond",
  "Cirrus",
  "Pilatus",
  "Mooney",
  "Tecnam",
  "Gulfstream",
  "Socata"
];

export const DEFAULT_CUSTOM_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const PRACTICE_MODES = [
  {
    id: "transport",
    label: "Transport Airline",
    instruction: "Answer the flight number only."
  },
  {
    id: "generalAviation",
    label: "General Aviation",
    instruction: "Answer only the suffix after the aircraft type."
  },
  {
    id: "numeric",
    label: "Numeric Only",
    instruction: "Answer the full numeric callsign."
  },
  {
    id: "letters",
    label: "Custom Letters",
    instruction: "Answer the full letter group."
  }
];

const ICAO_LETTERS = {
  A: "Alpha",
  B: "Bravo",
  C: "Charlie",
  D: "Delta",
  E: "Echo",
  F: "Foxtrot",
  G: "Golf",
  H: "Hotel",
  I: "India",
  J: "Juliett",
  K: "Kilo",
  L: "Lima",
  M: "Mike",
  N: "November",
  O: "Oscar",
  P: "Papa",
  Q: "Quebec",
  R: "Romeo",
  S: "Sierra",
  T: "Tango",
  U: "Uniform",
  V: "Victor",
  W: "Whiskey",
  X: "X-ray",
  Y: "Yankee",
  Z: "Zulu"
};

const ICAO_DIGITS = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "tree",
  "4": "four",
  "5": "fife",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "niner"
};

const TEENS = {
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
  "13": "thirteen",
  "14": "fourteen",
  "15": "fifteen",
  "16": "sixteen",
  "17": "seventeen",
  "18": "eighteen",
  "19": "nineteen"
};

const TENS = {
  "2": "twenty",
  "3": "thirty",
  "4": "forty",
  "5": "fifty",
  "6": "sixty",
  "7": "seventy",
  "8": "eighty",
  "9": "ninety"
};

const DIGIT_CONFUSIONS = {
  "0": ["8", "6", "9"],
  "1": ["7", "4"],
  "2": ["3", "7", "8"],
  "3": ["2", "8", "5"],
  "4": ["1", "7", "9"],
  "5": ["3", "6", "8"],
  "6": ["5", "8", "0"],
  "7": ["1", "2", "4"],
  "8": ["0", "3", "6", "9"],
  "9": ["0", "4", "8"]
};

const LETTER_CONFUSION_GROUPS = [
  ["A", "H", "K", "X"],
  ["B", "P", "R"],
  ["C", "G", "O", "Q"],
  ["D", "O", "Q"],
  ["E", "F"],
  ["I", "L", "T", "Y"],
  ["M", "N", "W"],
  ["S", "Z"],
  ["U", "V"]
];

function pick(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function shuffle(values) {
  const result = [...values];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function normalizeAnswerInput(value) {
  return String(value ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

export function normalizeCustomLetterSet(value) {
  const letters = Array.from(
    new Set(
      String(value ?? "")
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .split("")
    )
  ).join("");

  return letters || DEFAULT_CUSTOM_LETTERS;
}

function buildNumericSuffix(length, { allowLeadingZero = false } = {}) {
  let suffix = allowLeadingZero ? String(Math.floor(Math.random() * 10)) : String(Math.floor(Math.random() * 9) + 1);

  while (suffix.length < length) {
    suffix += String(Math.floor(Math.random() * 10));
  }

  return suffix;
}

function buildLetterSequence(length, letters) {
  return Array.from({ length }, () => pick(letters)).join("");
}

function buildMixedSuffix(length, letters) {
  const targetLength = Math.max(3, length);
  const slots = [];
  let hasLetter = false;
  let hasDigit = false;

  for (let index = 0; index < targetLength; index += 1) {
    if (index === targetLength - 1 && !hasLetter) {
      slots.push(pick(letters));
      hasLetter = true;
      continue;
    }

    if (index === targetLength - 1 && !hasDigit) {
      slots.push(String(Math.floor(Math.random() * 10)));
      hasDigit = true;
      continue;
    }

    if (Math.random() < 0.55) {
      slots.push(pick(letters));
      hasLetter = true;
    } else {
      slots.push(String(Math.floor(Math.random() * 10)));
      hasDigit = true;
    }
  }

  return slots.join("");
}

export function generateRandomCallsign(options = {}) {
  const manufacturers = options.manufacturers ?? LEGACY_MANUFACTURERS;
  const numericLengths = options.numericLengths ?? [3, 4];

  return `${pick(manufacturers)}${buildNumericSuffix(pick(numericLengths))}`;
}

export function splitCallsign(callsign) {
  const match = String(callsign).trim().match(/^(.*?)(\d+)$/);

  if (!match) {
    return { prefix: String(callsign).trim(), numericSuffix: "" };
  }

  return {
    prefix: match[1].trim(),
    numericSuffix: match[2]
  };
}

export function splitNumberIntoGroups(numberPart) {
  if (numberPart.length <= 2) {
    return [numberPart];
  }

  const groups = [];
  const firstGroupLength = numberPart.length % 2 === 0 ? 2 : 1;
  let cursor = 0;

  if (firstGroupLength === 1) {
    groups.push(numberPart.slice(0, 1));
    cursor = 1;
  }

  while (cursor < numberPart.length) {
    groups.push(numberPart.slice(cursor, cursor + 2));
    cursor += 2;
  }

  return groups;
}

function pronounceDigit(digit) {
  return ICAO_DIGITS[digit] ?? digit;
}

function pronounceLetter(letter) {
  return ICAO_LETTERS[letter] ?? letter;
}

function pronounceTwoDigitGroup(group) {
  const normalized = group.padStart(2, "0");
  const [tensDigit, onesDigit] = normalized;

  if (tensDigit === "0") {
    return `${pronounceDigit("0")} ${pronounceDigit(onesDigit)}`;
  }

  if (tensDigit === "1") {
    return TEENS[normalized];
  }

  const tensWord = TENS[tensDigit];

  if (onesDigit === "0") {
    return tensWord;
  }

  return `${tensWord} ${pronounceDigit(onesDigit)}`;
}

export function pronounceNumericSuffix(numberPart) {
  return splitNumberIntoGroups(numberPart)
    .map((group) => (group.length === 1 ? pronounceDigit(group) : pronounceTwoDigitGroup(group)))
    .join(" ");
}

export function pronounceCharactersIndividually(value) {
  return String(value)
    .toUpperCase()
    .split("")
    .map((character) => (/[A-Z]/.test(character) ? pronounceLetter(character) : pronounceDigit(character)))
    .join(" ");
}

export function convertCallsignToSpokenPhrase(callsign) {
  const { prefix, numericSuffix } = splitCallsign(callsign);

  if (!numericSuffix) {
    return prefix;
  }

  return `${prefix} ${pronounceNumericSuffix(numericSuffix)}`;
}

function finalizeSample(sample) {
  const acceptedAnswers = sample.acceptedAnswers ?? [sample.answer];

  return {
    ...sample,
    answerNormalized: normalizeAnswerInput(sample.answer),
    acceptedAnswersNormalized: Array.from(
      new Set(acceptedAnswers.map((value) => normalizeAnswerInput(value)).filter(Boolean))
    )
  };
}

function buildLegacyCallsignSample(options = {}) {
  const callsign = generateRandomCallsign(options);

  return finalizeSample({
    mode: "legacy",
    label: "Legacy",
    instruction: "Answer the full callsign.",
    callsign,
    spokenPhrase: convertCallsignToSpokenPhrase(callsign),
    answer: callsign,
    revealAnswer: callsign
  });
}

function buildTransportSample() {
  const airline = pick(TRANSPORT_AIRLINES);
  const length = Math.random() < 0.5 ? 3 : 4;
  const flightNumber = buildNumericSuffix(length);

  return finalizeSample({
    mode: "transport",
    label: "Transport Airline",
    instruction: "Answer the flight number only.",
    callsign: `${airline.code}${flightNumber}`,
    spokenPhrase:
      length === 3
        ? `${airline.spokenName} ${pronounceCharactersIndividually(flightNumber)}`
        : `${airline.spokenName} ${pronounceNumericSuffix(flightNumber)}`,
    answer: flightNumber,
    acceptedAnswers: [flightNumber, `${airline.code}${flightNumber}`],
    revealAnswer: `${airline.code}${flightNumber} (type: ${flightNumber})`
  });
}

function buildGeneralAviationSample(options = {}) {
  const customLetters = normalizeCustomLetterSet(options.customLetters);
  const aircraftType = pick(GENERAL_AVIATION_TYPES);
  const useLettersOnly = Math.random() < 0.65;
  const suffix = useLettersOnly ? buildLetterSequence(3, customLetters) : buildMixedSuffix(3, customLetters);

  return finalizeSample({
    mode: "generalAviation",
    label: "General Aviation",
    instruction: "Answer only the suffix after the aircraft type.",
    callsign: `${aircraftType} ${suffix}`,
    spokenPhrase: `${aircraftType} ${pronounceCharactersIndividually(suffix)}`,
    answer: suffix,
    acceptedAnswers: [suffix, `${aircraftType} ${suffix}`],
    revealAnswer: `${aircraftType} ${suffix} (type: ${suffix})`
  });
}

function buildNumericSample() {
  const callsign = buildNumericSuffix(4);

  return finalizeSample({
    mode: "numeric",
    label: "Numeric Only",
    instruction: "Answer the full numeric callsign.",
    callsign,
    spokenPhrase: pronounceNumericSuffix(callsign),
    answer: callsign,
    revealAnswer: callsign
  });
}

function buildLettersSample(options = {}) {
  const customLetters = normalizeCustomLetterSet(options.customLetters);
  const letterLength = clamp(Number(options.letterLength) || 4, 2, 8);
  const letters = buildLetterSequence(letterLength, customLetters);

  return finalizeSample({
    mode: "letters",
    label: "Custom Letters",
    instruction: "Answer the full letter group.",
    callsign: letters,
    spokenPhrase: pronounceCharactersIndividually(letters),
    answer: letters,
    revealAnswer: letters
  });
}

function getLetterConfusions(letter, allowedLetters) {
  const matchingGroup = LETTER_CONFUSION_GROUPS.find((group) => group.includes(letter));
  const groupedOptions = matchingGroup?.filter((candidate) => candidate !== letter && allowedLetters.includes(candidate)) ?? [];

  if (groupedOptions.length > 0) {
    return groupedOptions;
  }

  return allowedLetters.filter((candidate) => candidate !== letter);
}

function mutateAnswerCharacter(character, allowedLetters) {
  if (/[0-9]/.test(character)) {
    const options = DIGIT_CONFUSIONS[character] ?? Object.keys(ICAO_DIGITS).filter((candidate) => candidate !== character);
    return pick(options);
  }

  const options = getLetterConfusions(character, allowedLetters);
  return pick(options.length > 0 ? options : DEFAULT_CUSTOM_LETTERS.split("").filter((candidate) => candidate !== character));
}

function buildFallbackChoice(answer, allowedLetters) {
  return answer
    .split("")
    .map((character) => {
      if (/[0-9]/.test(character)) {
        return pick(Object.keys(ICAO_DIGITS).filter((candidate) => candidate !== character));
      }

      const options = allowedLetters.filter((candidate) => candidate !== character);
      return pick(options.length > 0 ? options : DEFAULT_CUSTOM_LETTERS.split("").filter((candidate) => candidate !== character));
    })
    .join("");
}

function buildDistractor(answer, sample, allowedLetters) {
  const characters = answer.split("");
  const mutationCount = characters.length <= 3 ? 1 : Math.random() < 0.7 ? 1 : 2;
  const indexes = shuffle(characters.map((_, index) => index)).slice(0, mutationCount);

  for (const index of indexes) {
    characters[index] = mutateAnswerCharacter(characters[index], allowedLetters);
  }

  if (sample.mode === "transport" && Math.random() < 0.35 && characters.length >= 3) {
    const left = Math.floor(Math.random() * (characters.length - 1));
    [characters[left], characters[left + 1]] = [characters[left + 1], characters[left]];
  }

  return characters.join("");
}

export function buildAnswerChoices(sample, options = {}) {
  const count = clamp(Number(options.count) || 4, 2, 6);
  const correctAnswer = normalizeAnswerInput(sample.answer);
  const allowedLetters = normalizeCustomLetterSet(options.customLetters ?? sample.answer);
  const choices = new Set([correctAnswer]);
  let attempts = 0;

  while (choices.size < count && attempts < 120) {
    attempts += 1;
    const candidate = normalizeAnswerInput(buildDistractor(correctAnswer, sample, allowedLetters));

    if (candidate && candidate !== correctAnswer) {
      choices.add(candidate);
    }
  }

  while (choices.size < count) {
    const fallback = normalizeAnswerInput(buildFallbackChoice(correctAnswer, allowedLetters));

    if (fallback && fallback !== correctAnswer) {
      choices.add(fallback);
    }
  }

  return shuffle([...choices]).map((value) => ({
    value,
    isCorrect: value === correctAnswer
  }));
}

export function buildCallsignSample(options = {}) {
  switch (options.mode) {
    case "transport":
      return buildTransportSample();
    case "generalAviation":
      return buildGeneralAviationSample(options);
    case "numeric":
      return buildNumericSample();
    case "letters":
      return buildLettersSample(options);
    default:
      return buildLegacyCallsignSample(options);
  }
}