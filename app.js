const playfairEncryption = require('./playfairEncryption');
const playfairDecryption = require('./playfairDecryption');

const readline = require('readline');

console.log(
  `\nWelcome to Terminal Playfair, the home for all of your Playfair Cipher-related cryptography needs.\n`
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function encryptOrDecrypt() {
  rl.question(
    `Do you need help (1) encrypting plaintext or (2) decrypting ciphertext? \n`,
    (res) => {
      const encryptResponses = [
        '1',
        'e',
        'encrypt',
        'encrypting',
        'encrypting plaintext'
      ];
      const decryptResponses = [
        '2',
        'd',
        'decrypt',
        'decrypting',
        'decrypting ciphertext'
      ];

      res = res.toLowerCase().trim();

      if (encryptResponses.includes(res)) {
        executePlayfairEncryption();
      } else if (decryptResponses.includes(res)) {
        executePlayfairDecryption();
      } else {
        console.log(`\nInvalid response, ${res}, please try again.`);
        encryptOrDecrypt();
      }
    }
  );
}

function executePlayfairEncryption() {
  rl.question(`\nEnter the plaintext you want to encrypt: \n`, (res) => {
    let plaintext = res;

    rl.question(`Enter the keyword: \n`, (res) => {
      let keyword = res;

      console.log(`\n${playfairEncryption(plaintext, keyword)}\n`);
      rl.close();
    });
  });
}

function executePlayfairDecryption() {
  rl.question(`\nEnter the ciphertext you want to decrypt: \n`, (res) => {
    let ciphertext = res;

    rl.question(`Enter the keyword: \n`, (res) => {
      let keyword = res;

      console.log(`\n${playfairDecryption(ciphertext, keyword)}\n`);
      rl.close();
    });
  });
}

encryptOrDecrypt();
