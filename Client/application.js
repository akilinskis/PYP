$(document).ready(function(){
  $('#init').hide();
  var horsesGame = new Game({name: "Test Game"});
  var horsesView = new GameView({model: horsesGame});
  horsesView.render();
  horsesGame.save();
});
