// select canas element in html page
const boardGame = document.querySelector(".game");
const context = boardGame.getContext("2d");
// speed that will strat the game
let speed = 7;

class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
// vars that we need
/*****************************************/
const snakeParts = [];
let tial = 2;
let tileCount = 20;
let tileSize = boardGame.width / tileCount - 2;
// let tileSizeApple = boardGame.width / tileCount - 2;
// let tileSize = boardGame.width / tileCount - 2;
let sound = new Audio("sound/sound.mp3");
let game_over = new Audio("sound/game_over.mp3");
let turn = new Audio("sound/turn.mp3");
let duringTheGameSound = new Audio("sound/duringTheGameSound.mp3");

let headX = 10;
let headY = 10;
let Xvelocity = 0;
let Yvelocity = 0;
let appleX = Math.floor(Math.random() * 10) + 10;
let appleY = Math.floor(Math.random() * 10) + 10;
let score = 0;
let gameOver;
/*****************************************/
// game loop board
function drawGame() {
  changeSnakePosition();

  if (isGameOver()) {
    return;
  }
  drawScreen();
  drawSnake();
  buildBody();
  drawApple();
  drawScore();
  setTimeout(drawGame, 1000 / speed);
}
// draw the board game
function drawScreen() {
  context.fillStyle = "black";
  context.fillRect(0, 0, boardGame.width, boardGame.height);
}
// draw the snake's head and after that the body
function drawSnake() {
  context.fillStyle = "green";
  snakeParts.push(new snakePart(headX, headY));
  for (snake_pa of snakeParts) {
    context.fillRect(
      snake_pa.x * tileCount,
      snake_pa.y * tileCount,
      tileSize,
      tileSize
    );
  }

  while (snakeParts.length > tial) {
    snakeParts.shift();
  }
  context.fillStyle = "orange";
  context.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
  // duringTheGameSound.play();
}
// controll the game if you hit the walls or eating yourself
function isGameOver() {
  gameOver = false;
  if (Xvelocity === 0 && Yvelocity === 0) {
    return gameOver;
  }
  if (headY < 0 || headY === 20 || headX < 0 || headX === 20) {
    gameOver = true;
  }
  for (let i = 0; i < snakeParts.length; i++) {
    if (snakeParts[i].x === headX && snakeParts[i].y === headY) {
      gameOver = true;
      break;
    }
  }
  if (gameOver) {
    context.fillStyle = "white";
    context.font = "50px verdana";
    let gradient = context.createLinearGradient(0, 0, boardGame.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1", "red");
    context.fillStyle = gradient;
    context.fillText("Game Over", boardGame.width / 6, boardGame.height / 2);
    duringTheGameSound.muted = true;
    game_over.play();
    document.querySelector("span").innerText = score;
  }
  return gameOver;
}
// we souldn't have to forget our score;
function drawScore() {
  context.fillStyle = "white";
  context.font = "10px verdana";
  context.fillText("Score:" + score, boardGame.width - 45, 10);
}
// draw the random apple
function drawApple() {
  context.fillStyle = "red";
  context.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}
// the movement of the snake
function changeSnakePosition() {
  headX += Xvelocity;
  headY += Yvelocity;
}
// control the snake key button
document.addEventListener("keyup", keyUp);
function keyUp(event) {
  if (event.keyCode === 40 && Yvelocity !== -1) {
    // if snake's going down we can't go up
    // arrow down
    Yvelocity = 1;
    Xvelocity = 0;
    if (!gameOver) {
      turn.play();
    }
  } else if (event.keyCode === 37 && Xvelocity !== 1) {
    // if snake's going left we can't  turn around to the right
    //arrow left
    Yvelocity = 0;
    Xvelocity = -1;
    if (!gameOver) {
      turn.play();
    }
  } else if (event.keyCode === 39 && Xvelocity !== -1) {
    // if snake's going to right we cant cut his move to turn around to the left
    // arrow right 39
    Yvelocity = 0;
    Xvelocity = 1;
    if (!gameOver) {
      turn.play();
    }
  } else if (event.keyCode === 38 && Yvelocity !== 1) {
    // if snake's going up we can't go down
    // arrow up
    Yvelocity = -1;
    Xvelocity = 0;
    if (!gameOver) {
      turn.play();
    }
  }
}
// growing the body
function buildBody() {
  if (headX === appleX && headY === appleY) {
    appleX = Math.floor(Math.random() * 10) + 10;
    appleY = Math.floor(Math.random() * 10) + 10;
    tial++;
    sound.play();
    score++;
    speed += 2;
  }
}
// this is the trigger of the game
drawGame();

// request AnimationFrame
//setInterval xtimes per a second
//setTimeOut --
