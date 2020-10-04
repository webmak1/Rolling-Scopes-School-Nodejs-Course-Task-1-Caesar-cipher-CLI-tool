const _ = require('lodash');

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_ARRAY = ALPHABET.split('');
const ALPHABET_LENGTH = ALPHABET.split('').length;

const ALPHABET_DOUBLE = ALPHABET + ALPHABET;
const ALPHABET_DOUBLE_ARRAY = ALPHABET_DOUBLE.split('');
const ALPHABET_DOUBLE_UPPER = ALPHABET_DOUBLE.toUpperCase();
const ALPHABET_DOUBLE_ARRAY_UPPER = ALPHABET_DOUBLE_UPPER.split('');

const ALPHABET_ARRAY_REVERSE = [...ALPHABET_ARRAY].reverse();
const ALPHABET_DOUBLE_ARRAY_REVERSE = [...ALPHABET_DOUBLE_ARRAY].reverse();
const ALPHABET_DOUBLE_ARRAY_UPPER_REVERSE = [
  ...ALPHABET_DOUBLE_ARRAY_UPPER
].reverse();

const calculatedShift = shift => {
  return shift - ALPHABET_LENGTH * parseInt(shift / ALPHABET_LENGTH);
};

module.exports = function calculate(inputString, action, shift) {
  let realShift = shift <= ALPHABET_LENGTH ? shift : calculatedShift(shift);
  const result =
    action == 'encode'
      ? encodeString(inputString, realShift)
      : decodeString(inputString, realShift);
  return result;
};

function encodeString(inputString, realShift) {
  const inputStringArray = inputString.split('');

  let result = '';

  _.forEach(inputStringArray, function(incomeLetter) {
    if (_.indexOf(ALPHABET_ARRAY, incomeLetter.toLowerCase()) == -1) {
      result += incomeLetter;
    } else {
      const letterIndex = _.indexOf(ALPHABET_ARRAY, incomeLetter.toLowerCase());

      const encodedIndex = letterIndex + realShift;
      result +=
        incomeLetter == incomeLetter.toUpperCase()
          ? ALPHABET_DOUBLE_ARRAY_UPPER[encodedIndex]
          : ALPHABET_DOUBLE_ARRAY[encodedIndex];
    }
  });

  return result;
}

function decodeString(inputString, realShift) {
  const inputStringArray = inputString.split('');

  let result = '';

  _.forEach(inputStringArray, function(incomeLetter) {
    if (_.indexOf(ALPHABET_ARRAY, incomeLetter.toLowerCase()) == -1) {
      result += incomeLetter;
    } else {
      const letterIndex = _.indexOf(
        ALPHABET_ARRAY_REVERSE,
        incomeLetter.toLowerCase()
      );

      const encodedIndex = letterIndex + realShift;
      result +=
        incomeLetter == incomeLetter.toUpperCase()
          ? ALPHABET_DOUBLE_ARRAY_UPPER_REVERSE[encodedIndex]
          : ALPHABET_DOUBLE_ARRAY_REVERSE[encodedIndex];
    }
  });

  return result;
}
