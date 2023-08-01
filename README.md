# Terminal Playfair

Terminal Playfair (v1) is a command-line tool for Playfair cipher encryption, decryption, and visualization.

With Terminal Playfair, you can encrypt plaintext, decrypt ciphertext, and generate a 5x5 matrix aligned to your selected keyword.

## Features

- Apply the Playfair cipher encryption method to plaintext.
- Decrypt a Playfair cipher-encrypted message.
- Generate a traditional 5x5 matrix aligned to your chosen keyword.

## Local Installation Guide

Before installing Terminal Playfair, make sure Node.js and npm are installed on your machine. To check if you already have them, open your terminal and run these commands: (1) **`node -v`**, and (2) **`npm -v`**. Your terminal should display something like _v18.17.0_ for Node.js and _9.8.1_ for npm.

If you don't have them installed, you can follow [this link to install Node.js and npm](https://nodejs.org/en).

Once you have Node.js and npm, you can install Terminal Playfair by following these steps:

1. Clone the repository with the command **`git clone https://github.com/sthomasmeyer/terminal-playfair.git`**. This command creates a local project directory _terminal-playfair_. You can use the command **`ls`** to see it.

2. Navigate into the project directory with the command **`cd terminal-playfair`**

3. Install the dependencies with the command **`npm install`**

## Usage

Terminal Playfair is a command-line tool that you can run directly in your terminal.

### Encrypt a Message

1. Execute the command **`node app.js`**
2. When prompted, enter **`1`**
3. Enter the plaintext that you want to encrypt (e.g., "ATTACK AT DAWN")
4. Enter a keyword (e.g., "TIGER")

### Decrypt a Message with the Key

1. Execute the command **`node app.js`**
2. When prompted, enter **`2`**
3. Enter the ciphertext you want to decrypt (e.g., "HAAHBLHAFBZK")
4. Enter the keyword (e.g., "TIGER")

### Visualize a 5x5 Matrix

1. Execute the command **`node app.js`**
2. When prompted, enter **`3`**
3. Enter your keyword (e.g., "TIGER")

## Testing

Terminal Playfair uses Jest for testing. To run tests, execute the command **`npm test`**

## Contributing

If you want to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

Terminal Playfair is released under the MIT License.
