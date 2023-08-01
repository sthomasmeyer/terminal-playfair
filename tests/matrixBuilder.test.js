const buildMatrix = require('../matrixBuilder');

test('removes duplicate letters in keyword', () => {
  expect(buildMatrix('hippos')).toEqual([
    ['H', 'I', 'P', 'O', 'S'],
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'K', 'L', 'M'],
    ['N', 'Q', 'R', 'T', 'U'],
    ['V', 'W', 'X', 'Y', 'Z']
  ]);
});
