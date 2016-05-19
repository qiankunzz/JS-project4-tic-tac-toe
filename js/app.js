!function(){
$("#board").hide();
$("#finish").hide();
var buttons = $(".boxes").children();
  // assign values from 1 to 9 to all the 9 buttons respectively
  // Set an array of 9 arrays to define all the winning combinations
var winningCombo = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
  // // counting array for both players counting their scores in each of the winningCombo.
  // // if only one score reaches 3, then the player wins the game.
var countingO = [];
var countingX = [];
var movePlayer1 = true;
var moveCount = 0;

// Reset the game to the orginal
function gameReset() {
  // everything to inital state
  countingO = [0,0,0,0,0,0,0,0];
  countingX = [0,0,0,0,0,0,0,0];
  movePlayer1 = true;
  moveCount = 0;
  buttons.removeClass("box-filled-1");
  buttons.removeClass("box-filled-2");
  $("#finish").removeClass("screen-win-one");
  $("#finish").removeClass("screen-win-two");
  $(".players").removeClass("active");
  $("#player1").addClass("active", 500);
  buttons.css("background-image","");
  $("div header p.message").empty();
  // Bind each button on the board with event listeners;
}

function buttonsReset() {
  for (n = 0; n < buttons.length; n++) {
  // bind the click event with
  //  1. function to record the progress of the game: createClickButtonMove
  //  2. function to set active colors: setActiveColor
    buttons.eq(n).click(createClickButtonMove(n)).click(setActiveColor(n)).click(disableClick(n));
  // bind the hover event
    buttons.eq(n).hover(
      setHoverImage(n),setHoverImageOut(n)
    );
  }
}


// Disable click after one click (questions!!!!)
function disableClick(n) {
  return function(){
    buttons.eq(n).off("click");
    buttons.eq(n).off('mouseenter mouseleave');
  }
}

// Set hover image, depending on the state of the player
function setHoverImage(n) {
  return function(){
    if (movePlayer1 === true) {
      buttons.eq(n).css("background-image","url('img/o.svg')");
    } else {
      buttons.eq(n).css("background-image","url('img/x.svg')");
    }
  }
}

function setHoverImageOut(n) {
  return function(){
    buttons.eq(n).css("background-image","");
  }
}

// Set active color for the board and the players
function setActiveColor(n) {
  return function() {
    $(".players").removeClass("active");
    if (movePlayer1 === true) {
      buttons.eq(n).addClass("box-filled-2");           // board body
      $("#player1").addClass("active", 500);            // player header
    } else {
      buttons.eq(n).addClass("box-filled-1");           // board body
      $("#player2").addClass("active", 500);            // player header
    }
  //  console.log(countingO,countingX);
  }
}

// here "n+1" represent the value associated with the button (1-9)
// When the button is clicked, the value is passed to the function to record the score in the counting array
function createClickButtonMove(n) {
  return function clickButton(){
    //  When Player1 is playing
    moveCount++;
    if (movePlayer1 === true) {
      for (i = 0; i < winningCombo.length; i++) {
        if (winningCombo[i].includes(n+1)) {
          countingO[i]++;
        }
      }
      movePlayer1 = false;
  //    console.log("Player 1 " + Math.max(...winningCondition.countingO));
      if (Math.max(...countingO) === 3) {
        $("div header p.message").append("Winner!");
        $("#finish").addClass("screen-win-one").show();
      }
    } else
    //  When Player2 is playing (the code here is not DRY enough)
    {
      for (i = 0; i < winningCombo.length; i++) {
        if (winningCombo[i].includes(n+1)) {
          countingX[i]++;
        }
      }
      movePlayer1 = true;
    //  console.log("Player 2 " + Math.max(...winningCondition.countingX));
      if (Math.max(...countingX) === 3) {
        $("div header p.message").append("Winner!");
        $("#finish").addClass("screen-win-two").show();
      }
    }
    // Show tie screen
    if (moveCount === 9)
    {
      $("div header p.message").append("It's a tie!");
      $("#finish").addClass("screen-win-draw").show();
    }
    console.log(movePlayer1);
  }
};


// Reset the game after each time the button is clicked
$(".button").click(function(){
  $("#finish").hide();
  $("#start").hide();
  $("#board").show();
  gameReset();
  buttonsReset()
});

}();
