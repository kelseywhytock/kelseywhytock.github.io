var buttonColours = ["green", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

// Start the game
$(document).keypress(function () {
    if(!gameStarted) {
        $(".btn").css({opacity: 1});
        console.log("Game Started. Good Luck!");

        //Change Title, mark game as started, and pick a random number
        $("h1").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});

// Select random number between 0 and 3
function nextSequence() {
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Animate randomized button & play correct sound
    $("." + randomChosenColour).delay(300).animate({opacity:0.1}, 100).animate({opacity:1}, 100);
    playSound(randomChosenColour);
}

// Log array pattern list of user-clicked colors
$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // Animate button & play sound when clicked by user
    $("." + userChosenColour).animate({opacity:0.1}, 100).animate({opacity:1}, 100).addClass("pressed");
    setTimeout(() => {
        $("." + userChosenColour).removeClass("pressed");
    }, 100);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

// Map correct sounds
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
var wrongMove = new Audio("sounds/wrong.mp3");

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
          }, 2000);
      }
    } else {
        console.log("wrong");
        wrongMove.play();
        $("h1").text("Game Over! Press Any Key to Restart");
        $(".btn").css({opacity: 0.3});
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    setTimeout(function() {
        var gamePattern = [];
        gameStarted = false;
        level = 0;
    }, 1500);
}
