/*
 * Create a list that holds all of your cards
 */
const elements = document.querySelectorAll('.card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
  shuffle(elements);
  restart.style.backgroundColor = 'red';
  console.log ("restart");
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    console.log (randomIndex);
  }

  return array;
}

/*let mark = 0;*/

function reverse(element) {
  if ($(element).hasClass('match')) {
    $(element).removeClass('match');
  }
  else {
    $(element).addClass('match');
  }
}

for (const element of elements) {
  element.addEventListener('click', function() {
    console.log ("Click!");
/*    let color = $(element).css('background');*/
    reverse(element);
  });
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
