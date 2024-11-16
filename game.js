const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = []; //Keeps the track of random pattern created by nextSequence() funtion.

let userClickedPattern = []; //keeps the track of user input in .click-function.

let started = false; //initial condition for starting of game.

let level = 0; // level 0

//this function detects the keypress which helps in starting the game and calls nextSequence().
$(document).on("keypress", function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//this function simply takes user input via click and updates the userClickedPattern array, it applies animation and plays sound when button is clicked.
$(".btn").click(function () {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);


});

//this function is used to create the sequence of game and it always starts with empty userClickedPattern
function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

//plays sound when creating pattern and when clicked.
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//animates the click function.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//checks answer by matching gamePattern and userClickedPattern array. 
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("True");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    //works when user gets wrong answer.
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

//resets the whole game.
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}