const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const boxUnit = 32;
const gameSpeed = 100;

const groundImage = new Image();
groundImage.src = './img/ground.png';

const appleImage = new Image();
appleImage.src = './img/apple.png';

const container = document.querySelector('.container');
const scoreContainer = document.querySelector('.score');
const scoreBoard = document.querySelector('.score span');
const startButton = document.querySelector('button');

let score = 0;
let gameInterval;
let snake;
let apple;

let currentDirection = '';
document.addEventListener('keydown', changeSnakeDirection);

function reset() {
  snake = [];
  snake[0] = {
    x: 8 * boxUnit,
    y: 10 * boxUnit
  }
  currentDirection = '';
  score = 0;
  apple = {
    x: Math.floor(Math.random() * 17 + 1) * boxUnit,
    y: Math.floor(Math.random() * 15 + 3) * boxUnit
  }
  scoreContainer.classList.add('score');
  scoreContainer.classList.remove('score-center');
}

function changeSnakeDirection(event) {
  let keyCode = event.keyCode;
  if (keyCode == 37 && currentDirection != "RIGHT") {
    currentDirection = "LEFT";
  } else if (keyCode == 38 && currentDirection != "DOWN") {
    currentDirection = "UP";
  } else if (keyCode == 39 && currentDirection != "LEFT") {
    currentDirection = "RIGHT";
  } else if (keyCode == 40 && currentDirection != "UP") {
    currentDirection = "DOWN";
  }
}

function snakeCollision(newHead, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x &&
      newHead.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function showGameOverScreen() {
  clearInterval(gameInterval);
  setTimeout(() => {
    startButton.classList.remove('btn-hide');
    ctx.clearRect(0, 0, 608, 608);
    ctx.fillStyle = 'rgba(17, 17, 17, 0.9)';
    ctx.fillRect(0, 0, 608, 608);
    scoreContainer.classList.remove('score');
    scoreContainer.classList.add('score-center');
  }, 150);
}

const drawImage = () => {
  ctx.clearRect(0, 0, 608, 608);
  ctx.drawImage(groundImage, 0, 0);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? '#355ed5' : '#4369d8';
    ctx.fillRect(snake[i].x, snake[i].y, boxUnit, boxUnit);
  }

  ctx.drawImage(appleImage, apple.x, apple.y);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (currentDirection === 'LEFT') snakeX -= boxUnit;
  if (currentDirection === 'RIGHT') snakeX += boxUnit;
  if (currentDirection === 'UP') snakeY -= boxUnit;
  if (currentDirection === 'DOWN') snakeY += boxUnit;

  if (snakeX === apple.x && snakeY === apple.y) {
    score++;
    apple = {
      x: Math.floor(Math.random() * 17 + 1) * boxUnit,
      y: Math.floor(Math.random() * 15 + 3) * boxUnit
    }
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  if (snakeX < boxUnit || snakeX > 17 * boxUnit ||
    snakeY < 3 * boxUnit || snakeY > 17 * boxUnit || snakeCollision(newHead, snake)) {
    showGameOverScreen();
  }

  snake.unshift(newHead);
  scoreBoard.textContent = score;
}

const startGame = () => {
  reset();
  startButton.classList.add('btn-hide');
  gameInterval = setInterval(drawImage, 100);
}

startButton.addEventListener('click', () => {
  startGame();
});

startGame();

