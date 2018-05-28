/*
 * Create a list that holds all of your cards
 */
let listOfCards = document.getElementsByClassName("card");

// create array to hold different card classes for shuffle
let cardArray = [];

shuffleCards();

function shuffleCards() {
    cardArray = [];
    // loop through listOfCards to save card classes to cardArray
    for (const card of listOfCards){
        cardArray.push(card.childNodes[1].classList[1]);
    }

    // removes classes
    for (let i = 0; i < cardArray.length; i++) {
        listOfCards[i].childNodes[1].classList.remove(cardArray[i]);
   }

    // save returned array in a new variable
    shuffle(cardArray);

    // removes old class and replaces with new shuffled class
    for (let i = 0; i < cardArray.length; i++) {
        listOfCards[i].childNodes[1].classList.add(cardArray[i]);
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// selects the deck
 const deck = document.querySelector(".deck");

// event listener that fires once the deck has been clicked for counting elapsed time
timer();
function timer(){
    deck.addEventListener("click", function () {
        startTimer();
    }, { once: true });
}

 // add an eventListener to the deck
deck.addEventListener("click", function(event) {
    // checks if the sibling of deck was clicked (cards) or else do nothing
    if (event.target.nodeName === "LI") {
        displayCardSymbol(event.target);
        addToOpenCards(event.target);
    }
})

function displayCardSymbol(card) {
    card.classList.toggle("show");
}

// set counter to zero
let counter = 0;
const counterDisplay = document.querySelector(".moves");
counterDisplay.innerText = counter + " Moves";

// create array to hold cards
let openCards = [];
let card1, card2;

// this will be our check for once the game finishes (all cards are flipped and found their match)
let areAllCardsFlipped = false;

// function which adds two cards to openCards array for comparison
function addToOpenCards(card) {
    // add passed card to openCards array
    openCards.push(card);
    // start comparing the two cards once two cards have been added to the array
    if (openCards.length == 2) {
        // change counter
        incrementCounter();
        card1 = openCards[0];
        card2 = openCards[1];
        // check if the card classes match, if they do call function that lock cards
        if (card1.firstElementChild.classList[1] === card2.firstElementChild.classList[1]) {
            matchedCard(card1);
            matchedCard(card2);
            openCards.splice(0, 2);
        }

        // if cards don't match, reset the styles and remove the list for next try
        else if (card1.firstElementChild.classList[1] !== card2.firstElementChild.classList[1]) {
            // delay turning cards if they don't match and return to "not-show" state
            setTimeout(function delayReset() {
                displayCardSymbol(card1);
                displayCardSymbol(card2);
                openCards.splice(0, 2);
            }, 400);
        }
        starRating(counter);
        isGameOver();  
        if (areAllCardsFlipped === true) displayFinalScore();
    }
}

function incrementCounter() {
    counter++;
    if (counter == 1) counterDisplay.innerText = counter + " Move";
    else counterDisplay.innerText = counter + " Moves";
}

// checks if all cards are flipped meaning game is over
let showClassCounter;
function isGameOver() { 
    // iterate over listOfCards to check if all cards are matched (should add up to 16)
    showClassCounter = 0;
    for (const card of listOfCards) {
        if (card.classList.contains("match", "show")) {
            showClassCounter++;
        }
    }
    // meaning all cards are matched
    if (showClassCounter === 16) areAllCardsFlipped = true;  
}

const winDisplay = document.querySelector(".final-result-display");
const winMessage = document.querySelector(".win-message");

function displayFinalScore(num) {  
    winMessage.innerHTML = " ";
    winMessage.innerHTML = "<p>With " + counter + " moves and " + stars.children.length + " star(s). Can you do better?</p>";
    winDisplay.classList.remove("hidden");
}

const stars = document.querySelector(".stars");

function starRating(num) {
    // TO DO: implement rating
    // 10 tries == three stars
    // 13 tries == two stars
    // 14 or more tries == one star
    if (num == 12  || num == 18) { 
        stars.firstElementChild.remove();
    }
}

function resetCards() {
    for (let i = 0; i < listOfCards.length; i++){
        if (listOfCards[i].classList.contains("match")) matchedCard(listOfCards[i]);
    }
    for (let i = 0; i < listOfCards.length; i++) {
        if (listOfCards[i].classList.contains("show")) displayCardSymbol (listOfCards[i]);
    }
    shuffleCards();
}

function resetCounter() {
    let star1, star2;
    star1 = document.createElement("i");
    star2 = document.createElement("i");
    star1.classList.add("fa", "fa-star");
    star2.classList.add("fa", "fa-star");
    if (stars.children.length === 1) {
        stars.appendChild(star1);
        stars.appendChild(star2);
    }
    else if (stars.children.length === 2) {
        stars.appendChild(star1);
    }
    counter = 0;
    counterDisplay.innerText = counter + " Moves";
}

// function that lock two matched cards
function matchedCard(card) {
    card.classList.toggle("match");
}


// credits to this person for the timer function
// https://stackoverflow.com/a/34748056

var timerVar;
let timeDisplay = document.getElementById("timer");
timeDisplay.innerHTML = "0:0:0";

function startTimer(){
    timerVar = setInterval(countTimer, 1000);
    let totalSeconds = 0;

    function countTimer() {
        ++totalSeconds;
        let hour = Math.floor(totalSeconds / 3600);
        let minute = Math.floor((totalSeconds - hour * 3600) / 60);
        let seconds = totalSeconds - (hour * 3600 + minute * 60);

        timeDisplay.innerHTML = hour + ":" + minute + ":" + seconds;
    }
}

let restartButton = document.getElementById("restart");
let resetButton = document.getElementById("reset-button");

// event listener for restarting the game once game is won
restartButton.addEventListener("click", function() {
    resetCounter();
    resetCards();
    clearInterval(timerVar);
    timeDisplay.innerHTML = "0:0:0";
    timer();
})

// event listener for restarting the game mid-game
resetButton.addEventListener("click", function() {
    resetCounter();
    resetCards();
    clearInterval(timerVar);
    timeDisplay.innerHTML = "0:0:0";
    timer();
    showClassCounter = 0;
    areAllCardsFlipped = false;
    winDisplay.classList.add("hidden");
})