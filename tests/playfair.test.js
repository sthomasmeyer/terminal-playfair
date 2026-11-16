const { describe, test } = require('node:test');
const assert = require('node:assert/strict');
const { buildMatrix, encrypt, decrypt } = require('../playfair');

describe('Playfair cipher', () => {
  test('buildMatrix deduplicates letters, normalizes J->I, and strips non-letters', () => {
    assert.deepEqual(buildMatrix('hippos'), [
      ['H', 'I', 'P', 'O', 'S'],
      ['A', 'B', 'C', 'D', 'E'],
      ['F', 'G', 'K', 'L', 'M'],
      ['N', 'Q', 'R', 'T', 'U'],
      ['V', 'W', 'X', 'Y', 'Z'],
    ]);

    const jigsaw = buildMatrix('JIGSAW-123!');
    const flat = jigsaw.flat();
    assert.equal(flat.length, 25);
    assert.equal(new Set(flat).size, 25);
    assert.ok(!flat.includes('J'));
    assert.ok(flat.includes('Z'));
    assert.deepEqual(jigsaw[0], ['I', 'G', 'S', 'A', 'W']);
  });

  const cipherVectors = [
    {
      name: 'readme ATTACK AT DAWN vector',
      plaintext: 'ATTACK AT DAWN',
      keyword: 'TIGER',
      ciphertext: 'HAAHBLHAFBZK',
      decrypted: 'ATTACKATDAWN',
    },
    {
      name: 'goats / the british are coming',
      plaintext: 'the british are coming',
      keyword: 'goats',
      ciphertext: 'GLFCPLOLGMTQFDSIHPAV',
      decrypted: 'THEBRITISHARECOMINGX',
    },
    {
      name: 'row and column wrap-around (CAMEL / ELOPEX)',
      plaintext: 'ELOPE',
      keyword: 'CAMEL',
      ciphertext: 'LCPIMY',
      decrypted: 'ELOPEX',
    },
    {
      name: 'double-letter X padding (balloon -> BALXLOON)',
      plaintext: 'balloon',
      keyword: 'monarchy',
      ciphertext: 'IBSUPMNA',
      decrypted: 'BALXLOON',
    },
    {
      name: 'X-pair Q padding (XX -> XQXQ)',
      plaintext: 'XX',
      keyword: 'TIGER',
      ciphertext: 'GXGX',
      decrypted: 'XQXQ',
    },
    {
      name: 'J->I normalization before pairing (HIJINX -> HI IX IN XQ)',
      plaintext: 'HIJINX',
      keyword: 'JIGSAW',
      ciphertext: 'OBSUWHSX',
      decrypted: 'HIIXINXQ',
    },
    {
      name: 'empty input',
      plaintext: '',
      keyword: 'TIGER',
      ciphertext: '',
      decrypted: '',
    },
  ];

  for (const { name, plaintext, keyword, ciphertext, decrypted } of cipherVectors) {
    test(`encrypts & decrypts: ${name}`, () => {
      assert.equal(encrypt(plaintext, keyword), ciphertext);
      assert.equal(decrypt(ciphertext, keyword), decrypted);
    });
  }

  test('decrypt handles existing CAMEL vectors and grouped ciphertext spacing', () => {
    assert.equal(decrypt('AMMZMHKTDCAIZU', 'CAMEL'), 'CALXLFORBACKUP');
    assert.equal(decrypt('QCMK', 'CAMEL'), 'IVAN');
    assert.equal(decrypt('HAAH BLHA FBZK', 'TIGER'), 'ATTACKATDAWN');
  });

  test('rejects invalid types and malformed ciphertext', () => {
    assert.throws(() => buildMatrix(null), TypeError);
    assert.throws(() => encrypt(123, 'TIGER'), TypeError);
    assert.throws(() => encrypt('HELLO', 123), TypeError);
    assert.throws(() => decrypt(null, 'TIGER'), TypeError);

    assert.throws(() => decrypt('ABC', 'TIGER'), RangeError);
    assert.throws(() => decrypt('AA', 'TIGER'), RangeError);
  });
});
