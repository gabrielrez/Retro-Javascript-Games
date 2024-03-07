const spaceShipColor = "#326234";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const size = 25;
var spaceShip = [
  { x: (canvas.width / 2) - size * 2, y: canvas.height - size },
  { x: (canvas.width / 2) - size, y: canvas.height - size },
  { x: canvas.width / 2, y: canvas.height - size },
  { x: (canvas.width / 2) - size, y: canvas.height - size * 2 },
]
let loopId, direction;

function drawSpaceShip() {
  ctx.fillStyle = spaceShipColor;
  spaceShip.forEach((position) => {
    ctx.fillRect(position.x, position.y, size, size);
  })
}

function moveSpaceShip() {
  if (direction == "left" && spaceShip[0].x > 0) {
    spaceShip.forEach((position) => {
      position.x -= size;
    })
  } else if (direction == "right" && spaceShip[2].x < canvas.width - size) {
    spaceShip.forEach((position) => {
      position.x += size;
    })
  }
}

function drawPlayer() {
  ctx.fillStyle = spaceShipColor;
  spaceShip.forEach((position) => {
    ctx.fillRect(position.x, position.y, size, size);
  })
}

function checkKey(event) {
  if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  }
}

function gameLoop() {
  clearInterval(loopId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  moveSpaceShip();
  drawPlayer();
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

window.addEventListener("keydown", checkKey);
window.addEventListener("keyup", function () {
  direction = "";
});