//Require necessary npm packages
var inquirer = require('inquirer');
var isLetter = require('is-letter');
//require objects/exports
var Word = require('./word.js');
var List = require('./list.js');

var wordBank = List.newWord.wordList
var guessesRemaining = 10
  //Empty Array. This will hold letters that have been guessed already.
var guessedLetters = []
var display = 0
var currentWord

startGame();

  function startGame() {
    console.log('---------------------------------------------------------')
    console.log('')
    console.log('Welcome to Punk Rock Hangman!')
    console.log('')
    console.log('---------------------------------------------------------')

    if(guessedLetters.length > 0){
      guessedLetters = []
    }
    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready to play?"
    }]).then(function(answer) {
      if(answer.play){
        newGame()
      } else {
        console.log("Okay. No one should be forced to do things they don't want to do. See ya!");
      }
    })}

    function newGame() {
      if(guessesRemaining === 10) {
        console.log("Get ready!")
        console.log("Goooooooooooooooo")

        var randNum = Math.floor(Math.random() * wordBank.length);
        currentWord = new Word(wordBank[randNum]);
        currentWord.getLetters(); //initiats get letters function
        console.log(currentWord.wordRender());
        userPrompts();
      } else {
        resetGuessesRemaining();
        newGame();
      }
    }
    function resetGuessesRemaining() {
      guessesRemaining = 10;
    }
    function userPrompts() {
      inquirer.prompt([{
        name: "chosenLtr",
        type: "input",
        message: "Choose a letter, dood:",
        validate: function(value) {
          if(isLetter(value)){
            return true;
          } else {
            return false;
          }
        }
      }]).then(function(ltr) {
        var letterReturned = (ltr.chosenLtr);
        var guessedAlready = false;
          for(var i = 0; i < guessedLetters.length; i++){
            if(letterReturned === guessedLetters[i]){
              guessedAlready = true;
            }
          }
          if(guessedAlready === false){
            guessedLetters.push(letterReturned);

            var found = currentWord.letterCheck(letterReturned);

            if(found === 0){
              console.log("Wrong!");
              guessesRemaining--;
              display++;
              console.log("Guesses remain: " + guessesRemaining);
              //console.log([display-1]); //check this later

              console.log("\n***************");
              console.log(currentWord.wordRender());
              console.log("\n***************");

              console.log("Letters guessed: " + guessedLetters);
            }else{
              console.log("Woohoo! You guessed correctly!");

                if(currentWord.wordCheck() === true){
                  console.log(currentWord.wordRender());
                  console.log("Congrats! You won!");
                } else {
                  console.log("Guesses remianing: " + guessesRemaining);
                  console.log(currentWord.wordRender());
                  console.log("\n***************");
                  console.log("Letters guessed: " + guessedLetters);
                }
            }
            if(guessesRemaining > 0 && currentWord.wordFound === false) {
              userPrompts();
            }else if(guessesRemaining === 0){
              console.log("Game over!");
              console.log("The word you were guessing was: " + currentWord.word);
            }
          } else {
              console.log("You've guessed that letter already. Try again.");
              userPrompts();
          }
      })
    }