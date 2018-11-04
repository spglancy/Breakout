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
const brickColumnCount = 4;
const brickHeight = 50;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const brickWidth = (canvas.width/brickRowCount)-20;
let running = false;
let score = 0;
let lives = 3;
const colors = ["red", "orange", "yellow", "blue"];
let brickX = 0;
let brickY = 0;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status === 1) {
        if(x + ballRadius > b.x && x - ballRadius <= b.x+brickWidth && y + ballRadius > b.y && y - ballRadius < b.y+brickHeight) {
          vectorY *= -1;
              score += 1;
              b.status = 0;
          }

          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN");
            document.location.reload();
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

function brickInit() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        if(bricks[c][r].status === 1) {
          brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
          brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
          bricks[c][r] = {x:brickX, y: brickY, color: c, status:bricks[c][r].status};
          const grd = ctx.createLinearGradient(0, 0, 1000, 0);
          grd.addColorStop(0, 'purple');
          grd.addColorStop(.2, 'blue');
          grd.addColorStop(.4, 'green');
          grd.addColorStop(.6, 'yellow');
          grd.addColorStop(.8, 'orange');
          grd.addColorStop(1, 'red');
          ctx.fillStyle = grd;
          ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
      }
  }
}
}

function paddleCollision() {
    if(x + vectorX > canvas.width-ballRadius || x + vectorX < ballRadius) {
      vectorX *= -1;
    }
    if(y + vectorY < ballRadius) {
      vectorY *= -1;
    }
    else if(y + vectorY > canvas.height-ballRadius - 10) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        vectorY *= -1;
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
          running = false;
          startButton.innerHTML = "Continue";
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
    const grd = ctx.createLinearGradient(0, 0, 900, 600);
    grd.addColorStop(0, 'red');
    grd.addColorStop(.2, 'orange');
    grd.addColorStop(.4, 'yellow');
    grd.addColorStop(.6, 'green');
    grd.addColorStop(.8, 'blue');
    grd.addColorStop(1, 'purple');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    brickInit();
}

function draw() {
  running = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const grd = ctx.createLinearGradient(0, 0, 900, 600);
  grd.addColorStop(0, 'red');
  grd.addColorStop(.2, 'orange');
  grd.addColorStop(.4, 'yellow');
  grd.addColorStop(.6, 'green');
  grd.addColorStop(.8, 'blue');
  grd.addColorStop(1, 'purple');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  brickInit();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  paddleCollision();
  if(running){
      requestAnimationFrame(draw);
  }
}

load();
