// This file is currently not working
//!function(){
$("#board").hide();
$("#finish").hide();
var buttons = $(".boxes").children();

function Game(){
  this.winningCombo = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],
  this.movesCounting = 0,
  this.movePlayer1 = true
}

Game.prototype.play = function(move,player) {
//  this.moves.push(move);
  for (i = 0; i < game.winningCombo.length; i++) {
    // if the winningCombo has that value
    if (game.winningCombo[i].includes(move)) {
      // increase the counting score accordingly
      player.counting[i]++;
    }
  }
  game.movePlayer1 = !game.movePlayer1;
  game.movesCounting++;
}

// function to render all the element accordingly
Game.prototype.renderInElement = function(move) {
  $(".players").removeClass("active");
      if (this.movePlayer1 === true) {
        buttons.eq(move).addClass("box-filled-2");           // board body
        $("#player1").addClass("active", 500);               // player header
        buttons.eq(move).css("background-image","url('img/o.svg')");
      } else {
        buttons.eq(move).addClass("box-filled-1");           // board body
        $("#player2").addClass("active", 500);               // player header
        buttons.eq(move).css("background-image","url('img/x.svg')");
      }
}

Game.prototype.setHoverImage = function(n) {
    if (this.movePlayer1 === true) {
      buttons.eq(n).css("background-image","url('img/o.svg')");
    } else {
      buttons.eq(n).css("background-image","url('img/x.svg')");
    }
  }

Game.prototype.setHoverImageOut = function(n) {
    buttons.eq(n).css("background-image","");
  }

// evaluate if someones wins the game or it's tie
Game.prototype.isWinning = function() {
  if (player1.maxCount === 3) {
    $("div header p.message").append("Winner!");
    $("#finish").addClass("screen-win-one").show();
  } else if (player2.maxCount === 3) {
    $("div header p.message").append("Winner!");
    $("#finish").addClass("screen-win-two").show();
  } else if (game.movesCounting === 9) {
    $("div header p.message").append("It's a tie!");
    $("#finish").addClass("screen-win-draw").show();
  }
}

Game.prototype.buttonClick = function(move) {
  if (this.movePlayer1 === true) {
    this.play(move,player1);
  } else {
    this.play(move,player2);
  }
  this.renderInElement(move);
  this.isWinning();
  console.log(game.movesCounting);
}

// Disable click after one click (questions!!!!)
Game.prototype.disableClick = function(move) {
    buttons.eq(move).off("click");
    buttons.eq(move).off('mouseenter mouseleave');
}


Game.prototype.reset = function() {
  player1.counting = [0,0,0,0,0,0,0,0];
  player2.counting = [0,0,0,0,0,0,0,0];
  game.movesCounting = 0;
  game.movePlayer1 = true
}

function buttonsReset() {
  // !!! This is a very important step !!!
  // After a game is finished, all the buttons need to be diabled, otherwise it will be passed into the next game.
  buttons.off("click");
  buttons.off('mouseenter mouseleave');
  for (n = 0; n < buttons.length; n++) {
  // bind the click event with
  //  1. function to record the progress of the game: createClickButtonMove
  //  2. function to set active colors: setActiveColor
    buttons.eq(n).click(game.buttonClick(n));
    buttons.eq(n).click(game.disableClick(n));
  // bind the hover event
    buttons.eq(n).hover(
      game.setHoverImage(n),game.setHoverImageOut(n)
    );
  }
}


function Player(name) {
  this.name = name;
  this.counting = [0,0,0,0,0,0,0,0];
  this.maxCount = Math.max(...this.counting)
//  this.moves = []
}

var game = new Game();
var player1 = new Player(player1);
var player2 = new Player(player2);

$(".button").click(function(){
  $("#finish").hide();
  $("#start").hide();
  $("#board").show();
  game.reset();
  buttonsReset();
});

//
// $("#board").hide();
// $("#finish").hide();
// var buttons = $(".boxes").children();
//   // assign values from 1 to 9 to all the 9 buttons respectively
//   // Set an array of 9 arrays to define all the winning combinations
// var winningCombo = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
// var countingO = [0,0,0,0,0,0,0,0];
// var countingX = [0,0,0,0,0,0,0,0];
//     // counting array for both players counting their scores in each of the winningCombo.
//       // for example, the upper left button represents '1', when player1 made that move,
//       // '1' matches [1,2,3],[1,4,7],[1,5,9] in the winningCombo
//         // therefore, player1's counting become [1,0,0,1,0,0,1,0]
//           // when the maxium number in the array reaches 3, the player wins the game.
//
// var movePlayer1;      // This is a boolean that determines who moves
// var moveCount;        // This is to count the move, so we know when it's a tie
//
// // Reset the game to the orginal
// function gameReset() {
//   // everything to inital state
//   countingO = [0,0,0,0,0,0,0,0];
//   countingX = [0,0,0,0,0,0,0,0];
//   movePlayer1 = true;
//   moveCount = 0;
//   buttons.removeClass("box-filled-1");
//   buttons.removeClass("box-filled-2");
//   $("#finish").removeClass("screen-win-one");
//   $("#finish").removeClass("screen-win-two");
//   $(".players").removeClass("active");
//   $("#player1").addClass("active", 500);
//   buttons.css("background-image","");
//   $("div header p.message").empty();
//   // Bind each button on the board with event listeners;
// }
//
// function buttonsReset() {
//   // !!! This is a very important step !!!
//   // After a game is finished, all the buttons need to be diabled, otherwise it will be passed into the next game.
//   buttons.off("click");
//   buttons.off('mouseenter mouseleave');
//   for (n = 0; n < buttons.length; n++) {
//   // bind the click event with
//   //  1. function to record the progress of the game: createClickButtonMove
//   //  2. function to set active colors: setActiveColor
//     buttons.eq(n).click(createClickButtonMove(n)).click(setActiveColor(n));
//     buttons.eq(n).click(disableClick(n));
//   // bind the hover event
//     buttons.eq(n).hover(
//       setHoverImage(n),setHoverImageOut(n)
//     );
//   }
// }
//
//
// // Disable click after one click (questions!!!!)
// function disableClick(n) {
//   return function(){
//     buttons.eq(n).off("click");
//     buttons.eq(n).off('mouseenter mouseleave');
//   }
// }
//
// Set hover image, depending on the state of the player


//
// // Set active color for the board and the players
// function setActiveColor(n) {
//   return function() {
//     $(".players").removeClass("active");
//     if (movePlayer1 === true) {
//       buttons.eq(n).addClass("box-filled-2");           // board body
//       $("#player1").addClass("active", 500);            // player header
//     } else {
//       buttons.eq(n).addClass("box-filled-1");           // board body
//       $("#player2").addClass("active", 500);            // player header
//     }
//   //  console.log(countingO,countingX);
//   }
// }
//
// // When player1 is playing:
// // here "n+1" represent the value associated with the button (1-9)
// function playMove(countingO, n) {
//   // for a spedific button clicked, cycle the value through the winningCombo
//   for (i = 0; i < winningCombo.length; i++) {
//     // if the winningCombo has that value
//     if (winningCombo[i].includes(n+1)) {
//       // increase the counting score accordingly
//       countingO[i]++;
//     }
//   }
//   movePlayer1 = !movePlayer1;
// }
//
// function createClickButtonMove(n) {
//   return function clickButton(){
//     //  When Player1 is playing
//     moveCount++;
//     if (movePlayer1 === true) {
//       playMove(countingO, n);
//     } else {
//       playMove(countingX, n);
//     }
//     // 3 game finish conditions:
//     // player1 wins
//     if (Math.max(...countingO) === 3) {
//       $("div header p.message").append("Winner!");
//       $("#finish").addClass("screen-win-one").show();
//     }
//     // Player2 wins
//     else if (Math.max(...countingX) === 3) {
//       $("div header p.message").append("Winner!");
//       $("#finish").addClass("screen-win-two").show();
//     }
//     // Ties
//     else if (moveCount === 9)
//     {
//       $("div header p.message").append("It's a tie!");
//       $("#finish").addClass("screen-win-draw").show();
//     }
//   }
// };
//
// // Reset the game after each time the button is clicked
// $(".button").click(function(){
//   $("#finish").hide();
//   $("#start").hide();
//   $("#board").show();
//   gameReset();
//   buttonsReset();
// });
//
//  }();
