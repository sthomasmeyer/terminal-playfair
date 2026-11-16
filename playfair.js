/*
 * Playfair Cipher — 5x5 Grid & Bigram Substitution Module
 * ---------------------------------------------------------------------------
 * Builds an I/J-merged 5x5 key square and performs Playfair encryption and
 * decryption over one shared matrix-coordinate transformation core.
 */

const GRID_SIZE = 5;
const PLAYFAIR_ALPHABET = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

function assertString(value, label) {
  if (typeof value !== 'string') {
    throw new TypeError(`${label} must be a string.`);
  }
}

// Traditional Playfair merges I and J into one cell; normalize before
// deduplicating keywords or pairing plaintext so 'IJ' is treated as 'II'.
function normalizeLetters(text) {
  return text.toUpperCase().replace(/[^A-Z]/g, '').replaceAll('J', 'I');
}

function buildSquareData(keyword) {
  assertString(keyword, 'Keyword');

  const seen = new Set();
  for (const char of normalizeLetters(keyword)) {
    seen.add(char);
  }
  for (const char of PLAYFAIR_ALPHABET) {
    seen.add(char);
  }

  const letters = [...seen];
  const matrix = [];
  const positions = new Map();

  for (let row = 0; row < GRID_SIZE; row++) {
    const rowLetters = letters.slice(row * GRID_SIZE, (row + 1) * GRID_SIZE);
    matrix.push(rowLetters);
    for (let col = 0; col < GRID_SIZE; col++) {
      positions.set(rowLetters[col], [row, col]);
    }
  }

  return { matrix, positions };
}

function buildMatrix(keyword) {
  return buildSquareData(keyword).matrix;
}

function pairPlaintext(plaintext) {
  const letters = normalizeLetters(plaintext);
  const pairs = [];
  let i = 0;

  while (i < letters.length) {
    const first = letters[i];
    const second = letters[i + 1];

    if (!second || first === second) {
      pairs.push([first, first === 'X' ? 'Q' : 'X']);
      i += 1;
    } else {
      pairs.push([first, second]);
      i += 2;
    }
  }

  return pairs;
}

function pairCiphertext(ciphertext) {
  const letters = normalizeLetters(ciphertext);

  if (letters.length % 2 !== 0) {
    throw new RangeError(
      'Ciphertext must contain an even number of alphabetic characters.'
    );
  }

  const pairs = [];
  for (let i = 0; i < letters.length; i += 2) {
    const first = letters[i];
    const second = letters[i + 1];
    if (first === second) {
      throw new RangeError(
        `Invalid Playfair ciphertext pair '${first}${second}' at letter index ${i}.`
      );
    }
    pairs.push([first, second]);
  }

  return pairs;
}

function transformPairs(pairs, keyword, direction) {
  if (pairs.length === 0) {
    return '';
  }

  const { matrix, positions } = buildSquareData(keyword);
  let result = '';

  for (const [first, second] of pairs) {
    const [r1, c1] = positions.get(first);
    const [r2, c2] = positions.get(second);

    if (r1 === r2) {
      result += matrix[r1][(c1 + direction + GRID_SIZE) % GRID_SIZE];
      result += matrix[r2][(c2 + direction + GRID_SIZE) % GRID_SIZE];
    } else if (c1 === c2) {
      result += matrix[(r1 + direction + GRID_SIZE) % GRID_SIZE][c1];
      result += matrix[(r2 + direction + GRID_SIZE) % GRID_SIZE][c2];
    } else {
      result += matrix[r1][c2];
      result += matrix[r2][c1];
    }
  }

  return result;
}

function encrypt(plaintext, keyword) {
  assertString(plaintext, 'Plaintext');
  return transformPairs(pairPlaintext(plaintext), keyword, 1);
}

function decrypt(ciphertext, keyword) {
  assertString(ciphertext, 'Ciphertext');
  return transformPairs(pairCiphertext(ciphertext), keyword, -1);
}

module.exports = {
  buildMatrix,
  encrypt,
  decrypt,
};
