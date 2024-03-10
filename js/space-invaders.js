const playerColor = "#326234";
const bulletColor = "#326234";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const size = 25;
var player = [
  { x: (canvas.width / 2) - size * 2, y: canvas.height - size },
  { x: (canvas.width / 2) - size, y: canvas.height - size },
  { x: canvas.width / 2, y: canvas.height - size },
  { x: (canvas.width / 2) - size, y: canvas.height - size * 2 },
]
let loopId, direction, canShoot;
canShoot = true;
let bullets = [];

function movePlayer() {
  if (direction == "left" && player[0].x > 0) {
    player.forEach((position) => {
      position.x -= size;
    })
  } else if (direction == "right" && player[2].x < canvas.width - size) {
    player.forEach((position) => {
      position.x += size;
    })
  }
}

function moveBullets(){
  bullets.forEach((bullet, index)=>{
    bullet.y -= size;
    if(bullet.y < 0){
      bullets.splice(index, 1);
    }
  })
}

function drawPlayer() {
  ctx.fillStyle = playerColor;
  player.forEach((position) => {
    ctx.fillRect(position.x, position.y, size, size);
  })

  ctx.fillStyle = bulletColor;
  bullets.forEach((bullet)=>{
    ctx.fillRect(bullet.x, bullet.y, size, size);
  })
}

function fireBullet() {
  if(canShoot){
    const bullet = { x: player[3].x, y: canvas.height - size - size };
    bullets.push(bullet);
    canShoot = false;
    setTimeout(() => {
      canShoot = true;
    }, 300);
  }
}

function checkKey(event) {
  if (event.key == "ArrowLeft") {
    direction = "left";
  } else if (event.key == "ArrowRight") {
    direction = "right";
  }else{
    fireBullet();
  }
}

function gameLoop() {
  clearInterval(loopId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  movePlayer();
  moveBullets();
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