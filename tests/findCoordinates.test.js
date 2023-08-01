const findCoordinates = require('../findCoordinates');

test('returns appropriate coordinates', () => {
  expect(
    findCoordinates(
      [
        ['H', 'I', 'P', 'O', 'S'],
        ['A', 'B', 'C', 'D', 'E'],
        ['F', 'G', 'K', 'L', 'M'],
        ['N', 'Q', 'R', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z']
      ],
      'Z'
    )
  ).toEqual([4, 4]);
});
