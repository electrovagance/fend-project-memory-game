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
deck.addEventListener("click", function() {
    timerFunction(true);
});
// }, {once: true});


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
function isGameOver() {
    // counter 
    let showClassCounter = 0;
    
    // iterate over listOfCards to check if all cards are matched (should add up to 16)
    for (const card of listOfCards) {
        if (card.classList.contains("match")) {
            showClassCounter++;
        }
    }
    // set areAllCardsFlipped to true if 16 instances are found
    // meaning all cards are matched
    if (showClassCounter === 16) areAllCardsFlipped = true;  
}

const winDisplay = document.querySelector(".final-result-display");
const winMessage = document.querySelector(".win-message");

function displayFinalScore(num) {  
    let winningMessage = document.createElement("p");
    winningMessage.innerHTML = " ";
    winningMessage.innerHTML = "<p>With " + counter + " moves and " + stars.children.length + " star(s). Can you do better?</p>";
    winMessage.append(winningMessage);
    winDisplay.classList.toggle("hidden");
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
}

function resetCounter() {
    const addStar = document.createElement("li");
    if (stars.children.length === 1) {
        addStar.innerHTML = "<i class='fa fa-star'></i><i class='fa fa-star'></i>";
        stars.appendChild(addStar);
    }
    else if (stars.children.length === 2) {
        addStar.innerHTML = "<i class='fa fa-star'></i>";
        stars.appendChild(addStar);
    }
    counter = 0;
    counterDisplay.innerText = counter + " Moves";
}

// function that lock two matched cards
function matchedCard(card) {
    card.classList.toggle("match");
}

function timerFunction(bool) {
    const timeFragment = document.createDocumentFragment();
    let timer = document.getElementById("timer");
    let timeHolder = document.querySelector(".time");

    timeHolder.innerText = "";
    let seconds = 0;
    let interval = setInterval(startCounting, 1000);

    while (timeHolder.firstChild) {
        timeHolder.removeChild(timeHolder.firstChild);
    }

    if (bool == true) startCounting();
    else myStopFunction();

    function startCounting() {
        seconds++;
        timeHolder.innerText = seconds + " sec elapsed";
        timer.appendChild(timeFragment);
    }

    function myStopFunction() {
        clearInterval(interval);
    }
}

let repeatButton = document.getElementById("restart");
let resetButton = document.getElementById("reset-button");

repeatButton.addEventListener("click", function (e) {
    timerFunction(false);
    resetCounter();
    resetCards();
    deck.addEventListener("click", function () {
        timerFunction(true);
    }, {once: true});
})

resetButton.addEventListener("click", function (e) {
    timerFunction(false);
    resetCounter();
    resetCards();
    winDisplay.classList.toggle("hidden");
    deck.addEventListener("click", function () {
        timerFunction(true);
    }, {once: true});
})