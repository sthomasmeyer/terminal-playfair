const playfairEncryption = require('../playfairEncryption');

test('produces expected ciphertext', () => {
  expect(playfairEncryption('the british are coming', 'goats')).toBe(
    'GLFCPLOLGMTQFDSIHPAV'
  );
});
