/*
 * Construct a 5x5 matrix consisting of each letter in the modified (i/j) alphabet.
 * keyword {string}
 */
function buildMatrix(keyword) {
  /*
   * Clean the given string. Remember to remove any duplicate letters bc there can
   * only be one instance of each letter in the matrix.
   */
  let removeSpaces = keyword.replaceAll(' ', '');
  let keyArray = [...new Set(removeSpaces.toUpperCase().split(''))];

  // Replace any instance of the letter 'J' with 'I'
  for (let i = 0; i < keyArray.length; i++) {
    if (keyArray[i] === 'J') {
      keyArray[i] = 'I';
    }
  }

  let matrix = [];
  let modifiedAlphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'.split('');

  for (let col = 0; col < 5; col++) {
    let newRow = [];
    for (let row = 0; row < 5; row++) {
      if (keyArray.length != 0) {
        // Add each letter in the keyword to the matrix.
        newRow.push(keyArray[0]);

        // Every time you add a letter to the matrix, remove it from the alphabet.
        let targetIndex = modifiedAlphabet.indexOf(keyArray[0]);
        modifiedAlphabet.splice(targetIndex, 1);

        keyArray.shift();
      } else {
        // Add each remaining letter in the modified (i/j) alphabet to the matrix.
        newRow.push(modifiedAlphabet[0]);

        modifiedAlphabet.shift();
      }
    }
    matrix.push(newRow);
  }

  return matrix;
}

module.exports = buildMatrix;
