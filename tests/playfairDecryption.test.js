const playfairDecryption = require('../playfairDecryption');

test('accurately decodes ciphertext, given keyword', () => {
  expect(playfairDecryption('AMMZMHKTDCAIZU', 'CAMEL')).toBe('CALXLFORBACKUP');
});

test('handles row-based looping gracefully', () => {
  expect(playfairDecryption('LCPIMY', 'CAMEL')).toBe('ELOPEX');
});

test('handles column-based looping gracefully', () => {
  expect(playfairDecryption('QCMK', 'CAMEL')).toBe('IVAN');
});
