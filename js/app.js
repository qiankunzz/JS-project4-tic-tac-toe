$("#board").hide();
$("#finish").hide();
var buttons = $(".boxes").children();
var winningCondition = {
  // assign values from 1 to 9 to all the 9 buttons respectively
  // Set an array of 9 arrays to define all the winning combinations
  winningCombo: [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],
  // counting array for both players counting their scores in each of the winningCombo.
  // if only one score reaches 3, then the player wins the game.
  countingO: [0,0,0,0,0,0,0,0],
  countingX: [0,0,0,0,0,0,0,0],
  MovePlayerO: true,
}

// Reset the game to the orginal
function gameReset() {
  winningCondition.countingO = [0,0,0,0,0,0,0,0];
  winningCondition.countingX = [0,0,0,0,0,0,0,0];
  winningCondition.MovePlayerO = true;
  buttons.removeClass("box-filled-1");
  buttons.removeClass("box-filled-2");
  $("#finish").removeClass("screen-win-one");
  $("#finish").removeClass("screen-win-two");
  $(".players").removeClass("active");
  $("#player1").addClass("active", 500);
}


// Bind each button on the board with event listeners;
for (n = 0; n < buttons.length; n++) {
  buttons.eq(n).click(setActiveColor(n)).click(createClickButtonMove(n));
//  buttons.eq(n).click(createClickButtonMove(n));
  buttons.eq(n).hover(
    setHoverImage(n),setHoverImageOut(n)
  );
//  buttons.eq(n).click(disableClick(n));
}

// for (j = 0; j < buttons.length; j++) {
//   buttons.eq(j).click(function(){
//     buttons.eq(n).off("click",this,createClickButtonMove);
//     buttons.eq(n).off("click",this,setActiveColor);
//     buttons.eq(n).off("hover",buttons.eq(n),setHoverImage);
//   });
// }

// Disable click after one click
function disableClick(n) {
//  return function(){
    console.log(n);
    var
    buttons.eq(n).off("click",buttons.eq(n),createClickButtonMove);
    buttons.eq(n).unbind("click",setActiveColor);
    buttons.eq(n).unbind("hover",setHoverImage);
//  }
}


// Set hover image, depending on the state of the player
function setHoverImage(n) {
  return function(){
    if (winningCondition.MovePlayerO === true) {
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
    if (winningCondition.MovePlayerO === true) {
      buttons.eq(n).addClass("box-filled-1");           // board body
      $("#player2").addClass("active", 500);            // player header
    } else {
      buttons.eq(n).addClass("box-filled-2");           // board body
      $("#player1").addClass("active", 500);            // player header
    }
    buttons.eq(n).unbind("click",setActiveColor);
  }
}

// here "n+1" represent the value associated with the button (1-9)
// When the button is clicked, the value is passed to the function to record the score in the counting array
function createClickButtonMove(n) {
  return function clickButton(){
    //  When Player1 is playing
    if (winningCondition.MovePlayerO === true) {
      for (i = 0; i < winningCondition.winningCombo.length; i++) {
        if (winningCondition.winningCombo[i].includes(n+1)) {
          winningCondition.countingO[i]++;
        }
      }
      winningCondition.MovePlayerO = false;
      console.log("Player O " + Math.max(...winningCondition.countingO));
      if (Math.max(...winningCondition.countingO) === 3) {
        gameReset();
        $("div header p.message").append("Winner!");
        $("#finish").addClass("screen-win-one").show();
      }
    }
    else
    //  When Player2 is playing (the code here is not DRY enough)
    {
      for (i = 0; i < winningCondition.winningCombo.length; i++) {
        if (winningCondition.winningCombo[i].includes(n+1)) {
          winningCondition.countingX[i]++;
        }
      }
      winningCondition.MovePlayerO = true;
      console.log("Player X " + Math.max(...winningCondition.countingX));
      if (Math.max(...winningCondition.countingX) === 3) {
        gameReset();
        $("div header p.message").append("Winner!");
        $("#finish").addClass("screen-win-two").show();
      }
    }
    // Test
    buttons.eq(n).off("click",buttons.eq(n),createClickButtonMove);
  }
}

// Bind hover events



// Finish Screen Property
$(".button").click(function(){
  $("#finish").hide();
  $("#start").hide();
  $("#board").show();
});




// // first button --> 1
// buttons.eq(0).click(function(){
//   for (i = 0; i < winningCondition.winningCombo.length; i++) {
//     if (winningCondition.winningCombo[i].includes(1)) {
//       winningCondition.counting[i]++;
//     }
//   }
//   console.log(winningCondition.counting);
// });
//
// // secound button --> 2
// buttons.eq(1).click(function(){
//   for (i = 0; i < winningCondition.winningCombo.length; i++) {
//     if (winningCondition.winningCombo[i].includes(2)) {
//       winningCondition.counting[i]++;
//     }
//   }
//   console.log(winningCondition.counting);
// });




//
// for (i = 0; i < buttons.length; i++) {
//   buttons.eq(i).click(function(){
//     clickButton(i+1);
//   //  countMaxLine(lineCounting);
//     console.log(lineCounting);
//   });
// }
//
// function clickButton(n){
// // When the button is clicked, count the according winning combo
//   for (x = 0; x < winningCombo.length; x++) {
//     if (winningCombo[x].includes(n)) {
//       lineCounting[x] += 1;
//     }
//   }
//   //console.log(lineCounting);
//   // Test if a line of 3 is already formed
//
//   for (i = 0; i < lineCounting.length; i++) {
//     if (lineCounting[i] === 3) {
//       console.log("You Win!");
//       lineCounting = [0,0,0,0,0,0,0,0];
//       var gameReset = true;
//    }
//   }
//
//   //if (gameReset === true) {console.log(gameReset);}
//   return lineCounting;
// }
//
// function countMaxLine(lineCounting) {
//   var maxCount = Math.max(...lineCounting);
//   console.log(maxCount);
// }
//
//
// // clickButton(2);
// // clickButton(5);
//
// // clickButton(9);
// //
// // function ifWinGame(lineCounting) {
// // //  var gameReset;
// //   for (i = 0; i < lineCounting.length; i++) {
// //     if (lineCounting[i] === 3) {
// //       console.log("You Win!");
// //       lineCounting = [0,0,0,0,0,0,0,0];
// //     var gameReset = true;
// //     }
// //   }
// // //  console.log(gameReset);
// // //  return gameReset;
// // }
//
// // Define winning situations
//
//   // Win in row
//     // 1,2,3
//     // 4,5,6
//     // 7,8,9
//   // Win in column
//     // 1,4,7
//     // 2,5,8
//     // 3,6,9
//   // Win in diagonal
//     // 1,5,9
//     // 3,5,7
