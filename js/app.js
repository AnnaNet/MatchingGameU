/*
 * Create a list that holds all of your cards
 */
/*const elements = document.querySelectorAll('.card');*/

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let classes = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
let cardOpen = 0, i = 0, x = 0; moves = 0;
let timeSeconds = 0;
let itsOpenNow = [];
let timer = undefined;
let sum = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;


function alignment() {
  $('.card').each(function() {
    $(this).removeClass();
    $(this).addClass('card');
  });

  shuffle (classes);
  let i = 0;
  let cards = $('.card').children();
  cards.each(function() {
    $(this).removeClass();
    $(this).addClass(classes[i++]);
  });

  seconds = 0;
  minutes = 0;
  hours = 0;
  i = 0;
  itsOpenNow = [];
  x = 0;
  cardOpen = 0;
  moves = -1;
  calc();
  sum = 0;
  timeSeconds = 0;
  $('.time').text("00.00.00");
  clearInterval(timer);
  timer = undefined;
  $('.level').each(function() {
      $(this).removeClass();
      $(this).addClass('level fa fa-star');
  });
}

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

function reverse(element) {
  if ($(element).hasClass('match')) {
    $(element).removeClass('match');
  } else {
    $(element).addClass('match');
  }
}

function opened(element) {
  if ($(element).hasClass('open show') || $(element).hasClass('match')) {
    return (false);
  } else {
      return (true);
    }
  }

function calc() {
  moves++;
  $('.moves').text(moves);
  if (moves == 30) {
    $('.level:first').removeClass('fa-star');
  } else if (moves == 50) {
    $('.level:eq(1)').removeClass('fa-star');
  }
}

function startTimer() {
  if (timer === undefined) {
    timer = setInterval(timeTick, 1000);
  }
}

function timeTick() {
  let formatHours = '';
  let formatMinutes = '';
  let formatSeconds = '';

  timeSeconds = timeSeconds + 1;
  console.log (timeSeconds);

  if (timeSeconds > 59) {
    seconds = timeSeconds % 60;
    console.log (seconds);
    minutes = (timeSeconds - seconds) / 60;
    console.log (minutes);
    if (minutes > 59) {
      minutes = minutes % 60;
      hours = (timeSeconds - minutes * 60) / 60;
    }
  } else {
    seconds = timeSeconds;
  }
  if (hours < 10) {
    formatHours = 0;
  }
  if (minutes < 10) {
    formatMinutes = 0;
  }
  if (seconds < 10) {
    formatSeconds = 0;
  }
  $('.time').text(`${formatHours}${hours}:${formatMinutes}${minutes}:${formatSeconds}${seconds}`);
}

function stopTimer() {
  sum++;
  if (sum == 8) {
    clearInterval(timer);
    timer = undefined;
  }
}

function closeCards() {
  let sum = 0;

  $('.card').each(function() {
    if ($(this).hasClass('match')) {
      sum++;
    }
  });
  if (sum == 2) {
    $('.card').each(function() {
      $(this).removeClass('match');
    });
  }

  itsOpenNow = [];
  x = 0;
}

function isConsilience(element) {
  if (cardOpen == 0) {
    cardOpen = $(element);
    itsOpenNow[x++] = $(element);
  }
  else {
    let signOpened = $(cardOpen).children();
    let signNow = $(element).children();

    if ($(signOpened).attr('class') == $(signNow).attr('class')) {

      $(cardOpen).removeClass('match');
      $(element).removeClass('match');

      $(cardOpen).addClass('open show');
      $(element).addClass('open show');

      stopTimer();

      signOpened = 0;
      cardOpen = 0;
/*      isOpenNow = [];*/
    }
    else {
      signOpened = 0;
      cardOpen = 0;

    }
  }

}

alignment();

$('.card').click(function() {
  startTimer();

  if (opened(this)) {
    calc();
    closeCards();
    reverse(this);
    isConsilience(this);
  }
});

$('.restart').click(function() {
  alignment();
});


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
