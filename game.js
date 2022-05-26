var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=false;
var hintLeft=5;
var currentIndex=0;

$(document).keypress(function()
{
  if(!start)
  {
    $("#level-title").text("Level "+level);
    $(".hint").text("Hint Left "+hintLeft);
    nextSequnce();
    start=true;
    currentIndex=0;
  }
}
);

$(".hint").click(function()
{
  if(start)
  {
    if(hintLeft>0)
    {
      var currentcolor=gamePattern[currentIndex];
      $(".hint").css("color",currentcolor);
      setTimeout(function() {
        hintLeft--;
        $(".hint").css("color","black");
        $(".hint").text("Hint Left"+hintLeft);
      },200);
    }
    else
    {
      $(".hint").css("opacity","0.5");
    }
  }
});

$(".btn").click(function()
{
  currentIndex++;
  var userChoosenColour=$(this).attr("id");
  userClickedPattern.push(userChoosenColour);
  playSound(userChoosenColour);
  animateButton(userChoosenColour);
  checkKey(userClickedPattern.length-1);
});

function checkKey(currentPoistion)
{
  if(userClickedPattern[currentPoistion]===gamePattern[currentPoistion])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function(){nextSequnce();},1000);
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! your score is "+level+", Press Any Key to Restart");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    startOver();
  }
}

function nextSequnce()
{
  userClickedPattern=[];
  currentIndex=0;
  level++;
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level "+level);
}

function startOver()
{
  start=false;
  gamePattern=[];
  level=0;
  hintLeft=5;
  currentIndex=0;
  $(".hint").text("Hint "+hintLeft);
}
function animateButton(currentButton)
{
  //console.log(currentButton);
  $("#"+currentButton).addClass("pressed");
  setTimeout(function() {
    $("#"+currentButton).removeClass("pressed");},100);
}

function playSound(colour)
{
  var audio = new Audio('sounds/'+colour+'.mp3');
  audio.play();
}
