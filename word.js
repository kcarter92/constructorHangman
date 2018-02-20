var Letter = require('./letter.js')

function Word(wrd) {
  this.word = wrd
  //collection of letter objects
  this.letters = []
  this.wordFound = false

  this.getLetters = function () {
      //populate the collection above with new Letter objects
      for (var i = 0; i < this.word.length; i++) {
          var newLetter = new Letter(this.word[i]);
          this.letters.push(newLetter);
      }
  }

  this.wordCheck = function () {
    if (this.letters.every(function (lttr) {
        return lttr.appear === true;
    })) {
        this.wordFound = true;
        return true;
    }
  }

  this.letterCheck = function (guessedLetter) {
    var whatToReturn = 0
    this.letters.forEach(function(lttr) {
      if(lttr.letter === guessedLetter){
        lttr.appear = true
        whatToReturn++
      }
    })
    return whatToReturn
  }

  this.wordRender = function() {
    var display = ''
    this.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender()
      display+= currentLetter
    })
    return display
  }
}

module.exports = Word