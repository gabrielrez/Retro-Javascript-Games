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
  directionX: 1,
  directionY: 1,
};
let direction, loopId, p1Score, p2Score, p2Direction;
p1Score = 0;
p2Score = 0;
p2Direction = "up";

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

function moveP1() {
  if (direction == "up" && p1[0].y >= size) {
    p1.forEach((position) => {
      position.y -= size;
    })
  } else if (direction == "down" && p1[0].y <= 350) {
    p1.forEach((position) => {
      position.y += size;
    })
  }
  if (p2[0].y < 50) {
    p2Direction = "down";
  }
  if (p2[2].y > 375) {
    p2Direction = "up";
  }
}

function moveP2() {
  if (p2Direction == "up") {
    p2.forEach((position) => {
      position.y -= size;
    })
  } else if (p2Direction == "down") {
    p2.forEach((position) => {
      position.y += size;
    })
  }
}

function moveBall() {
  if (ball.directionX == 1) {
    ball.x += size;
  } else if (ball.directionX == 0) {
    ball.x -= size;
  }

  if (ball.directionY == 1) {
    ball.y += size;
  } else if (ball.directionY == 0) {
    ball.y -= size;
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
    ball.directionX = 1;
    updateScore();
  }
  if (ball.x > canvas.width) {
    ball.x = 325;
    p1Score++;
    ball.directionX = 0;
    updateScore();
  }
  if (ball.y < 25 || ball.y >= canvas.height - size) {
    ball.directionY = 1 - ball.directionY;
  }
  if (
    ball.x >= p2[0].x - size &&
    ball.x <= p2[0].x &&
    ball.y >= p2[0].y &&
    ball.y <= p2[2].y
  ) {
    ball.directionX = 0;
  }
  if (
    ball.x <= p1[0].x + size &&
    ball.x >= p1[0].x &&
    ball.y >= p1[0].y &&
    ball.y <= p1[2].y
  ) {
    ball.directionX = 1;
  }
}

function checkStatusGame() {
  if (p1Score >= 5 || p2Score >= 5) {
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
  moveP1();
  moveP2()
  drawPlayers();
  checkBallColision();
  drawBall();
  moveBall();
  checkStatusGame();
  loopId = setTimeout(() => {
    gameLoop();
  }, 75);
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