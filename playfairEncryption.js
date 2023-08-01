const buildMatrix = require('./matrixBuilder');
const createBigrams = require('./createBigrams');
const findCoordinates = require('./findCoordinates');

function playfairEncryption(plaintext, keyword) {
  const matrix = buildMatrix(keyword);
  const bigrams = createBigrams(plaintext);

  let ciphertext = '';

  for (let i = 0; i < bigrams.length; i++) {
    let letterOne = bigrams[i][0];
    let letterTwo = bigrams[i][1];

    let letterOneCoordinates = findCoordinates(matrix, letterOne);
    let letterTwoCoordinates = findCoordinates(matrix, letterTwo);

    // Are the letters in the same row?
    if (letterOneCoordinates[0] === letterTwoCoordinates[0]) {
      let newLetterOneColumn = (letterOneCoordinates[1] + 1) % 5;
      let encryptedLetterOne =
        matrix[letterOneCoordinates[0]][newLetterOneColumn];

      ciphertext += encryptedLetterOne;

      let newLetterTwoColumn = (letterTwoCoordinates[1] + 1) % 5;
      let encryptedLetterTwo =
        matrix[letterTwoCoordinates[0]][newLetterTwoColumn];

      ciphertext += encryptedLetterTwo;
    }

    // Are the letters in the same column?
    else if (letterOneCoordinates[1] === letterTwoCoordinates[1]) {
      let newLetterOneRow = (letterOneCoordinates[0] + 1) % 5;
      let encryptedLetterOne = matrix[newLetterOneRow][letterOneCoordinates[1]];

      ciphertext += encryptedLetterOne;

      let newLetterTwoRow = (letterTwoCoordinates[0] + 1) % 5;
      let encryptedLetterTwo = matrix[newLetterTwoRow][letterTwoCoordinates[1]];

      ciphertext += encryptedLetterTwo;
    }

    // If they aren't in the same row or column, swap y-values.
    else {
      let encryptedLetterOne =
        matrix[letterOneCoordinates[0]][letterTwoCoordinates[1]];

      ciphertext += encryptedLetterOne;

      let encryptedLetterTwo =
        matrix[letterTwoCoordinates[0]][letterOneCoordinates[1]];

      ciphertext += encryptedLetterTwo;
    }
  }

  return ciphertext;
}

module.exports = playfairEncryption;
