const buildMatrix = require('./matrixBuilder');
const createBigrams = require('./createBigrams');
const findCoordinates = require('./findCoordinates');

function playfairDecryption(ciphertext, keyword) {
  const matrix = buildMatrix(keyword);
  const bigrams = createBigrams(ciphertext);

  let plaintext = '';

  for (let i = 0; i < bigrams.length; i++) {
    let letterOne = bigrams[i][0];
    let letterTwo = bigrams[i][1];

    let letterOneCoordinates = findCoordinates(matrix, letterOne);
    let letterTwoCoordinates = findCoordinates(matrix, letterTwo);

    // Are the letters in the same row?
    if (letterOneCoordinates[0] === letterTwoCoordinates[0]) {
      let newLetterOneColumn = letterOneCoordinates[1] - 1;

      // Gracefully handle the transition from column 0 to column 4.
      if (newLetterOneColumn === -1) {
        newLetterOneColumn = 4;
      }

      let encryptedLetterOne =
        matrix[letterOneCoordinates[0]][newLetterOneColumn];

      plaintext += encryptedLetterOne;

      let newLetterTwoColumn = letterTwoCoordinates[1] - 1;

      if (newLetterTwoColumn === -1) {
        newLetterTwoColumn = 4;
      }

      let encryptedLetterTwo =
        matrix[letterTwoCoordinates[0]][newLetterTwoColumn];

      plaintext += encryptedLetterTwo;
    }

    // Are the letters in the same column?
    else if (letterOneCoordinates[1] === letterTwoCoordinates[1]) {
      let newLetterOneRow = letterOneCoordinates[0] - 1;

      // Gracefully handle the transition from row 0 to row 4.
      if (newLetterOneRow === -1) {
        newLetterOneRow = 4;
      }

      let encryptedLetterOne = matrix[newLetterOneRow][letterOneCoordinates[1]];

      plaintext += encryptedLetterOne;

      let newLetterTwoRow = letterTwoCoordinates[0] - 1;

      if (newLetterTwoRow === -1) {
        newLetterTwoRow = 4;
      }

      let encryptedLetterTwo = matrix[newLetterTwoRow][letterTwoCoordinates[1]];

      plaintext += encryptedLetterTwo;
    }

    // If they aren't in the same row or column, swap y-values.
    else {
      let encryptedLetterOne =
        matrix[letterOneCoordinates[0]][letterTwoCoordinates[1]];

      plaintext += encryptedLetterOne;

      let encryptedLetterTwo =
        matrix[letterTwoCoordinates[0]][letterOneCoordinates[1]];

      plaintext += encryptedLetterTwo;
    }
  }

  return plaintext;
}

module.exports = playfairDecryption;
