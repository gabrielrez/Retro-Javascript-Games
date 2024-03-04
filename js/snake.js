const snakeColor = "#326234";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const size = 25;
const snake = [
  { x: 225, y: 225 },
];
const food = {
  x: randomPosition(),
  y: randomPosition(),
  color: "#063506",
};
let direction, loopId, score;
direction = "up";

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomPosition() {
  const number = randomNumber(0, canvas.width - size);
  return Math.round(number / size) * size;
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  snake.forEach((position) => {
    ctx.fillRect(position.x, position.y, size, size);
  })
}

function drawFood() {
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, size, size);
}

function moveSnake() {
  if (direction) {
    const head = snake[snake.length - 1];

    if (direction == "right") {
      snake.push({ x: 0 + head.x + size, y: head.y });
    }

    if (direction == "left") {
      snake.push({ x: 0 + head.x - size, y: head.y });
    }

    if (direction == "up") {
      snake.push({ x: head.x, y: head.y - size });
    }

    if (direction == "down") {
      snake.push({ x: head.x, y: head.y + size });
    }

    snake.shift();
  }
}

function checkEat() {
  const head = snake[snake.length - 1];

  if (head.x == food.x && head.y == food.y) {
    snake.push(head);
    let x = randomPosition();
    let y = randomPosition();
    while (snake.find((position) => position.x == x && position.y == y)) {
      x = randomPosition();
      y = randomPosition();
    }
    food.x = x;
    food.y = y;
    updateScore();
  }
}

function updateScore() {
  const scoreDOM = document.querySelector(".score");
  if (snake.length < 10) {
    scoreDOM.innerText = "size: 0" + snake.length;
  } else {
    scoreDOM.innerText = "size: " + snake.length;
  }
}

function chechColision() {
  const head = snake[snake.length - 1];
  const neckIndex = snake.length - 2;

  const wallColision = head.x < 0 || head.x > 425 || head.y < 0 || head.y > 425;
  const selfColision = snake.find((position, index) => {
    return index < neckIndex && position.x == head.x && position.y == head.y;
  });
  if (wallColision || selfColision) {
    window.close();
  }
}

function gameLoop() {
  clearInterval(loopId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawFood();
  moveSnake();
  drawSnake();
  checkEat();
  updateScore();
  chechColision();
  loopId = setTimeout(() => {
    gameLoop();
  }, 150);
};

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

document.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp" && direction != "down") {
    direction = "up";
  }
  if (event.key == "ArrowDown" && direction != "up") {
    direction = "down";
  }
  if (event.key == "ArrowLeft" && direction != "right") {
    direction = "left";
  }
  if (event.key == "ArrowRight" && direction != "left") {
    direction = "right";
  }
});