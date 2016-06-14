//!function(){
function Game() {
  this.winningCombo = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],
  this.movesCounting = 0,
  this.movePlayer1 = true
};

Game.prototype.play = function(move,player) {
//  this.moves.push(move);
  for (i = 0; i < game.winningCombo.length; i++) {
    // if the winningCombo has that value
    if (game.winningCombo[i].includes(move+1)) {
      // increase the counting score accordingly
      player.counting[i]++;
    }
  }
  game.movePlayer1 = !game.movePlayer1;
  game.movesCounting++;
};

// function to render all the element accordingly
Game.prototype.renderInElement = function(move) {
  $(".players").removeClass("active");
      if (this.movePlayer1) {
        buttons.eq(move).addClass("box-filled-2");           // board body
        $("#player1").addClass("active", 500);               // player header
        buttons.eq(move).css("background-image","url('img/x.svg')");
      } else {
        buttons.eq(move).addClass("box-filled-1");           // board body
        $("#player2").addClass("active", 500);               // player header
        buttons.eq(move).css("background-image","url('img/o.svg')");
      }
};

Game.prototype.setHoverImage = function(n) {
    if (this.movePlayer1) {
      buttons.eq(n).css("background-image","url('img/o.svg')");
    } else {
      buttons.eq(n).css("background-image","url('img/x.svg')");
    }
  };

Game.prototype.setHoverImageOut = function(n) {
    buttons.eq(n).css("background-image","");
  };

Game.prototype.isWinning = function() {
  if (Math.max(...player1.counting) === 3) {
    $("div header p.message").append("Winner!");
    $("#finish").addClass("screen-win-one").show();
  } else if (Math.max(...player2.counting) === 3) {
    $("div header p.message").append("Winner!");
    $("#finish").addClass("screen-win-two").show();
  } else if (game.movesCounting === 9) {
    $("div header p.message").append("It's a tie!");
    $("#finish").addClass("screen-win-draw").show();
  }
  console.log("5 isWinning triggered");
};

Game.prototype.buttonClick = function(move) {
    if (this.movePlayer1 === true) {
        this.play(move,player1);
      } else {
        this.play(move,player2);
      }
      this.renderInElement(move);
      this.isWinning();
};

Game.prototype.disableClick = function(move) {
    buttons.eq(move).off("click");
    buttons.eq(move).off('mouseenter mouseleave');
};


Game.prototype.reset = function() {
  player1.counting = [0,0,0,0,0,0,0,0];
  player2.counting = [0,0,0,0,0,0,0,0];
  game.movesCounting = 0;
  game.movePlayer1 = true;
  buttons.removeClass("box-filled-1");
  buttons.removeClass("box-filled-2");
  $("#finish").removeClass("screen-win-one");
  $("#finish").removeClass("screen-win-two");
  $(".players").removeClass("active");
  $("#player1").addClass("active", 500);
  buttons.css("background-image","");
  $("div header p.message").empty();
};
