const pColor = "#326234";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const size = 25;
const p1 = [
  { x: 25, y: 200 },
  { x: 25, y: 225 },
  { x: 25, y: 250 },
];
const p2 = [
  { x: 625, y: 200 },
  { x: 625, y: 225 },
  { x: 625, y: 250 },
];
const ball = {
  x: 325,
  y: 225,
  color: "#063506",
};
let direction, loopId, ballDirection;
ballDirection = 1;
let p1Score = 0;
let p2Score = 0;

function drawPlayers() {
  ctx.fillStyle = pColor;
  p1.forEach((position) => {
    ctx.fillRect(position.x, position.y, size, size);
  })
  ctx.fillStyle = pColor;
  p2.forEach((position) => {
    ctx.fillRect(position.x, position.y, size, size);
  })
}

function movePlayer() {
  if (direction == "up" && p1[0].y >= size) {
    p1.forEach((position) => {
      position.y -= size;
    })
  } else if (direction == "down" && p1[0].y <= 350) {
    p1.forEach((position) => {
      position.y += size;
    })
  }
}

function moveBall() {
  if (ballDirection == 1) {
    ball.x += size;
  } else if (ballDirection == 0) {
    ball.x -= size;
  }
}

function updateScore() {
  const scoreDom = document.querySelector(".score");
  scoreDom.innerText = p1Score + " vs " + p2Score;
}

function checkBallColision() {
  if (ball.x < 0) {
    ball.x = 325;
    p2Score++;
    updateScore();
  }
  if (ball.x > canvas.width) {
    ball.x = 325;
    p1Score++;
    updateScore();
  }
  if (ball.x == p2[0].x - size) {
    if (ball.y == p2[0].y || ball.y == p2[1].y || ball.y == p2[2].y) {
      ballDirection = 0;
    }
  }
  if (ball.x == p1[0].x + size) {
    if (ball.y == p1[0].y || ball.y == p1[1].y || ball.y == p1[2].y) {
      ballDirection = 1;
    }
  }
}

function checkStatusGame() {
  if (p1Score >= 3 || p2Score >= 3) {
    window.close();
  }
}

function checkKey(event) {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  }
}

function drawBall() {
  ctx.fillStyle = ball.color;
  ctx.fillRect(ball.x, ball.y, size, size);
}

function gameLoop() {
  clearInterval(loopId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  movePlayer();
  drawPlayers();
  drawBall();
  moveBall();
  checkBallColision();
  checkStatusGame();
  loopId = setTimeout(() => {
    gameLoop();
  }, 100);
}

function drawGrid() {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#06350611";
  for (let i = 25; i < canvas.width; i += 25) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

gameLoop();
drawGrid();

window.addEventListener("keydown", checkKey);
window.addEventListener("keyup", function () {
  direction = "";
});