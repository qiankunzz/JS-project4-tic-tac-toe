function Player(name) {
  this.name = name;
  this.counting = [0,0,0,0,0,0,0,0];
};

function computer() {
  var randomNumber = Math.floor(game.available.length * Math.random());
  var randomMove = game.available[randomNumber];
  var winningPossible;
  var winningMove = [];
  for (i = 0; i < player2.counting.length; i++) {
    if (player2.counting[i] == 2) {
      winningPossible = game.winningCombo[i]
      for (j = 0; j < 3; j++) {
        if (game.available.includes(winningPossible[j])) {
          winningMove.push(winningPossible[j]);
        }
      }
    }
  }
  if (Math.max(...player1.counting) !== 3) {
  game.buttonClick(randomMove);
  game.disableClick(randomMove);
  console.log(game.available);
  console.log(winningMove);
  console.log(winningPossible);

  }
}
