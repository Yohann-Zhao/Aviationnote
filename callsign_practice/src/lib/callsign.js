const MANUFACTURERS = [
  "Cessna",
  "Piper",
  "Beechcraft",
  "Diamond",
  "Cirrus",
  "Boeing",
  "Airbus",
  "Embraer"
];

const ICAO_DIGITS = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "tree",
  "4": "fower",
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

function pick(values) {
  return values[Math.floor(Math.random() * values.length)];
}

function buildNumericSuffix(length) {
  let suffix = String(Math.floor(Math.random() * 9) + 1);

  while (suffix.length < length) {
    suffix += String(Math.floor(Math.random() * 10));
  }

  return suffix;
}

export function generateRandomCallsign(options = {}) {
  const manufacturers = options.manufacturers ?? MANUFACTURERS;
  const numericLengths = options.numericLengths ?? [3, 4];

  return `${pick(manufacturers)}${buildNumericSuffix(pick(numericLengths))}`;
}

export function splitCallsign(callsign) {
  // Keep prefix parsing isolated so the number grouping can evolve later.
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

export function convertCallsignToSpokenPhrase(callsign) {
  const { prefix, numericSuffix } = splitCallsign(callsign);

  if (!numericSuffix) {
    return prefix;
  }

  return `${prefix} ${pronounceNumericSuffix(numericSuffix)}`;
}

export function buildCallsignSample(options = {}) {
  const callsign = generateRandomCallsign(options);

  return {
    callsign,
    spokenPhrase: convertCallsignToSpokenPhrase(callsign)
  };
}
