const createBigrams = require('../createBigrams');

test('adds an X to break up same-letter pairs', () => {
  expect(createBigrams('balloon')).toEqual(['BA', 'LX', 'LO', 'ON']);
});

test('adds an X to complete a pair', () => {
  expect(createBigrams('tiger')).toEqual(['TI', 'GE', 'RX']);
});
