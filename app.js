/*
 * Terminal Playfair CLI — Interactive Terminal Runner
 * ---------------------------------------------------------------------------
 * Thin readline wrapper around the playfair module for encrypting plaintext,
 * decrypting ciphertext, and printing formatted 5x5 key squares.
 */

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { buildMatrix, encrypt, decrypt } = require('./playfair');

const ENCRYPT_RESPONSES = new Set([
  '1',
  'e',
  'encrypt',
  'encrypting',
  'encrypting plaintext',
]);

const DECRYPT_RESPONSES = new Set([
  '2',
  'd',
  'decrypt',
  'decrypting',
  'decrypting ciphertext',
]);

const VISUALIZE_RESPONSES = new Set([
  '3',
  'v',
  'visualize',
  'visualizing',
  'visualizing a matrix',
]);

// Using the readline async iterator queues buffered lines from piped stdin,
// whereas repeated rl.question() calls drop lines after stdin emits 'end'.
function createPrompter(rl) {
  const lines = rl[Symbol.asyncIterator]();

  return async function ask(prompt) {
    output.write(prompt);
    const { value, done } = await lines.next();
    return done ? null : value;
  };
}

function formatMatrix(matrix) {
  return matrix.map((row) => row.join(' ')).join('\n');
}

async function askMode(ask) {
  while (true) {
    const raw = await ask(
      'Do you need help (1) encrypting plaintext, (2) decrypting ciphertext, or (3) visualizing a 5x5 matrix? \nType 1, 2, or 3 and press enter.\n'
    );
    if (raw === null) {
      return null;
    }

    const choice = raw.toLowerCase().trim();
    if (ENCRYPT_RESPONSES.has(choice)) {
      return 'encrypt';
    }
    if (DECRYPT_RESPONSES.has(choice)) {
      return 'decrypt';
    }
    if (VISUALIZE_RESPONSES.has(choice)) {
      return 'visualize';
    }

    console.log(`\nInvalid response, '${choice}', please try again.\n`);
  }
}

async function runCli() {
  console.log(
    '\nWelcome to Terminal Playfair, the home for all of your Playfair cipher-related cryptography needs.\n'
  );

  const rl = readline.createInterface({ input, output });
  const ask = createPrompter(rl);

  try {
    const mode = await askMode(ask);
    if (mode === null) {
      console.log('\nFarewell.');
      return;
    }

    if (mode === 'visualize') {
      const keyword = await ask('\nEnter the keyword: \n');
      if (keyword === null) {
        console.log('\nFarewell.');
        return;
      }

      console.log(`\n${formatMatrix(buildMatrix(keyword))}\n`);
      return;
    }

    const textPrompt =
      mode === 'encrypt'
        ? '\nEnter the plaintext you want to encrypt: \n'
        : '\nEnter the ciphertext you want to decrypt: \n';

    const text = await ask(textPrompt);
    if (text === null) {
      console.log('\nFarewell.');
      return;
    }

    const keyword = await ask('Enter the keyword: \n');
    if (keyword === null) {
      console.log('\nFarewell.');
      return;
    }

    if (mode === 'encrypt') {
      console.log(`\n${encrypt(text, keyword)}\n`);
      return;
    }

    try {
      console.log(`\n${decrypt(text, keyword)}\n`);
    } catch (err) {
      if (err instanceof RangeError) {
        console.error(`\nInvalid ciphertext: ${err.message}\n`);
        process.exitCode = 1;
        return;
      }
      throw err;
    }
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  runCli();
}

module.exports = { runCli, formatMatrix };
