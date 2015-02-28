﻿/// <reference path="objects/button.ts" />


var canvas;
var stage: createjs.Stage;

// Game Variables
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

// Game Objects 
var game: createjs.Container;
var background: createjs.Bitmap;
var spinButton: objects.Button;
var betOneButton: objects.Button;
var betMaxButton: objects.Button;
var powerButton: objects.Button;
var resetButton: objects.Button;
var tiles: createjs.Bitmap[] = [];
var reelContainers: createjs.Container[] = [];
var currentMoneyText:createjs.Text = new createjs.Text(playerMoney.toString(), "23px play", "#000000");
var currentBetText:createjs.Text= new createjs.Text(playerBet.toString(), "23px play", "#000000");
var jackpotText:createjs.Text = new createjs.Text(jackpot.toString(), "23px play", "#000000");

// GAME CONSTANTS
var NUM_REELS: number = 3;

/* Tally Variables */
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function gameLoop() {


    stage.update(); // Refreshes our stage
}


// reset all
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

// Event handler for PowerButton
function powerOff(event) {
    createUI();
}


// Event Handler for Bet One Button
function betOneButtonClicked(event) {
    playerBet = 1;
    if (spinReels) {
        playerBet--;
    }
}

// Event handler for BetMaxButton
function betMaxButtonClicked() {
    console.log("Bet Max Clicked");    
}


// Event Handler for ResetButton
function resetButtonClicked(event) {
    createUI();
}

// Event Handler for SpinButton
function spinButtonClicked(event) {
    if (playerMoney == 0) {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
        }
    }
    else if (playerBet > playerMoney) {
        alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = spinReels(event);
        fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
        determineWinnings();
        turn++;
    }
    else {
        alert("Please enter a valid bet amount");
    }

    currentMoneyText.text = playerMoney.toString();
    currentBetText.text = playerBet.toString();
    jackpotText.text = jackpot.toString();

    game.addChild(currentMoneyText);
    //game.addChild(jackpot);
    game.addChild(currentBetText);
}



// Event Handler for Spin Button
function spinReels(event) {
    // Add Spin Reels code here
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
    //console.log(fruits);


    for (var tile = 0; tile < 3; tile++) {
        if (turn > 0) {
            game.removeChild(tiles[tile]);
        }
        tiles[tile] = new createjs.Bitmap("assets/images/" + spinResult[tile] + ".png");
        
        game.addChild(tiles[tile]);
        //console.log(game.getNumChildren());
    }
    tiles[0].x = 105;
    tiles[0].y = 194;
    tiles[1].x = 155;
    tiles[1].y = 194;
    tiles[2].x = 205;
    tiles[2].y = 194;
    
    return spinResult;

}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "sword";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "bomb";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "gun";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "spear";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "thullu";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "hammer";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "medieval";
                sevens++;
                break;
        }
    }
    return betLine;
}


/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (blanks == 0) {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if (bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else {
            winnings = playerBet * 1;
        }

        if (sevens == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        showWinMessage();
    }
    else {
        lossNumber++;
        showLossMessage();
    }

}

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

function showWinMessage() {
    playerMoney += winnings;
    resetFruitTally();
    checkJackPot();

}

function showLossMessage() {
    playerMoney -= playerBet;
    resetFruitTally();
}

function createUI():void {
    // instantiate the Main Slot Machine Image
    background = new createjs.Bitmap("assets/images/red_slot-machinejpg.jpg"); 
    game.addChild(background);

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }

    // Adding Reels to 3 of the Containers with their X & Y coordinates
    reelContainers[0].x = 105;
    reelContainers[0].y = 194;
    reelContainers[1].x = 155;
    reelContainers[1].y = 194;
    reelContainers[2].x = 205;
    reelContainers[2].y = 194;

    // Spin Button
    spinButton = new objects.Button("assets/images/spinButton1.png", 225, 306);
    game.addChild(spinButton.getImage()); // getting Image of Button and displaying
    spinButton.getImage().addEventListener("click", spinButtonClicked); // Registering the Click Event for SpinButton

    // Bet One Button
    betOneButton = new objects.Button("assets/images/betOne.png", 170, 306);
    game.addChild(betOneButton.getImage()); // getting Image of Button and displaying
    betOneButton.getImage().addEventListener("click", betOneButtonClicked); // Registering the Click Event for BetOne Button


    // Bet Max Button
    betMaxButton = new objects.Button("assets/images/betMax.png", 170, 326);
    game.addChild(betMaxButton.getImage()); // getting Image of Button and displaying
    betMaxButton.getImage().addEventListener("click", betMaxButtonClicked); // Registering the Click Event for BetMax button

    // Power Button
    powerButton = new objects.Button("assets/images/powerButton.png", 70, 306);
    game.addChild(powerButton.getImage()); // getting Image of Button and displaying
    powerButton.getImage().addEventListener("click", powerOff); // Registering the Click Event for Power Button

    // Reset Button
    resetButton = new objects.Button("assets/images/resetButton.png", 125, 306);
    game.addChild(resetButton.getImage()); // getting Image of Button and displaying
    resetButton.getImage().addEventListener("click", resetButtonClicked); // Registering the Click Event for ResetButton

    

}



// Our Game Kicks off in here
function main() {
    // instantiate my game container
    game = new createjs.Container();
    game.x = 23;
    game.y = 6;

    // Create Slotmachine User Interface
    createUI();
    stage.addChild(game);
}