/*TODO: add variables and arrays*/
let classes = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb"
];
let cardOpen = 0;
let  i = 0;
let  x = 0;
let moves = 0;
let timeSeconds = 0;
let itsOpenNow = [];
let timer = undefined;
let sum = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let levelStars = 3;


/*@description Prepares to new game*/
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

  levelStars = 3;
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


/*@description Shuffle function from http://stackoverflow.com/a/2450976*/
/*@param (array) signs of cards*/
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


/*@description Inverts card*/
/*@param (DOM-element) card*/
function reverse(element) {
  if ($(element).hasClass('match')) {
    $(element).removeClass('match');
  } else {
    $(element).addClass('match');
  }
}


/*@description Opens card*/
/*@param (DOM-element) card*/
function opened(element) {
  if ($(element).hasClass('open cardShow') || $(element).hasClass('match')) {
    return (false);
  } else {
    return (true);
  }
}


/*@description Counts moves, delete stars and counts it*/
function calc() {
  moves++;
  $('.moves').text(moves);
  if (moves == 30) {
    $('.level:first').removeClass('fa-star');
    levelStars--;
  } else if (moves == 50) {
    $('.level:eq(1)').removeClass('fa-star');
    levelStars--;
  }
}


/*@description Set Interval (1 second)*/
function startTimer() {
  if (timer === undefined) {
    timer = setInterval(timeTick, 1000);
  }
}


/*@description Counts, formats and show time*/
function timeTick() {
  let formatHours = '';
  let formatMinutes = '';
  let formatSeconds = '';

  timeSeconds = timeSeconds + 1;

  if (timeSeconds > 59) {
    seconds = timeSeconds % 60;
    minutes = (timeSeconds - seconds) / 60;
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


/*@description Prepares data for modal window (when will win)*/
function modalContext(){
  let starsWon = '';
  const movesWon = moves;
  const timeWon = $(".time").text();

  switch (levelStars) {
    case 3: starsWon = "★★★";
      break;
    case 2: starsWon = "★★";
      break;
    case 1: starsWon = "★";
  }

  $('.win-time').text(`Time of game: ${timeWon}`);
  $('.win-moves').text(`Moves: ${movesWon}`);
  $('.win-stars').text(`Yours STARS: ${starsWon}`);

  $("#Wow").modal('show');
}


/*@description Stops timer*/
function stopTimer() {
  sum++;
  if (sum == 8) {
    clearInterval(timer);
    timer = undefined;
    modalContext();
  }
}


/*@description Closes different cards*/
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


/*@description Compares cards and does states "checked"*/
/*@param (DOM-element) card*/
function isConsilience(element) {
  if (cardOpen == 0) {
    cardOpen = $(element);
    itsOpenNow[x++] = $(element);
  } else {
    let signOpened = $(cardOpen).children();
    let signNow = $(element).children();

    if ($(signOpened).attr('class') == $(signNow).attr('class')) {

      $(cardOpen).removeClass('match');
      $(element).removeClass('match');

      $(cardOpen).addClass('open cardShow');
      $(element).addClass('open cardShow');

      stopTimer();

      signOpened = 0;
      cardOpen = 0;
    } else {
      signOpened = 0;
      cardOpen = 0;
    }
  }
}


/*TODO: prepares to new game*/
alignment();


/*TODO: when click on card, checks it*/
$('.card').click(function() {
  startTimer();

  if (opened(this)) {
    calc();
    closeCards();
    reverse(this);
    isConsilience(this);
  }
});


/*TODO: when click on sign "restart", prepares to new game*/
$('.restart').click(function() {
  alignment();
});


/*TODO: when click on button "play" in scores window, prepares to new game*/
$('.play').click(function() {
  alignment();
});


/*TODO: when press 'n', restart game*/
$(document).bind('keydown', 'n', function() {
  alignment();
});
