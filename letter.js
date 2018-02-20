var Letter = function (ltr) {
  this.letter = ltr;
  this.appear = false;

  this.letterRender = function() {
    // if this is a blank space
    if (this.letter == ' ') {
        //mark the space true
        this.appear = true;
        // and return a space to the word
        return '  ';
      // if the letter hasn't been guessed
    } if (this.appear === false) {
        // return letters placeholder
        return ' _ ';
      // if the letter has appeared (guessed)
    } else {
        //show the letter
        return this.letter;
    }
  };
};

module.exports = Letter;