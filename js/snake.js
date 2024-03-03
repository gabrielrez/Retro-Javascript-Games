const snakeColor = "#326234";
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const size = 25;
const snake = [
  { x: 175, y: 175 },
  { x: 175, y: 200 },
];
let direction, loopId;

const drawSnake = () => {
  ctx.fillStyle = snakeColor;
  snake.forEach((position, index) => {
    ctx.fillRect(position.x, position.y, size, size);
  })
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
  ctx.clearRect(0, 0, 400, 400);
  moveSnake();
  drawSnake();
  loopId = setTimeout(() => {
    gameLoop();
  }, 200);
};

// gameLoop();

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