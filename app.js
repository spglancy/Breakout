const canvas = document.getElementById("myCanvas");
const startButton = document.getElementById("start");
const ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height-30;
let vectorX = 3;
let vectorY = -4;
let paddleVector = 0;
let paddleHeight = 10;
let paddleWidth = 125;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 160;
const brickHeight = 50;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let running = false;
let score = 0;
let lives = 3;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

startButton.onclick = (e) => {
    if(!running){
        draw();
    }
}

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode == 39) {
    paddleVector = 0;
    rightPressed = false;
  } else if(e.keyCode == 37) {
    paddleVector = 0;
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x + ballRadius > b.x && x - ballRadius <= b.x+brickWidth && y + ballRadius > b.y && y - ballRadius < b.y+brickHeight) {
          vectorY = -vectorY;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#00ffff";
  ctx.fill();
  ctx.closePath();
  x += vectorX;
  y += vectorY;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight-5, paddleWidth, paddleHeight);
  ctx.fillStyle = "#000099";
  ctx.fill();
  ctx.closePath();
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleVector = 7;
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
      paddleVector = -7;
    paddleX -= 7;
  }
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "black";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function paddleCollision() {
    if(x + vectorX > canvas.width-ballRadius || x + vectorX < ballRadius) {
      vectorX = -vectorX;
    }
    if(y + vectorY < ballRadius) {
      vectorY = -vectorY;
    }
    else if(y + vectorY > canvas.height-ballRadius - 10) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        vectorY = -vectorY;
        vectorX += paddleVector/2;
      }
      else if(y + vectorY > canvas.height-ballRadius) {
        lives--;
        if(!lives) {
          alert("GAME OVER");
          document.location.reload();
        }
        else {
          x = canvas.width/2;
          y = canvas.height-30;
          vectorX = 3;
          vectorY = -3;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function load() {
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
}

function draw() {
    running = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  paddleCollision();
  requestAnimationFrame(draw);
}

load();
