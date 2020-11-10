{ // for let, the whole code is closed in brackets

  $(".show-instructions").click(function(){$(".instructions").slideToggle(1000);});
  $(".close-instructions").click(function(){$(".instructions").slideUp(1000);});

let user_pattern = []; // I used "let" and put the whole code in blocks so that the players cannot console.log(auto_pattern)
let auto_pattern = [];
var level = 0;
$("body").keypress(function(press) {
  if (press.keyCode == 32 && user_pattern.length==level){
// I gave user_pattern.length==level because without this line you can increase your level each time you hit spcebar, ridiculous rght?
    start_auto_pattern();
  }
  else if(press.keyCode == 32){
    alert("Complete the pattern to select the length again.");
  }
  else if (auto_pattern.length==level && level!=0){ // so user_pattern starts only when auto_pattern is completed
    // if level!=0 condition is not included , we cannot press a button before we press space bar
    // because agt level=0 also auto_pattern.length=0 so the user_pattern will start recording and you will lose the game as auto_pattern.length is still =0
    playsound(press.key);
    topush(press.key);
    setTimeout(result(),10);
  }
  else{
    playsound(press.key);
    console.log("having fun huh??");
  }
});

$(".start-btn").click(function(){ // this is to start auto_pattern when mobile users click start
  if(user_pattern.length==level){
    start_auto_pattern();
  }
  else{
    alert("Complete the pattern to select the length again");
  }
});

function start_auto_pattern() {
  level = prompt("How long do you want the pattern to be?? (Natural Numbers only)");
    $("h1").text("Repeat the pattern to win!!");
    user_pattern=[];
    // auto_patterns already refreshed when the player lost or won
    var start = setInterval(function(){ // creating the pattern
        var rand = Math.floor(Math.random() * 4); // 4 buttons -> 0,1,2,3 positions
        var auto_play = $(".btn")[rand].id;
        playsound(auto_play);
        auto_pattern.push($(".btn")[rand].id);
      },1000);
      setTimeout(function(){ clearInterval(start);}, 1001*level); // stopping the auto pattern creation
  }

  // you may think that all these user_patern.push can be added in the playsound function but if we add them there,
  // they will be pushed to user_pattern when auto_pattern is played, because it calls the playsound function
  // so you win just after the auto_pattern is generated. RIDICULOUS!!!!

function topush(pressedkey){
  switch (pressedkey) {
    case "b":
      user_pattern.push( "blue");
      break;

    case "g":
      user_pattern.push( "green");
      break;

    case "d":
      user_pattern.push( "darkgrey");
      break;

    case "r":
      user_pattern.push( "red");
      break;

    default:
      console.log("Key not included");
  }
}

$(".btn").click(function() { //this is for pushing to user pattern when user clicks the button
  if (auto_pattern.length==level && level!=0){
    // if level!=0 condition is not included , we cannot press a button before we press space bar
    // because agt level=0 also auto_pattern.length=0 so the user_pattern will start recording and you will lose the game as auto_pattern.length is still =0
    playsound(this.id);
    user_pattern.push(this.id);
    result();
  }
  else{
    playsound(this.id);
  }
});


function result(){
 setTimeout(function()
 { // this setTimeout delays alert msg so that the audio of the btn pressed last is played
  if(full_pattern_check())
  {
    var correct = new Audio('sounds/correct.mp3');
    correct.play();
    setTimeout(function()
    { // due to this timeout func the audio can be played before the alert msg shows up
     alert("Congratullations!! You did it!!");
     location.reload();
     auto_pattern=[]; // refreshes the patterns when player wins
    },10);
  }
  if(each_step_check())
  {
    var wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    setTimeout(function()
    {
     alert("You can do this!! Jus kidding!!! Guess, you are a noob!! HaHaHaHa!!!");
     location.reload();
     auto_pattern=[]; // refreshes the patterns when a player loses
   }, 300);
  }
 }, 10);
}

function each_step_check(){
  var i=user_pattern.length;
  if(user_pattern[i-1]!=auto_pattern[i-1])
    return true;
}

function full_pattern_check(){
      if(JSON.stringify(user_pattern)==JSON.stringify(auto_pattern))
        return true;
}

function playsound(clickorpress) {
  $("." + clickorpress).addClass("pressed"); // I had to add classes b,g,d,r in html file for this step
  switch (clickorpress) {
    case "blue":
    case "b":
      var b = new Audio("sounds/blue.mp3");
      b.play();
      break;

    case "green":
    case "g":
      var g = new Audio("sounds/green.mp3");
      g.play();
      break;

    case "darkgrey":
    case "d":
      var d = new Audio('sounds/darkgrey.mp3');
      d.play();
      break;

    case "red":
    case "r":
      var r = new Audio('sounds/red.mp3');
      r.play();
      break;

    default:
      console.log("Key not included");
  }
  setTimeout(function() { $(".btn").removeClass("pressed"); }, 300);
}

} // for let, the whole code is closed in brackets
