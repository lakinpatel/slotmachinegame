//File Name: game.ts
//Author: Lakinkumar Patel
//Slot machine code using createjs Javascript File


// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas; // Reference to the HTML 5 Canvas element
var stage: createjs.Stage; // Reference to the Stage

//GUI
var game;
var background;
var spinButton;
var betOne;
var betMax;
var power;
var reset;
var lose;
var jackpotImg;
var creditsImage;
var isJackpot = false;

var tiles: createjs.Bitmap[] = [];
var turn = 0;

//reel array
var reels = ["sword", "spear", "thullu", "hammer", "bomb", "gun", "medieval", "blank"];

//stats
var spins = 0;
var win = 0;
var loss = 0;
var jackpotWins = 0;
var playerBet = 1;
var winnings = 0;
var credits = 1000;
var jackpot = 10000;

//texts
var betText;
var winningsText;
var creditText;
var jackpotText;

function init() {

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}


// GAMELOOP
function gameLoop() {
    if (credits - playerBet <= 0) {
        spinButton.removeEventListener("click", SpinButton);
    }
    if (credits - playerBet >= 0) {
        spinButton.addEventListener("click", SpinButton); 
    }    
    if (credits == 0) {
        lose.visible = true;
    }
    if (credits >= 1) {
        lose.visible = false;
    }
    //JACKPOT MSG+++++++++++++++++++++++++++++++++
    if (isJackpot == true) {
        jackpotImg.visible = true;
    }
    if (isJackpot == false) {
        jackpotImg.visible = false;
    }
    //JACKPOT MSG+++++++++++++++++++++++++++++++++

    jackpotText.text = jackpot.toString();
    winningsText.text = winnings.toString();
    creditText.text = credits.toString();
    betText.text = playerBet.toString();

    stage.update();
}
function createUI() {
    //slot machine gui
    background = new createjs.Bitmap("assets/images/red_slot-machinejpg.jpg");
    game.addChild(background);
    //spin button
    spinButton = new createjs.Bitmap("assets/images/SpinButton1.png");
    spinButton.x = 225;
    spinButton.y = 306;
    game.addChild(spinButton);
    //bet one button gui
    betOne = new createjs.Bitmap("assets/images/betOne.png");
    betOne.x = 170;
    betOne.y = 306;
    game.addChild(betOne);
    //bet max button gui
    betMax = new createjs.Bitmap("assets/images/betMax.png");
    betMax.x = 170;
    betMax.y = 326;
    game.addChild(betMax);
    //reset button
    reset = new createjs.Bitmap("assets/images/resetButton.png");
    reset.x = 125;
    reset.y = 306;
    game.addChild(reset);
    //power button
    power = new createjs.Bitmap("assets/images/powerButton.png");
    power.x = 70;
    power.y = 306;
    game.addChild(power);
    //bet counter text--left
    betText = new createjs.Text(playerBet.toString(), "Arial", "#ABE2F7");
    betText.x = 155;
    betText.y = 115;
    game.addChild(betText);
    //winnings text--center
    winningsText = new createjs.Text(winnings.toString(), "Arial", "#ABE2F7");
    winningsText.x = 220;
    winningsText.y = 325;
    //game.addChild(winningsText);

    // credits Image

    //credits text--right
    creditText = new createjs.Text(credits.toString(), "Arial", "#ABE2F7");
    creditText.x = 85;
    creditText.y = 115;
    game.addChild(creditText);
    //Jackpot Text
    jackpotText = new createjs.Text(jackpot.toString(), "Arial", "#ABE2F7");
    jackpotText.x = 205; 
    jackpotText.y = 115;
    jackpotText.scaleX = 1.5;
    jackpotText.scaleY = 1.5;
    game.addChild(jackpotText);
    //lose text
    lose = new createjs.Bitmap("assets/images/lose.png");
    game.addChild(lose);
    lose.visible = false;
    //jackpot img
    jackpotImg = new createjs.Bitmap("assets/images/jackpot.png");
    game.addChild(jackpotImg);
    jackpotImg.visible = false;
    //button listeners
    betMax.addEventListener("click", BetMaxButton);
    betOne.addEventListener("click", BetOneButton);
    power.addEventListener("click", PowerButton);
   // spinButton.addEventListener("click", SpinButton);
    reset.addEventListener("click", ResetButton);
}

function ResetButton() {
    spins = 0;
    win = 0;
    loss = 0;
    jackpotWins = 0;
    jackpot = 10000;
    playerBet = 1;
    winnings = 0;
    credits = 1000;
    spinButton.addEventListener("click", SpinButton);

    winningsText.text = winnings.toString();
    betText.text = playerBet.toString();
    creditText.text = credits.toString();
    createUI();
}
function PowerButton() {
    createUI();
}
function BetOneButton() {
    playerBet = 1;
    console.log("Bet Changed to: " + playerBet);
}
function BetMaxButton() {
    playerBet = 50;
    console.log("Bet Changed to: " + playerBet);
}

function SpinButton() {
    //Getting Random Elements from each slot
    var outCome = Math.floor((Math.random() * 65) + 1);
    var results = [0, 0, 0];

    credits -= playerBet;
    jackpot += playerBet;
    isJackpot = false;

    //cant go below 0
    if (credits <= 0)
        credits = 0;

    for (var spin = 0; spin < 3; spin++) {
        var outCome = Math.floor((Math.random() * 65) + 1);

        if (outCome >= 1 && outCome <= 27)
            results[spin] = 7; //blanks
        if (outCome >= 28 && outCome <= 37)
            results[spin] = 0; //sonic
        if (outCome >= 38 && outCome <= 46)
            results[spin] = 1; //tails
        if (outCome >= 47 && outCome <= 54)
            results[spin] = 2; //yellowGuy
        if (outCome >= 55 && outCome <= 59)
            results[spin] = 3;//robotnic
        if (outCome >= 60 && outCome <= 62)
            results[spin] = 4; //bars
        if (outCome >= 63 && outCome <= 64)
            results[spin] = 5;//knuckles
        if (outCome == 65)
            results[spin] = 6;//rings

    }

    //This changes the reels image
    for (var tile = 0; tile < 3; tile++) {

        if (turn > 0) {
            game.removeChild(tiles[tile]);
            turn++;
        }
        tiles[tile] = new createjs.Bitmap("assets/images/" + reels[results[tile]] + ".png");
        game.addChild(tiles[tile]);
    }
    tiles[0].x = 105;
    tiles[0].y = 194;
    tiles[1].x = 155;
    tiles[1].y = 194;
    tiles[2].x = 205;
    tiles[2].y = 194;


        //printing results to console.
        console.log("Reel One: " + reels[results[0]]);
        console.log("Reel Two: " + reels[results[1]]);
        console.log("Reel Three: " + reels[results[2]]);

        payoutCheck(reels[results[0]], reels[results[1]], reels[results[2]]);
    }

    //checks payout and displays stats
    function payoutCheck(spotOne, spotTwo, spotThree) {
        var allSlots = [spotOne, spotTwo, spotThree];
        var sword = 0;
        var thullu = 0;
        var spear = 0;
        var hammer = 0;
        var bomb = 0;
        var gun = 0;
        var medieval = 0;
        var blanks = 0;

        for (var i = 0; i < reels.length; i++) {
            for (var r = 0; r < allSlots.length; r++) {
                switch (reels[i]) {
                    case reels[0]:
                        if (reels[0] == allSlots[r]) {
                            sword++;
                        }
                        break;
                    case reels[1]:
                        if (reels[1] == allSlots[r]) {
                            spear++;
                        }
                        break;
                    case reels[2]:
                        if (reels[2] == allSlots[r]) {
                            thullu++;
                        }
                        break;
                    case reels[3]:
                        if (reels[3] == allSlots[r]) {
                            hammer++;
                        }
                        break;
                    case reels[4]:
                        if (reels[4] == allSlots[r]) {
                            bomb++;
                        }
                        break;
                    case reels[5]:
                        if (reels[5] == allSlots[r]) {
                            gun++;
                        }
                        break;
                    case reels[6]:
                        if (reels[6] == allSlots[r]) {
                            medieval++;
                        }
                        break;
                    case reels[7]:
                        if (reels[7] == allSlots[r]) {
                            blanks++;
                        }
                        break;
                }
            }
        }
        console.log("");

        //winnings calculations
        if (blanks == 0) {
            if (sword == 3) {
                winnings = playerBet * 10;
                credits += winnings;
                //console.log("Win on Sonic: " + winnings);
            }
            else if (spear == 3) {
                winnings = playerBet * 20;
                credits += winnings;
                //console.log("Win on Tails: " + winnings);
            }
            else if (thullu == 3) {
                winnings = playerBet * 30;
                credits += winnings;
                //console.log("Win on yellowGuy: " + winnings);
            }
            else if (hammer == 3) {
                winnings = playerBet * 40;
                credits += winnings;
                //console.log("Win on robotnic: " + winnings);
            }
            else if (bomb == 3) {
                winnings = playerBet * 50;
                credits += winnings;
                //console.log("Win on bars: " + winnings);
            }
            else if (gun == 3) {
                winnings = playerBet * 75;
                credits += winnings;
                //console.log("Win on knuckles: " + winnings);
            }
            // JACKPOT AREA************************************
            else if (medieval == 3) {
                winnings = playerBet * 100;
                credits += winnings;
                jackpotWins++;
                isJackpot = true;
                console.log("Win on rings: " + winnings);
            }
            //JACKPOT AREA*************************************
            else if (sword == 2) {
                winnings = playerBet * 2;
                credits += winnings;
                console.log("Win on Sonic: " + winnings);
            }
            else if (spear == 2) {
                winnings = playerBet * 2;
                credits += winnings;
                console.log("Win on tails:" + winnings);
            }
            else if (thullu == 2) {
                winnings = playerBet * 3;
                credits += winnings;
                console.log("Win on yellowguy: " + winnings);
            }
            else if (hammer == 2) {
                winnings = playerBet * 4;
                credits += winnings;
                console.log("Win on robotnic: " + winnings);
            }
            else if (bomb == 2) {
                winnings = playerBet * 5;
                credits += winnings;
                console.log("Win on bars: " + winnings);
            }
            else if (gun == 2) {
                winnings = playerBet * 10;
                credits += winnings;
                console.log("Win on knuckles: " + winnings);
            }
            else if (medieval == 2) {
                winnings = playerBet * 20;
                credits += winnings;
                console.log("Win on rings: " + winnings);
            }
            else {
                winnings = playerBet * 1;
                credits += winnings;
                console.log("No blanks! Take your money!: " + winnings);
            }
            win++;
        }
        else {
            loss++;
            console.log("Spin Again");
            winnings = 0;    
        }
        //console stats
        console.log("");
        spins++;
        console.log("Number is spins " + spins);
        console.log("Number is wins " + win);
        console.log("Number is losses " + loss);
        console.log("Number of Jackpots " + jackpotWins);
        console.log("Current Jackpot: " + jackpot);
        console.log("jackPot Percentage " + Math.floor(jackpotWins / spins * 100) + " %");
        console.log("Win percentage : " + Math.floor(win / spins * 100) + " %");
        console.log("");
    }

    function main() {
        // instantiate my game container
        game = new createjs.Container();
        // Create Slotmachine User Interface
        createUI();
        stage.addChild(game);
    }

