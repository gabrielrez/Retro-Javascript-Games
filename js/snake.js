const snakeColor = "#326234";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const size = 25;
const snake = [
  { x: 225, y: 225 },
  { x: 225, y: 250 },
];
const food = {
  x: 75,
  y: 50,
  color: "#063506",
};
let direction, loopId;

const drawSnake = () => {
  ctx.fillStyle = snakeColor;
  snake.forEach((position) => {
    ctx.fillRect(position.x, position.y, size, size);
  })
}

const drawFood = () => {
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x, food.y, size, size);
}

const moveSnake = () => {
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

const gameLoop = () => {
  clearInterval(loopId);
  ctx.clearRect(0, 0, 450, 450);
  drawGrid();
  drawFood();
  moveSnake();
  drawSnake();
  loopId = setTimeout(() => {
    gameLoop();
  }, 200);
};

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#06350611";
  for (let i = 25; i < canvas.width; i += 25) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, 450);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(450, i);
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