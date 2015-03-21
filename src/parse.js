import espree from 'espree';

export default function parse(code) {
  return espree.parse(code, {
    comments: true,
    attachComment: true,
    ecmaFeatures: {
      arrowFunctions: true,
      blockBindings: true,
      destructuring: true,
      regexYFlag: true,
      regexUFlag: true,
      templateStrings: true,
      binaryLiterals: true,
      octalLiterals: true,
      unicodeCodePointEscapes: true,
      defaultParams: true,
      restParams: true,
      forOf: true,
      objectLiteralComputedProperties: true,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      objectLiteralDuplicateProperties: true,
      generators: true,
      spread: true,
      classes: true,
      modules: true,
      jsx: true,
      globalReturn: true
    }
  });
}
