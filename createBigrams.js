/**
 * Break plaintext into pairs of letters (a.k.a., "bigrams")
 * plaintext {string} - the original, unencrypted message
 */
function createBigrams(plaintext) {
  // This regular expression removes any character that is not in the Latin alphabet (A-Z).
  let cleanText = plaintext.replace(/[^A-Za-z]/g, '').toUpperCase();

  let bigrams = [];

  for (let i = 0; i < cleanText.length; i += 2) {
    let letterOne = cleanText[i];
    let letterTwo = cleanText[i + 1];

    let pair = '';

    if (!letterTwo) {
      // Does letter two exist? If not, add 'X' or 'Q' to complete the bigram.
      pair += letterOne;

      if (letterOne !== 'X') {
        pair += 'X';
      } else {
        // If the un-paired letter is 'X', add 'Q' to complete the bigram.
        pair += 'Q';
      }

      bigrams.push(pair);
    } else if (letterOne === letterTwo) {
      // Replace letter two with 'X' or 'Q' to break up same-letter pairs.
      pair += letterOne;

      if (letterOne !== 'X') {
        pair += 'X';
      } else {
        // If the same-letter pair is (inexplicably) two 'X' characters, replace letter two with a 'Q'
        pair += 'Q';
      }

      bigrams.push(pair);

      // Adjust the value of i(ndex) to account for the additional letter.
      i -= 1;
    } else {
      pair += letterOne;
      pair += letterTwo;

      bigrams.push(pair);
    }
  }

  return bigrams;
}

module.exports = createBigrams;
