$("#board").hide();
$("#finish").hide();
var buttons = $(".boxes").children();

function buttonsReset() {
  // !!! This is a very important step !!!
  // After a game is finished, all the buttons need to be diabled, otherwise it will be passed into the next game.
  buttons.off("click");
  buttons.off('mouseenter mouseleave');
  buttons.eq(0).click(function(){game.buttonClick(0);game.disableClick(0)});
  buttons.eq(0).hover(function(){game.setHoverImage(0)},function(){game.setHoverImageOut(0)});
  buttons.eq(1).click(function(){game.buttonClick(1);game.disableClick(1)});
  buttons.eq(1).hover(function(){game.setHoverImage(1)},function(){game.setHoverImageOut(1)});
  buttons.eq(2).click(function(){game.buttonClick(2);game.disableClick(2)});
  buttons.eq(2).hover(function(){game.setHoverImage(2)},function(){game.setHoverImageOut(2)});
  buttons.eq(3).click(function(){game.buttonClick(3);game.disableClick(3)});
  buttons.eq(3).hover(function(){game.setHoverImage(3)},function(){game.setHoverImageOut(3)});
  buttons.eq(4).click(function(){game.buttonClick(4);game.disableClick(4)});
  buttons.eq(4).hover(function(){game.setHoverImage(4)},function(){game.setHoverImageOut(4)});
  buttons.eq(5).click(function(){game.buttonClick(5);game.disableClick(5)});
  buttons.eq(5).hover(function(){game.setHoverImage(5)},function(){game.setHoverImageOut(5)});
  buttons.eq(6).click(function(){game.buttonClick(6);game.disableClick(6)});
  buttons.eq(6).hover(function(){game.setHoverImage(6)},function(){game.setHoverImageOut(6)});
  buttons.eq(7).click(function(){game.buttonClick(7);game.disableClick(7)});
  buttons.eq(7).hover(function(){game.setHoverImage(7)},function(){game.setHoverImageOut(7)});
  buttons.eq(8).click(function(){game.buttonClick(8);game.disableClick(8)});
  buttons.eq(8).hover(function(){game.setHoverImage(8)},function(){game.setHoverImageOut(8)});

  // for (n = 0; n < buttons.length; n++) {
  // // bind the click event with
  // //  1. function to record the progress of the game: createClickButtonMove
  // //  2. function to set active colors: setActiveColor
  //   buttons.eq(n).click(function(n){
  //     game.buttonClick(n);
  //   //  game.disableClick(n)
  //   });
  // }
};

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
