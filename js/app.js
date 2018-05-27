/*
 * Create a list that holds all of your cards
 */
const listOfCards = document.getElementsByClassName('card');

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
 const deck = document.querySelector('.deck');

 // add an eventListener to the deck
deck.addEventListener('click', function(event) {

    // checks if the sibling of deck was clicked (cards) or else do nothing
    if (event.target.nodeName === 'LI') {
        // function call 
        displayCardSymbol(event.target);
        addToOpenCards(event.target);
    }

})

function displayCardSymbol(card) {
    card.classList.toggle('show');
}

// set counter to zero
let counter = 0;
const counterDisplay = document.querySelector(".moves");
counterDisplay.innerText = counter;

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
    if (openCards.length == 2){
        // change counter
        incrementCounter();

        card1 = openCards[0];
        card2 = openCards[1];

        // check if the card classes match, if they do call function that lock cards
        if (card1.firstElementChild.classList[1] === card2.firstElementChild.classList[1]) {
            matchedCards(card1, card2);
            openCards.splice(0, 2);
        }

        // if cards don't match, reset the styles and remove the list for next try
        else if (card1.firstElementChild.classList[1] !== card2.firstElementChild.classList[1]) {
            console.log("don't match!");
            // delay turning cards if they don't match and return to "not-show" state
            setTimeout(function delayReset() {
                displayCardSymbol(card1);
                displayCardSymbol(card2);
                openCards.splice(0, 2);

            }, 800);
        }

        // TODO: implementing card game for them all cards match
        isGameOver();  
        if (areAllCardsFlipped) console.log("finished game!");
    }

}

// function that lock two matched cards
function matchedCards(card1, card2) {
    console.log('Matched two cards!');
    card1.classList.toggle('match');
    card2.classList.toggle('match');
}

function incrementCounter(){
    counter++;
    counterDisplay.innerText = counter;
}

// checks if all cards are flipped meaning game is over
function isGameOver(){
    // counter 
    let showClassCounter = 0;

    // iterate over listOfCards to check if all cards are matched (should add up to 16)
    for (const card of listOfCards){
        if (card.classList.contains('match')) {
            console.log(card.classList.contains('match'));
            showClassCounter++;
        }
    }

    // set areAllCardsFlipped to true if 16 instances are found
    // meaning all cards are matched
    if (showClassCounter === 16) areAllCardsFlipped = true;  
}