const canvas = document.getElementById("myCanvas");
const startButton = document.getElementById("start");
const ctx = canvas.getContext("2d");
const b = new ball;

startButton.onclick = (e) => {
    start();
    console.log(running);
}

function drawBoard() {
    b.draw();
}

function degToRad(angle) {
    return (angle*Math.PI)/180;
}

function start() {
    running = true;
    game();
    console.log(b);
}

function game() {
    b.wallCheck();
    b.update();
    b.draw();
    if(running){
        requestAnimationFrame(game);
    }
}

drawBoard();
