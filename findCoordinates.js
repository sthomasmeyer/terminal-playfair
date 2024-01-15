/**
 * Determine x- and y-coordinates for a given character (e.g., 'Q') in a matrix.
 * squareMatrix {array} - an array of arrays, 5x5 according to Playfair cipher norms
 * character {string} - a letter in the Latin alphabet (A-Z)
 */
function findCoordinates(squareMatrix, character) {
  for (let x = 0; x < squareMatrix[0].length; x++) {
    for (let y = 0; y < squareMatrix[0].length; y++) {
      if (squareMatrix[x][y] === character) {
        return [x, y];
      }
    }
  }
}

module.exports = findCoordinates;
