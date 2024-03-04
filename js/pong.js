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
let direction, loopId;

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

function checkKey(event) {
  if (event.key == "ArrowUp") {
    direction = "up";
  } else if (event.key == "ArrowDown") {
    direction = "down";
  }
}

function gameLoop() {
  clearInterval(loopId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  movePlayer();
  drawPlayers();
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