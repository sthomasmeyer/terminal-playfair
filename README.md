# Terminal Playfair

Terminal Playfair is a zero-dependency command-line tool for Playfair cipher encryption, decryption, and 5x5 matrix visualization, built with Node.js.

## Features

- Apply standard `I/J`-merged Playfair cipher encryption to plaintext (handling duplicate letters with `X`/`Q` padding).
- Decrypt Playfair ciphertext with your keyword.
- Generate and display a formatted 5x5 key square aligned to your chosen keyword.

## Local Setup

Terminal Playfair has **zero external dependencies** and requires **Node.js v20+** (for `node --test`). To check your version, run **`node -v`**. If you need to install or update Node.js, see [nodejs.org](https://nodejs.org/en).

1. Clone the repository: **`git clone https://github.com/sthomasmeyer/terminal-playfair.git`**
2. Navigate into the project directory: **`cd terminal-playfair`**

## Usage

Run Terminal Playfair directly in your terminal with **`node app.js`** (or **`npm start`**).

### Encrypt a Message

1. Execute **`node app.js`**
2. When prompted, enter **`1`**
3. Enter the plaintext you want to encrypt (e.g., `"ATTACK AT DAWN"`)
4. Enter a keyword (e.g., `"TIGER"`)

### Decrypt a Message with the Key

1. Execute **`node app.js`**
2. When prompted, enter **`2`**
3. Enter the ciphertext you want to decrypt (e.g., `"HAAHBLHAFBZK"`)
4. Enter the keyword (e.g., `"TIGER"`)

### Visualize a 5x5 Matrix

1. Execute **`node app.js`**
2. When prompted, enter **`3`**
3. Enter your keyword (e.g., `"TIGER"`)

## Testing

Terminal Playfair uses Node's built-in test runner (`node:test`). To run the test suite, execute **`npm test`** (or **`node --test`**).

## Contributing

If you want to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

Terminal Playfair is released under the [MIT License](./LICENSE).
